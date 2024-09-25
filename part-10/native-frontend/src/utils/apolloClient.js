import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';

const { apolloUri } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
    uri: apolloUri,
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
                reviews: relayStylePagination(),
            },
        },
    },
});

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
            };
        } catch(error) {
            console.log(`Error occured in apolloClient.js:`, error);
            return {
                headers,
            };
        }
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: cache,
    });
};

export default createApolloClient;