import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();

    const createReview = async ({ repositoryOwnerName, repositoryName, rating, review }) => {
        const createReviewResult = await mutate({
            variables: {
                reviewInput: { ownerName: repositoryOwnerName, repositoryName, rating: Number(rating), text: review }
            },
        });
        apolloClient.resetStore();
        return createReviewResult;
    };

    return [createReview, result];
};

export default useCreateReview;