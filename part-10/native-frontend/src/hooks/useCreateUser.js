import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
    const [mutate, result] = useMutation(CREATE_USER);
    const apolloClient = useApolloClient();

    const createUser = async (user) => {
        const createUserResult = mutate({
            variables: { user }
        });
        apolloClient.resetStore();
        return createUserResult;
    };

    return [createUser, result];
};

export default useCreateUser;