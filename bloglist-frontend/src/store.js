import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
