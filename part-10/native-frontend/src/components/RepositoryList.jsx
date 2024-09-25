import { useState, Component } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_REPOSITORIES } from '../graphql/queries';
import { useDebounce } from 'use-debounce';
import { FlatList, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import StyledText from './StyledText';
import Loading from './Loading';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    headerContainer: {
        backgroundColor: theme.colors.backgroundPrimary,
    },
    filterInput: {
        width: '90%',
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.dimensions.inputBorderRadius,
        alignSelf: 'center',
        textAlign: 'left',
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
    },
    sortButton: {
        width: '90%',
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.dimensions.inputBorderRadius,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
        overflow: 'hidden',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ sortPrinciple, setSortPrinciple }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.sortContainer}>
            <Pressable onPress={() => setVisible(!visible)}>
                <StyledText fontWeight="bold" style={styles.sortButton}>Sort by</StyledText>
            </Pressable>
            <Picker selectedValue={sortPrinciple} onValueChange={(value) => setSortPrinciple(value)} style={{ display: visible ? 'flex' : 'none' }}>
                <Picker.Item label="Latest repositories" value="latest" />
                <Picker.Item label="Highest rated repositories" value="highrated" />
                <Picker.Item label="Lowest rated repositories" value="lowrated" />
            </Picker>
        </View>
    );
};

const RepositoryListHeader = () => {
    const [filter, setFilter] = useState('');
    const [sortPrinciple, setSortPrinciple] = useState('latest');
    const [debouncedFilter] = useDebounce(filter, 500);

    const queryVariables = {
        orderBy: sortPrinciple === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
        orderDirection: sortPrinciple === 'lowrated' ? 'ASC' : 'DESC',
        searchKeyword: debouncedFilter,
        first: 7,
    };

    useQuery(ALL_REPOSITORIES, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
    });

    return (
        <View style={styles.headerContainer}>
            <TextInput value={filter} onChangeText={(value) => setFilter(value)} style={styles.filterInput} />
            <SortPicker sortPrinciple={sortPrinciple} setSortPrinciple={setSortPrinciple} />
        </View>
    )

}

export class RepositoryContainer extends Component {
    renderHeader = () => <RepositoryListHeader />

    render() {
        const props = this.props;

        return (
            <FlatList
                data={props.repositories}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <RepositoryItem repository={item} />}
                ListHeaderComponent={this.renderHeader}
                onEndReached={props.onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

const RepositoryList = () => {
    const defaultQueryVariables = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
        searchKeyword: '',
        first: 7,
    };

    const queryResult = useQuery(ALL_REPOSITORIES, {
        variables: defaultQueryVariables,
        fetchPolicy: 'cache-and-network',
    });

    if (queryResult.loading) return <Loading />;

    const handleFetchMore = () => {
        const canFetchMore = !queryResult.loading && queryResult.data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        queryResult.fetchMore({
            variables: {
                after: queryResult.data.repositories.pageInfo.endCursor,
                ...defaultQueryVariables,
            },
        });
    };

    const onEndReach = () => {
        console.log('Fetching more repositories...');
        handleFetchMore();
    };

    const repositoryNodes = queryResult.data?.repositories ? queryResult.data.repositories.edges.map(edge => edge.node) : [];  

    return (
        <RepositoryContainer
            repositories={repositoryNodes}
            onEndReach={onEndReach}
        />
    );
};

export default RepositoryList;