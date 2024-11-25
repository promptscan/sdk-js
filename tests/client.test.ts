import {GraphQLClient} from '../src/client';
import {
    GenerationInput,
    CollectGenerationsMutation,
    CollectGenerationsMutationVariables,
    ApiKeyQuery
} from '../src/generated/graphql';
import {CollectGenerationsDocument, ApiKeyDocument} from '../src/generated/graphql';


describe('GraphQLClient', () => {

    let client: GraphQLClient;

    beforeEach(() => {
        client = new GraphQLClient({
            baseUrl: 'http://localhost:8020/graphql/',
            apiKey: 'project-f47ac10b-58cc-4372-a567-0e02b2c3d479'
        });
    });

    describe('GraphQL Operations', () => {
        it('should successfully send generations', async () => {
            const generations: GenerationInput[] = [{
                model: 'gpt-4',
                messages: [
                    {
                        role: 'user',
                        content: 'Hello',
                        tags: [
                            {key: 'type', value: 'prompt'}
                        ]
                    },
                    {
                        role: 'assistant',
                        content: 'Hi there! How can I help you today?',
                        tags: null
                    }
                ],
                id: 'test-generation-1',
                created: new Date().toISOString(),
                duration: 1.5,
                timeToFirstToken: 0.2,
                sessionId: 'test-session-1',
                tags: [
                    {key: 'source', value: 'test'},
                    {key: 'environment', value: 'development'}
                ],
                usage: {
                    promptTokens: 10,
                    completionTokens: 20,
                    totalTokens: 30,
                    promptTokensDetails: {audioTokens: 0, cachedTokens: 0},
                    completionTokensDetails: {audioTokens: 0, reasoningTokens: 15}
                }
            }];

            const result = await client.mutate<CollectGenerationsMutation, CollectGenerationsMutationVariables>(
                CollectGenerationsDocument,
                {
                    generations: generations,
                    projectId: undefined
                }
            );

            expect(result.collect.success).toBe(true);
            expect(result.collect.error).toBeNull();
        });

        it('should successfully fetch API key', async () => {
            const result = await client.query<ApiKeyQuery>(ApiKeyDocument);

            expect(result.apiKey).toBeDefined();
            if (result.apiKey) {
                expect(result.apiKey.name).toBeDefined();
                expect(result.apiKey.scope).toBeDefined();
                expect(result.apiKey.createdTs).toBeDefined();
                expect(result.apiKey.enabled).toBeDefined();
            }
        });
    });
});
