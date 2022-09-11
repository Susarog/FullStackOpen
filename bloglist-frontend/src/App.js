import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from './reducers/blogsReducer'
import { newNotification } from './reducers/notificationReducer'
import {
  updatePassword,
  updateUsername,
  login,
  logout,
} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        return blogs.map((blog) => {
          return {
            blog,
            visibility: false,
          }
        })
      })
      .then((updatedBlogs) => {
        dispatch(setBlog(updatedBlogs))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    loginService
      .login({ username, password })
      .then((user) => {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user.data))
        blogService.setToken(user.data.token)
        dispatch(login(user.data))
      })
      .catch(() => {
        dispatch(newNotification('wrong username or password', 5000))
        dispatch(updateUsername(''))
        dispatch(updatePassword(''))
      })
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logout())
  }

  /*
  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (err) {
      setMessage('cannot delete blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
*/
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.notification.text)
  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <Form handleLogin={handleLogin} />
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
            .sort((a, b) => b.blog.likes - a.blog.likes)
            .map((it) => (
              <Blog key={it.blog.id} currBlog={it} />
            ))}
        </div>
      </div>
    )
  }
}

export default App
