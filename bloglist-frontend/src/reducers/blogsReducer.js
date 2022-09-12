import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog: (state, action) => {
      return action.payload
    },
    postBlog: (state, action) => {
      const blog = action.payload
      state.push(blog)
    },
    updateBlog: (state, action) => {
      const oldBlog = state.find(
        (currBlog) => currBlog.id === action.payload.id
      )
      const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 }
      return state.map((currBlog) =>
        currBlog.id === updatedBlog.id ? updatedBlog : currBlog
      )
    },
  },
})

export const { setBlog, postBlog, updateBlog } =
  blogSlice.actions
export default blogSlice.reducer

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch(postBlog(response.data))
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const newBlog = await blogService.update(id, updatedBlog)
    dispatch(updateBlog(newBlog.data))
  }
}