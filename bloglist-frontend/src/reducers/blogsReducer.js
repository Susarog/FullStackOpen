import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { newNotification } from './notificationReducer'

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
    deleteBlog: (state, action) => {
      return state.filter((currBlog) => currBlog.id !== action.payload)
    },
    updateComment: (state, action) => {
      const oldBlog = state.find(
        (currBlog) => currBlog.id === action.payload.id
      )
      const updatedBlog = {
        ...oldBlog,
        comments: oldBlog.comments.concat(action.payload.input),
      }
      return state.map((currBlog) =>
        currBlog.id === updatedBlog.id ? updatedBlog : currBlog
      )
    },
  },
})

export const { setBlog, postBlog, updateBlog, deleteBlog, updateComment } =
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

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(deleteBlog(id))
    } catch {
      dispatch(newNotification('cannot delete blog', 5000))
      dispatch(deleteBlog(id))
    }
  }
}

export const updateComments = (id, blog, input) => {
  return async (dispatch) => {
    await blogService.postComment(id, { blog, text: input })
    dispatch(updateComment({ id, input }))
  }
}
