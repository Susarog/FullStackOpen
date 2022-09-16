import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: null,
    timeoutId: null,
    variant: '',
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
    updateVariant: (state, action) => {
      return (state = { ...state, variant: action.payload })
    },
  },
})

export const {
  setNotification,
  removeNotification,
  updateTimeoutId,
  updateVariant,
} = notificationSlice.actions
export default notificationSlice.reducer

export const newNotification = (text, time, variant) => {
  return async (dispatch) => {
    dispatch(setNotification(text))
    dispatch(updateVariant(variant))
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
      dispatch(updateVariant(''))
    }, time)
    dispatch(updateTimeoutId(timeoutId))
  }
}
