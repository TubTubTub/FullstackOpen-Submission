import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import StyledText from './StyledText';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.backgroundSecondary,
        paddingVertical: theme.dimensions.signInMargin
    },
    button: {
        alignSelf: 'center',
        textAlign: 'left',
        width: '90%',
        borderRadius: theme.dimensions.inputBorderRadius,
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
    },
    inputButton: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderWidth: theme.dimensions.inputBorderWidth,
        borderStyle: 'solid',
    },
    signInButton: {
        backgroundColor: theme.colors.primary,
        textAlign: 'center',
        overflow: 'hidden',
    },
    errorButton: {
        backgroundColor: theme.colors.backgroundError,
        color: theme.colors.textError,
        overflow: 'hidden',
    },
    errorMessage: {
        fontSize: theme.fontSizes.body,
        paddingHorizontal: theme.dimensions.inputPadding + theme.dimensions.inputMargin,
    },
});

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1)
        .max(32)
        .required(),
    password: yup
        .string()
        .min(1)
        .max(32)
        .required(),
});

export const SignInContainer = ({ onSubmit, errorMessage }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            {errorMessage !== '' ? <StyledText style={[styles.button, styles.errorButton]}>{errorMessage}</StyledText> : null}

            <TextInput
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={[styles.button, styles.inputButton, { borderColor: formik.errors.username ? theme.colors.textError : theme.colors.inputBorder }]}
            />
            {formik.touched.username && formik.errors.username && (
                <StyledText color="textError" style={styles.errorMessage}>
                    {formik.errors.username.replace(/^./, formik.errors.username[0].toUpperCase())}
                </StyledText>
            )}

            <TextInput
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                style={[styles.button, styles.inputButton, { borderColor: formik.errors.password ? theme.colors.textError : theme.colors.inputBorder }]}
                secureTextEntry
                />
            {formik.touched.password && formik.errors.password && (
                <StyledText color="textError" style={styles.errorMessage}>
                    {formik.errors.password.replace(/^./, formik.errors.password[0].toUpperCase())}
                </StyledText>
            )}

            <Pressable onPress={formik.handleSubmit}>
                <StyledText color="textTertiary" fontWeight="bold" style={[styles.button, styles.signInButton]}>Sign In</StyledText>
            </Pressable>
        </View>
    );
}


const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (values) => {
        const { username, password } = values;
        console.log(`Signed in with username ${username}: password ${password}`);

        try {
            const { data } = await signIn({ username, password });
            navigate('/');
        } catch(error) {
            console.log(`Error has occured (SignIn.jsx): ${error}`);
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    return <SignInContainer onSubmit={onSubmit} errorMessage={errorMessage} />
};

export default SignIn;