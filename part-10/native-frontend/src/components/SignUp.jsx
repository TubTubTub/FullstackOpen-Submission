import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import StyledText from './StyledText';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundSecondary,
    },
    textInput: {
        width: '90%',
        backgroundColor: theme.colors.backgroundSecondary,
        borderWidth: theme.dimensions.inputBorderWidth,
        borderStyle: 'solid',
        borderRadius: theme.dimensions.inputBorderRadius,
        alignSelf: 'center',
        textAlign: 'left',
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
    },
    submitButton: {
        width: '90%',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.dimensions.inputBorderRadius,
        alignSelf: 'center',
        textAlign: 'center',
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
        overflow: 'hidden',
    },
    formikErrorMessage: {
        fontSize: theme.fontSizes.body,
        paddingHorizontal: theme.dimensions.inputPadding + theme.dimensions.inputMargin,
    },
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5)
        .max(30)
        .required(),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required(),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], "Password confirmation must match entered password!")
        .required(),
});

const SignUp = () => {
    const [createUser] = useCreateUser();
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(`Creating a new user ${username}...`);
        const { username, password, passwordConfirmation } = values;
        try {
            const { data } = await createUser({ username, password });
            console.log(`RECEIVED:`, data);
            await signIn({ username, password });
            navigate('/');
        } catch(error) {
            console.log(`Error has occured (SignIn.jsx): ${error}`);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={[styles.textInput, { borderColor: formik.errors.username ? theme.colors.textError : theme.colors.inputBorder }]}
            />
            {formik.touched.username && formik.errors.username && (
                <StyledText color="textError" style={styles.formikErrorMessage}>
                    {formik.errors.username.replace(/^./, formik.errors.username[0].toUpperCase())}
                </StyledText>
            )}

            <TextInput
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                style={[styles.textInput, { borderColor: formik.errors.password ? theme.colors.textError : theme.colors.inputBorder }]}
                secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
                <StyledText color="textError" style={styles.formikErrorMessage}>
                    {formik.errors.password.replace(/^./, formik.errors.password[0].toUpperCase())}
                </StyledText>
            )}

            <TextInput
                placeholder="Password confirmation"
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
                style={[styles.textInput, { borderColor: formik.errors.passwordConfirmation ? theme.colors.textError: theme.colors.inputBorder }]}
                secureTextEntry
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <StyledText color="textError" style={styles.formikErrorMessage}>
                    {formik.errors.passwordConfirmation.replace(/^./, formik.errors.passwordConfirmation[0].toUpperCase())}
                </StyledText>
            )}
            
            <Pressable onPress={formik.handleSubmit}>
                <StyledText color="textTertiary" fontWeight="bold" style={styles.submitButton}>Sign up</StyledText>
            </Pressable>
        </View>
    )
};

export default SignUp;