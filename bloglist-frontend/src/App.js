import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from './reducers/blogsReducer'
import { login, logout } from './reducers/userReducer'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { setUsers } from './reducers/usersReducer'
const BlogsList = (props) => {
  return (
    <div>
      <h2>Blogs List</h2>
      <Togglable buttonLabel={'new note'}>
        <BlogForm />
      </Togglable>
      <div className='bloglist'>
        {props.blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  )
}

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>blogs created</td>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlog(blogs.data))
    })
  }, [dispatch])

  useEffect(() => {
    userService.getUsers().then((users) => {
      dispatch(setUsers(users.data))
    })
  })

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
  const users = useSelector((state) => state.users)
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
        <Routes>
          <Route path='/' element={<BlogsList blogs={blogs} />} />
          <Route path='/users' element={<Users users={users} />} />
        </Routes>
      </div>
    )
  }
}

export default App
