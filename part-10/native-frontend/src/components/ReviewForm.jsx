import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
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
        margin: theme.dimensions.inputMargin
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
    errorMessage: {
        alignSelf: 'center',
        textAlign: 'left',
        width: '90%',
        color: theme.colors.textError,
        backgroundColor: theme.colors.backgroundError,
        borderRadius: theme.dimensions.inputBorderRadius,
        padding: theme.dimensions.inputPadding,
        margin: theme.dimensions.inputMargin,
        overflow: 'hidden',
    },
    formikErrorMessage: {
        fontSize: theme.fontSizes.body,
        paddingHorizontal: theme.dimensions.inputPadding + theme.dimensions.inputMargin,
    },
})

const initialValues = {
    repositoryOwnerName: '',
    repositoryName: '',
    rating: '',
    review: '',
};

const validationSchema = yup.object().shape({
    repositoryOwnerName: yup
        .string()
        .required(),
    repositoryName: yup
        .string()
        .required(),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required(),
    review: yup
        .string(),
});


const ReviewForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [createReview] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { repositoryOwnerName, repositoryName, rating, review } = values;
        console.log(`Creating new review for ${repositoryName}...`);

        try {
            const { data } = await createReview({ repositoryOwnerName, repositoryName, rating, review});
            console.log('RECEIVED:', data);
            navigate(`${data.id}`);
        } catch(error) {
            console.log(`Error has occured (ReviewForm.jsx): ${error}`);
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            {errorMessage !== '' ? <StyledText style={styles.errorMessage}>{errorMessage}</StyledText> : null}

            <TextInput
                placeholder="Repository owner name"
                value={formik.values.repositoryOwnerName}
                onChangeText={formik.handleChange('repositoryOwnerName')}
                style={[styles.textInput, { borderColor: formik.errors.repositoryOwnerName ? theme.colors.textError : theme.colors.inputBorder}]}
            />
            {formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName && (
                <StyledText color="textError" style={styles.formikErrorMessage}>
                    {formik.errors.repositoryOwnerName.replace(/^./, formik.errors.repositoryOwnerName[0].toUpperCase())}
                </StyledText>
            )}

            <TextInput
                placeholder="Repository name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
                style={[styles.textInput, { borderColor: formik.errors.repositoryName ? theme.colors.textError : theme.colors.inputBorder}]}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <StyledText color="textError" style={styles.formikErrorMessage}>
                    {formik.errors.repositoryName.replace(/^./, formik.errors.repositoryName[0].toUpperCase())}
                </StyledText>
            )}

            <TextInput
                placeholder="Rating between 0 and 100"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                style={[styles.textInput, { borderColor: formik.errors.rating ? theme.colors.textError : theme.colors.inputBorder}]}
                keyboardType="number-pad"
            />
            {formik.touched.rating && formik.errors.rating && (
                <StyledText color="textError" style={styles.formikErrorMessage}>
                    {formik.errors.rating.replace(/^./, formik.errors.rating[0].toUpperCase())}
                </StyledText>
            )}

            <TextInput
                placeholder="Review"
                value={formik.values.review}
                onChangeText={formik.handleChange('review')}
                style={[styles.textInput, { borderColor: formik.errors.review ? theme.colors.textError : theme.colors.inputBorder}]}
                multiline
            />
            {formik.touched.review && formik.errors.review && (
                <StyledText color="textError" style={styles.errorMessage}>
                    {formik.errors.review.replace(/^./, formik.errors.review[0].toUpperCase())}
                </StyledText>
            )}

            <Pressable onPress={formik.handleSubmit}>
                <StyledText color="textTertiary" fontWeight="bold" style={styles.submitButton}>Create a review</StyledText>
            </Pressable>
        </View>
    )
};

export default ReviewForm;