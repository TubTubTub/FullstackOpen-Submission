import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    successMessage: null,
    errorMessage: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addSucessMessage(state, action) {
            return {
                errorMessage: state.errorMessage,
                successMessage: action.payload
            }
        },
        addErrorMessage(state, action) {
            return {
                successMessage: state.successMessage,
                errorMessage: action.payload
            }
        }
    }
})

export const setSuccessNotification = (content, delaySeconds) => {
    return (dispatch) => {
        dispatch(addSucessMessage(content))
        setTimeout(() => dispatch(addSucessMessage(null)), delaySeconds * 1000)
    }
}
export const setErrorNotification = (content, delaySeconds) => {
    return (dispatch) => {
        dispatch(addErrorMessage(content))
        setTimeout(() => dispatch(addErrorMessage(null)), delaySeconds * 1000)
    }
}
export const { addSucessMessage, addErrorMessage } = notificationSlice.actions
export default notificationSlice.reducer