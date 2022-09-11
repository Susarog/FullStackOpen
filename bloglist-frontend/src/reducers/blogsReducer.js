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
        (currBlog) => currBlog.blog.id === action.payload.blog.id
      )

      const updateLikes = { ...oldBlog.blog, likes: oldBlog.blog.likes + 1 }
      const updatedBlog = { blog: updateLikes, visibility: oldBlog.visibility }
      return state.map((currBlog) =>
        currBlog.blog.id === updatedBlog.blog.id ? updatedBlog : currBlog
      )
    },

    changeVisible: (state, action) => {
      const oldBlog = state.find((currBlog) => {
        return currBlog.blog.id === action.payload.blog.id
      })
      const updatedBlog = { ...oldBlog, visibility: !oldBlog.visibility }
      return state.map((currBlog) =>
        currBlog.blog.id === updatedBlog.blog.id ? updatedBlog : currBlog
      )
    },
  },
})

export const { setBlog, postBlog, updateBlog, changeVisible } =
  blogSlice.actions
export default blogSlice.reducer

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch(postBlog({ blog: response.data, visibility: false }))
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const newBlog = await blogService.update(id, updatedBlog)
    dispatch(updateBlog({ blog: newBlog.data }))
  }
}

export const updateVisible = (blog) => {
  return async (dispatch) => {
    dispatch(changeVisible(blog))
  }
}
