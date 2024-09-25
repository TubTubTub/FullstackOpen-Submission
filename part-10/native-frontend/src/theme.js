import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textTertiary: '#ffffff',
        textStatusBar: '#ffffff',
        textError: '#d73a4a',
        backgroundPrimary: '#e1e4e8',
        backgroundSecondary: '#ffffff',
        backgroundError: '#ffcccc',
        primary: '#0366d6',
        statusBarBackground: '#24292e',
        inputBorder: '#aaaaaa',

    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    dimensions: {
        margin: 15,
        avatarImageWidth: 50,
        avatarImageHeight: 50,
        avatarBorderRadius: 5,
        languageTagPadding: 7,
        languageTagBorderRadius: 5,
        labelBarVerticalPadding: 15,
        statusBarFlexItemMargin: 15,
        inputBorderWidth: 1,
        inputBorderRadius: 5,
        inputPadding: 15,
        inputMargin: 10,
        loadingMargin: 30,
        ratingContainerPadding: 10,
        ratingTextWidth: 50,
        ratingTextHeight: 50,
        ratingTextBorderWidth: 2,
    }
};

export default theme;