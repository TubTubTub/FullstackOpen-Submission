import { StyleSheet } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';

const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.dimensions.inputBorderRadius,
        padding: theme.dimensions.loadingMargin,
        top: '35%',
        alignSelf: 'center',
        overflow: 'hidden',
    },
})

const Loading = () => {
    return <StyledText style={styles.loadingText}>Loading...</StyledText>;
};

export default Loading;