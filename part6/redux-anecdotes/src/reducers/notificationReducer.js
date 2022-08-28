import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        postNotification(state, action) {
            return state = action.payload          
        },
        removeNotification(state, action) {
            return state = ''
        }
    }
})
export const { postNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer 

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(postNotification(text))
        setTimeout(() => {
          dispatch(removeNotification())
        }, time)
      }
}