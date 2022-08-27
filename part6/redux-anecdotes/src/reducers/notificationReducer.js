import { createSlice } from "@reduxjs/toolkit";

const initialState = 'Hello World!'


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        postNotification(state, action) {
            state = action.payload            
        }
    }
})
export const { postNotification } = notificationSlice.actions
export default notificationSlice.reducer 