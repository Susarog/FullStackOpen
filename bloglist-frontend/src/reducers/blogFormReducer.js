import { createSlice } from '@reduxjs/toolkit'

const blogInputSlice = createSlice({
  name: 'blogInput',
  initialState: {
    title: '',
    author: '',
    url: '',
  },
  reducers: {
    setTitle: (state, action) => {
      return { ...state, title: action.payload }
    },
    setAuthor: (state, action) => {
      return { ...state, author: action.payload }
    },
    setUrl: (state, action) => {
      return { ...state, url: action.payload }
    },
    resetText: () => {
      return { title: '', author: '', url: '' }
    },
  },
})

export const { setTitle, setAuthor, setUrl, resetText } = blogInputSlice.actions
export default blogInputSlice.reducer
