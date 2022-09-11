import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogFormReducer from './reducers/blogFormReducer'
import togglableReducer from './reducers/togglableReducer'
const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    blogForm: blogFormReducer,
    togglableVisible: togglableReducer,
  },
})

export default store
