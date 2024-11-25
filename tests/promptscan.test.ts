import {PromptScanSDK} from '../src/promptscan';
import {GenerationInput} from '../src/generated/graphql';

const clientMutateMock = jest.fn().mockResolvedValue({
    collect: {
        success: true,
        error: null
    }
});
const clientCloseMock = jest.fn();

jest.mock('../src/client', () => ({
    GraphQLClient: jest.fn().mockImplementation(() => ({
        mutate: clientMutateMock,
        close: clientCloseMock
    }))
}));

describe('PromptScanSDK', () => {
    const config = {
        apiKey: 'key-default'
    };

    const generation: GenerationInput = {
        model: 'gpt-4',
        messages: [{
            role: 'user',
            content: 'test generation',
            tags: null
        }],
        id: null,
        created: null,
        duration: null,
        timeToFirstToken: null,
        sessionId: null,
        tags: null,
        usage: {
            promptTokens: null,
            completionTokens: null,
            totalTokens: null,
            promptTokensDetails: null,
            completionTokensDetails: null
        }
    };


    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should collect generations with multiple API keys', async () => {
        const sdk = new PromptScanSDK({...config, autoFlush: false});

        sdk.collect({...generation, id: 'a'}, 'key-a');
        sdk.collect({...generation, id: 'b'}, 'key-b');
        sdk.collect({...generation, id: 'c'}, 'key-a');
        sdk.collect({...generation, id: 'd'});

        expect(sdk.estimateGenerationsInFlightCount()).toBe(4);
        await sdk.flush();

        expect(sdk.estimateGenerationsInFlightCount()).toBe(0);

        const keyACalls = clientMutateMock.mock.calls.filter(
            call => call[2] === 'key-a'
        );
        const keyBCalls = clientMutateMock.mock.calls.filter(
            call => call[2] === 'key-b'
        );
        const defaultKeyCalls = clientMutateMock.mock.calls.filter(
            call => call[2] === config.apiKey
        );

        expect(keyACalls.length).toBe(1);
        expect(keyACalls[0][1].generations.map((g: { id: string }) => g.id).sort()).toEqual(['a', 'c']);

        expect(keyBCalls.length).toBe(1);
        expect(keyBCalls[0][1].generations.map((g: { id: string }) => g.id)).toEqual(['b']);

        expect(defaultKeyCalls.length).toBe(1);
        expect(defaultKeyCalls[0][1].generations.map((g: { id: string }) => g.id)).toEqual(['d']);
    });

    it('it should retry on failed flush', async () => {
        clientMutateMock
            .mockRejectedValueOnce(new Error('HTTP Error'))
            .mockResolvedValueOnce({collect: {success: false, error: {message: 'some error'}}})
            .mockResolvedValueOnce({collect: {success: true, error: null}});

        const sdk = new PromptScanSDK({...config, autoFlush: false, debug: true});

        sdk.collect({...generation, id: 'a'});
        expect(sdk.estimateGenerationsInFlightCount()).toBe(1);

        await sdk.flush();
        expect(sdk.estimateGenerationsInFlightCount()).toBe(1);
        expect(clientMutateMock).toHaveBeenCalledTimes(1);

        await sdk.flush();
        expect(sdk.estimateGenerationsInFlightCount()).toBe(1);
        expect(clientMutateMock).toHaveBeenCalledTimes(2);

        await sdk.flush();
        expect(sdk.estimateGenerationsInFlightCount()).toBe(0);
        expect(clientMutateMock).toHaveBeenCalledTimes(3);
    });

    it('it should add default meta to generation', async () => {
        const sdk = new PromptScanSDK({
            ...config, autoFlush: false, defaultTags: {'version': '1.0', 'env': 'test'}
        });
        sdk.collect({
            ...generation,
            id: 'a',
            tags: [{key: 'version', value: '2.0'}, {key: 'app', value: 'demo'}],
        });
        let generations = await sdk.flush();

        let meta = generations[0].tags?.reduce((acc, p) => {
            acc[p.key as string] = p.value;
            return acc;
        }, {} as Record<string, string>);

        expect(meta).toEqual({'version': '2.0', 'app': 'demo', 'env': 'test'});
    });

    it('it should auto flush generations', async () => {
        const sdk = new PromptScanSDK({...config, flushIntervalMillis: 1000});
        const flushSpy = jest.spyOn(sdk, 'flush');
        jest.advanceTimersByTime(1250)
        expect(flushSpy).toBeCalledTimes(1);
    });

    it('it should auto flush on close', async () => {
        const sdk = new PromptScanSDK({...config, autoFlush: false});
        const flushSpy = jest.spyOn(sdk, 'flush');
        await sdk.close();
        expect(flushSpy).toBeCalledTimes(1);
    });

    it('it should support enable / disable', async() => {
        const sdk = new PromptScanSDK({...config, autoFlush: false, enabled: false});
        sdk.collect({...generation, id: 'a'});
        expect(sdk.estimateGenerationsInFlightCount()).toBe(1);
        const res = await sdk.flush()
        expect(res).toEqual([]);
        expect(sdk.estimateGenerationsInFlightCount()).toBe(0);
    });
});
