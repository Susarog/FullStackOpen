import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: null,
    timeoutId: null,
  },
  reducers: {
    setNotification: (state, action) => {
      if (state.text !== null) {
        clearTimeout(state.timeoutId)
      }
      return (state = {
        text: action.payload,
        timeoutId: null,
      })
    },
    removeNotification: () => {
      return {
        text: null,
        timeoutId: null,
      }
    },
    updateTimeoutId: (state, action) => {
      return (state = { ...state, timeoutId: action.payload })
    },
  },
})

export const { setNotification, removeNotification, updateTimeoutId } =
  notificationSlice.actions
export default notificationSlice.reducer

export const newNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(text))
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time)
    dispatch(updateTimeoutId(timeoutId))
  }
}
