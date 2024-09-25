import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME, REPOSITORY_BY_ID } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations'; 
import ReviewItem from './ReviewItem';
import StyledText from './StyledText';
import Loading from './Loading';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.backgroundSecondary,
    },
    button: {
        flexGrow: 1,
        borderRadius: theme.dimensions.inputBorderRadius,
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
    },

})

const ItemSeparator = () => <View style={styles.separator} />;

const ExtendedReviewItem = ({ review }) => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        refetchQueries: [
            ME,
            {
                query: REPOSITORY_BY_ID,
                variables: { repositoryId: review.repositoryId },
            }
        ],
    });

    const confirmDelete = () => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancelled'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: deleteReview,
                style: 'destructive',
            },
        ]);
    };

    const deleteReview = async () => {
        await mutate({ variables: { deleteReviewId: review.id }});
    };

    return (
        <View>
            <ReviewItem review={review} />
            
            <View style={styles.buttonsContainer}>
                <Link to={`/${review.repositoryId}`} style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                    <StyledText color="textTertiary" fontWeight="bold" style={{ textAlign: 'center' }}>View repository</StyledText>
                </Link>
                <Pressable onPress={confirmDelete} style={[styles.button, { backgroundColor: theme.colors.textError }]}>
                    <StyledText color="textTertiary" fontWeight="bold" style={{ textAlign: 'center' }}>Delete review</StyledText>
                </Pressable>
            </View>
        </View>
    )
};

const ReviewList = () => {
    const queryResult = useQuery(ME, {
        variables: {
            includeReviews: true,
        },
    });

    if (queryResult.loading) return <Loading />;

    const repositoryNodes = queryResult.data?.me ? queryResult.data.me.reviews.edges.map(edge => edge.node) : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ExtendedReviewItem review={item} />}
        />
    );
};

export default ReviewList;