import {GraphQLClient, GraphQLClientConfig} from './client';
import {
    CollectGenerationsDocument,
    CollectGenerationsMutation,
    CollectGenerationsMutationVariables,
    GenerationInput, KeyValuePairInput
} from './generated/graphql';

export interface SDKConfig {
    baseUrl?: string;
    apiKey?: string;
    enabled?: boolean;
    debug?: boolean;
    autoFlush?: boolean;
    flushIntervalMillis?: number;
    maxRetries?: number;
    defaultTags?: Record<string, string>;
}

type GenerationRecord = {
    generation: GenerationInput;
    apiKey?: string;
    retries: number;
}

export class PromptScanSDK {
    private static readonly DEFAULT_CONFIG: Partial<SDKConfig> = {
        enabled: true,
        debug: false,
        autoFlush: true,
        flushIntervalMillis: 5000,
        maxRetries: 3,
        defaultTags: {}
    };

    public config: SDKConfig;
    public graphQLClient: GraphQLClient;
    private timeoutId: any | null = null;
    private buffer: Array<GenerationRecord> = [];
    private isClosed: boolean = false;

    constructor(config: SDKConfig) {
        process.on('beforeExit', async () => {
            await this.close();
        });

        // Merge default config with user config and options
        this.config = {
            ...PromptScanSDK.DEFAULT_CONFIG,
            ...config,
        } as SDKConfig;

        this.config.apiKey = this.config.apiKey || process.env.PROMPTSCAN_API_KEY;
        this.config.baseUrl = this.config.baseUrl || process.env.PROMPTSCAN_BASE_URL || 'https://api.promptscan.ai/graphql/';

        if (!this.config.apiKey) {
            console.warn(`PromptScanSDK is initialized without API key.`)
        }

        const clientConfig: GraphQLClientConfig = {
            baseUrl: this.config.baseUrl,
            apiKey: this.config.apiKey
        };

        this.graphQLClient = new GraphQLClient(clientConfig);

        if (this.config.autoFlush && this.config.flushIntervalMillis) {
            this.setupAutoFlush();
        }

        if (this.config.debug) {
            console.debug(`PromptScanSDK is initialized. Collection enabled=${this.config.enabled} with autoFlush=${this.config.autoFlush}.`)
        }
    }

    private setupAutoFlush(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(
            async () => {
                if (this.config.debug) {
                    console.debug("Periodic flush.")
                }
                await this.flush();
                this.setupAutoFlush();
            },
            this.config.flushIntervalMillis
        );
    }

    collect(generation: GenerationInput, projectApiKey?: string) {
        if (this.config.debug) {
            console.debug(`Adding generation record ${generation.id} to queue.`)
        }

        this.buffer.push({generation: generation, apiKey: projectApiKey, retries: 0});
    }

    async flush(): Promise<GenerationInput[]> {
        if (this.buffer.length === 0) {
            return [];
        }

        const generations = [] as GenerationRecord[];
        const flushedGenerations = [] as GenerationInput[];

        while (this.buffer.length > 0) {
            generations.push(this.buffer.pop()!);
        }

        if (!this.config.enabled) {
            if (this.config.debug) {
                console.debug(`Discarding ${generations.length} records since collection is disabled.`)
            }
            return [];
        }

        if (this.config.debug) {
            console.debug(`Flushing ${generations.length} records.`)
        }

        const generationsByApiKey = generations
            .filter((rec) => { return rec.retries < this.config.maxRetries! })
            .map((rec)=> {
                let tagsAsRecords = (rec.generation.tags || []).reduce((acc, p) => {
                    acc[p.key] = p.value;
                    return acc;
                }, {...this.config.defaultTags}) as Record<string, string>;

                let tags = Object
                    .entries(tagsAsRecords)
                    .map(([key, value]) => ({key: key, value: value}));

                return {
                    ...rec,
                    generation: {
                        ...rec.generation, tags: tags
                    }
                };
            } )
            .reduce((acc, rec) => {
                const apiKey = rec.apiKey || this.config.apiKey!;
                if (!acc[apiKey]) {
                    acc[apiKey] = [];
                }
                acc[apiKey].push(rec);
                return acc;
            }, {} as Record<string, GenerationRecord[]>);

        for (const [apiKey, records] of Object.entries(generationsByApiKey)) {
            let retry = false;
            try {
                const result = await this.graphQLClient
                    .mutate<CollectGenerationsMutation, CollectGenerationsMutationVariables>(
                        CollectGenerationsDocument,
                        {
                            generations: records.map(r => r.generation),
                            projectId: undefined
                        },
                        apiKey
                    );
                retry = !result.collect.success;
            } catch (error) {
                console.error("Failed to collect generations", error);
                retry = true;
            }

            if (retry) {
                this.buffer.push(...records.map(r => ({...r, retries: r.retries + 1})));
                if (this.config.debug) {
                    console.debug(`Adding ${records.length} records back to queue for retry.`)
                }
            } else {
                flushedGenerations.push(...records.map(r => r.generation));
            }
        }

        return flushedGenerations;
    }

    async close(): Promise<void> {
        if (this.isClosed) {
            console.warn("PromptScanSDK is already closed.");
            return;
        }
        this.isClosed = true;

        if (this.config.debug) {
            console.debug("Closing PromptScanSDK.");
        }

        if (this.timeoutId) {
            clearInterval(this.timeoutId);
            this.timeoutId = null;
        }

        await this.flush();
        await this.graphQLClient!.close();

        if (this.config.debug) {
            console.debug("PromptScanSDK is closed.");
        }
    }

    estimateGenerationsInFlightCount(): number {
        return this.buffer.length;
    }

    setEnabled(enabled: boolean): void {
        this.config.enabled = enabled;
    }

    setDebug(debug: boolean): void {
        this.config.debug = debug;
    }
}
