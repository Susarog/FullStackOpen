import { createSlice } from '@reduxjs/toolkit'

const togglableSlice = createSlice({
  name: 'togglable',
  initialState: false,
  reducers: {
    setVisible: (state) => {
      return (state = !state)
    },
  },
})
export const { setVisible } = togglableSlice.actions
export default togglableSlice.reducer
