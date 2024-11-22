import {ApolloClient, NormalizedCacheObject, InMemoryCache, HttpLink, gql} from '@apollo/client/core';
import {DocumentNode} from 'graphql';
import fetch from 'cross-fetch';
import {OperationVariables} from '@apollo/client/core';

export interface GraphQLClientConfig {
    baseUrl: string;
    apiKey?: string;
}

export class GraphQLClient {
    private client: ApolloClient<NormalizedCacheObject>;
    private config: GraphQLClientConfig

    constructor(config: GraphQLClientConfig) {
        const httpLink = new HttpLink({
            uri: config.baseUrl,
            fetch,
        });

        this.config = config

        this.client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
            defaultOptions: {
                query: {
                    fetchPolicy: 'no-cache',
                },
                mutate: {
                    fetchPolicy: 'no-cache',
                },
            },
        });
    }

    private buildHeaders(apiKey?: string) {
      apiKey = apiKey || this.config.apiKey;

      if (!apiKey) {
        throw new Error('API key is required');
      }
        
      return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
      }
    }

    async mutate<T = any, V extends OperationVariables = OperationVariables>(
        mutation: DocumentNode | string,
        variables?: V,
        apiKey?: string,
    ): Promise<T> {
        const result = await this.client.mutate({
            mutation: typeof mutation === 'string' ? gql(mutation) : mutation,
            variables,
            context: {
                headers: this.buildHeaders(apiKey),
            },
        });

        return result.data;
    }

    async query<T = any, V extends OperationVariables = OperationVariables>(
        query: DocumentNode | string,
        variables?: V,
        apiKey?: string,
    ): Promise<T> {
        const result = await this.client.query({
            query: typeof query === 'string' ? gql(query) : query,
            variables,
            context: {
              headers: this.buildHeaders(apiKey),
            },
        });

        return result.data;
    }

    async close(): Promise<void> {
        await this.client.stop();
    }
}
