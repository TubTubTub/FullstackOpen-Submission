import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository'
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.backgroundPrimary,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/:id" element={<SingleRepository />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create" element={<ReviewForm />} />
                <Route path="/reviews" element={<ReviewList />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
};

export default Main;