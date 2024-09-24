import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (content, duration) => {
    return (dispatch) => {
        dispatch(addNotification(content))
        setTimeout(() => dispatch(addNotification(null)), duration * 1000)
    }
}
export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer