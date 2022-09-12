import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from './reducers/blogsReducer'
import {
  login,
  logout,
} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        dispatch(setBlog(blogs.data))
      })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logout())
  }

  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.notification.text)
  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <Form />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <div>
          <p style={{ display: 'inline-block' }}>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel={'new note'}>
          <BlogForm />
        </Togglable>
        <div className='bloglist'>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      </div>
    )
  }
}

export default App
