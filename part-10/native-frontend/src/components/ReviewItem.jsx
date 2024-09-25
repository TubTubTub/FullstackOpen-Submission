import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import StyledText from './StyledText';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundSecondary,
    },
    reviewFlexContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
    },
    ratingContainer: {
        paddingHorizontal: theme.dimensions.ratingContainerPadding,
        alignSelf: 'flex-start',
    },
    ratingText: {
        width: theme.dimensions.ratingTextWidth,
        height: theme.dimensions.ratingTextHeight,
        borderWidth: theme.dimensions.ratingTextBorderWidth,
        borderStyle: 'solid',
        borderColor: theme.colors.primary,
        borderRadius: theme.dimensions.ratingTextWidth / 2,
        textAlign: 'center',
        lineHeight: theme.dimensions.ratingTextHeight - 5,
    },
})

const ReviewItem = ({ review }) => {
    return (
        <View style={[styles.container, { flexDirection: 'row', paddingVertical: 10 }]}>
            <View style={styles.ratingContainer}>
                <StyledText color="primary" fontSize="subheading" fontWeight="bold" style={styles.ratingText}>{review.rating}</StyledText>
            </View>
            <View style={styles.reviewFlexContainer}>
                <StyledText fontWeight="bold">{review.user.username}</StyledText>
                <StyledText color="textSecondary">{format(review.createdAt, 'dd.MM.yyyy')}</StyledText>
                <StyledText>{review.text}</StyledText>
            </View>
        </View>
    );
};

export default ReviewItem;