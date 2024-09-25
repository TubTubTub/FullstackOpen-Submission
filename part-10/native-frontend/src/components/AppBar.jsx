import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import StyledText from './StyledText';
import theme from '../theme';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: theme.colors.statusBarBackground,
    },
    scrollContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap:  theme.dimensions.statusBarFlexItemMargin,
    },
    text: {
        color: theme.colors.textStatusBar,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBarItem = ({ text, link }) => {
    return (
        <Link to={link}>
            <StyledText style={styles.text}>{text}</StyledText>
        </Link>
    );
};

const SignOutItem = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate('/');
        
    };

    return (
        <Pressable onPress={handleSignOut}>
            <StyledText style={styles.text}>Sign Out</StyledText>
        </Pressable>
    );
}

const AppBar = () => {
    const meResult = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} horizontal showsHorizontalScrollIndicator={false}>
                <AppBarItem text="Repository" link="/"/>
                {meResult.data?.me ? <AppBarItem text="My reviews" link="/reviews" /> : null}
                {meResult.data?.me ? <AppBarItem text="Create a review" link="/create" /> : null}
                {!meResult.data?.me ? <AppBarItem text="Sign In" link="/signin" /> : null}
                {!meResult.data?.me ? <AppBarItem text="Sign Up" link="/signup" /> : null}
                {meResult.data?.me ? <SignOutItem /> : null}
            </ScrollView>
        </View>
    )
};

export default AppBar;