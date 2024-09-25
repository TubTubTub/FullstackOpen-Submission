import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { openURL} from 'expo-linking';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { REPOSITORY_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import StyledText from './StyledText';
import Loading from './Loading';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundSecondary,
    },
    openGitHubButton: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '90%',
        borderRadius: theme.dimensions.inputBorderRadius,
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
        backgroundColor: theme.colors.primary,
        color: theme.colors.textTertiary,
        fontWeight: theme.fontWeights.bold,
        overflow: 'hidden',
    },
    separator: {
        height: 10,
    },
});

const RepositoryInfo = ({ repository }) => {
    const handlePress = () => {
        openURL(repository.url);
    };

    return (
        <View style={styles.container}>
            <RepositoryItem repository={repository} />
            <Pressable onPress={handlePress}>
                <StyledText style={styles.openGitHubButton}>Open in GitHub</StyledText>
            </Pressable>
        </View>
    );
};


const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { id } = useParams();

    const queryVariables = {
        repositoryId: id,
        first: 2,
    };
    const repositoryQuery = useQuery(REPOSITORY_BY_ID, {
        fetchPolicy: 'network-and-cache',
        variables: queryVariables,
    });
    
    if (!id) return <StyledText>Invalid id</StyledText>;

    if (repositoryQuery.loading || !repositoryQuery.data.repository) return <Loading />;

    const reviews = repositoryQuery.data.repository.reviews.edges.map(edge => edge.node);

    const onEndReach = () => {
        console.log('Fetching more reviews...');
        handleFetchMore();
    }

    const handleFetchMore = () => {
        const canFetchMore = !repositoryQuery.loading && repositoryQuery.data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        repositoryQuery.fetchMore({
            variables: {
                after: repositoryQuery.data.repository.reviews.pageInfo.endCursor,
                ...queryVariables,
            },
        });
    };

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={() => <RepositoryInfo repository={repositoryQuery.data.repository} />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    )
};

export default SingleRepository;