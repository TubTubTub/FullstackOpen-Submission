import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const signInResult = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(signInResult.data.authenticate.accessToken);
        apolloClient.resetStore();
        return signInResult;
    }

    return [signIn, result];
};

export default useSignIn;