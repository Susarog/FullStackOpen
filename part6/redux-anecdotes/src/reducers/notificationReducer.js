import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text: '',
    timeoutId: undefined
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        postNotification(state, action) {
            if (typeof state.timeoutId === 'number') {
                clearTimeout(state.timeoutId)
            }
            return state = {timeoutId:undefined, text:action.payload}        
        },
        removeNotification(state, action) {
            return state = {
                text: '',
                timeoutId: undefined
            }
        },
        updateTimeoutId(state,action) {
            return state = {
                ...state,
                timeoutId: action.payload
            }
        }
    }
})

export const { postNotification, removeNotification, updateTimeoutId } = notificationSlice.actions
export default notificationSlice.reducer 

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(postNotification(text))
        const id = setTimeout(() => {
            dispatch(removeNotification())
          }, time)
        dispatch(updateTimeoutId(id))
      }
}