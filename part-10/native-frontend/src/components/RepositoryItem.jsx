import {  View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';
import theme from '../theme';

const styles = StyleSheet.create({
    item: {
        backgroundColor: theme.colors.backgroundSecondary,
    },
    titleFlexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: theme.dimensions.avatarImageHeight,
        margin: theme.dimensions.margin,
        gap: theme.dimensions.margin,
    },
    descriptionContainer: {
        rowGap: 5,
        width: "80%"
    },
    image: {
        width: theme.dimensions.avatarImageWidth,
        height: theme.dimensions.avatarImageHeight,
        borderRadius: theme.dimensions.avatarBorderRadius,
    },
    languageTagContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: theme.dimensions.avatarImageHeight + (theme.dimensions.margin * 2),
    },
    languageTag: {
        color: theme.colors.textTertiary,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.dimensions.languageTagBorderRadius,
        overflow: 'hidden',
        padding: theme.dimensions.languageTagPadding,
    },
    labelFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingVertical: theme.dimensions.labelBarVerticalPadding,
    },
    labelItemsContainer: {
        flexDirection: "column",
        flexBasis: "25%",
        alignItems: "center",
    },
});

const addThousandSymbol = (value) => {
    if (value >= 1000) {
        return String(Math.round(value / 100) / 10) + 'k';
    }
    return String(value);
};

const RepositoryItem = ({ repository }) => {
    const navigate = useNavigate();

    const handlePress = () => {
        navigate(`/${repository.id}`);
    };

    return (
        <Pressable style={styles.item} testID="repositoryItem" onPress={handlePress}>
            <View style={styles.titleFlexContainer}>
                <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
                    <View style={styles.descriptionContainer}>
                        <StyledText fontWeight="bold" fontSize="subheading">{repository.fullName}</StyledText>
                        <StyledText color="textSecondary">{repository.description}</StyledText>
                    </View>
            </View>

            <View style={styles.languageTagContainer}>
                <StyledText style={styles.languageTag}>{repository.language}</StyledText>
            </View>
            
            <View style={styles.labelFlexContainer}>
                <View style={styles.labelItemsContainer}>
                    <StyledText fontWeight="bold">{addThousandSymbol(repository.stargazersCount)}</StyledText>
                    <StyledText color="textSecondary">Stars</StyledText>
                </View>
                
                <View style={styles.labelItemsContainer}>
                    <StyledText fontWeight="bold">{addThousandSymbol(repository.forksCount)}</StyledText>
                    <StyledText color="textSecondary">Forks</StyledText>
                </View>

                <View style={styles.labelItemsContainer}>
                    <StyledText fontWeight="bold">{addThousandSymbol(repository.reviewCount)}</StyledText>
                    <StyledText color="textSecondary">Reviews</StyledText>
                </View>

                <View style={styles.labelItemsContainer}>
                    <StyledText fontWeight="bold">{addThousandSymbol(repository.ratingAverage)}</StyledText>
                    <StyledText color="textSecondary">Rating</StyledText>
                </View>

            </View>
        </Pressable>
    );
};

export default RepositoryItem;