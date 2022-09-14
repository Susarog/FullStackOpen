import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog, likeBlog, updateComments } from './reducers/blogsReducer'
import { login, logout } from './reducers/userReducer'
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom'
import { setUsers } from './reducers/usersReducer'
import { Table, Form, Button, Nav, Navbar, Container } from 'react-bootstrap'

const BlogsList = (props) => {
  return (
    <div>
      <Togglable buttonLabel={'create new'}>
        <BlogForm />
      </Togglable>
      <Table striped>
        <tbody>
          {props.blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr>
                <td>
                  <Blog key={blog.id} blog={blog} />
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
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
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((currUser) => currUser.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}
const BlogPage = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find((currBlog) => currBlog.id === id)
  const [input, setInput] = useState('')
  const addLikes = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    dispatch(likeBlog(blog.id, newBlog))
  }
  const handleInput = (event) => {
    setInput(event.target.value)
  }
  const commentBlog = (event) => {
    event.preventDefault()
    dispatch(updateComments(blog.id, blog, input))
    setInput('')
  }
  if (!blog) {
    return null
  }
  let i = 0
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={addLikes}>like</button>
      </div>
      <div>added by {blog.author}</div>
      <h3>comments</h3>
      <form onSubmit={commentBlog}>
        <input
          id='comment'
          type='text'
          value={input}
          name='Comment'
          onChange={handleInput}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={i++}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

const NavBar = ({ user, handleLogout }) => {
  return (
    <div>
      <Navbar
        style={{ position: 'sticky' }}
        expand='lg'
        variant='light'
        bg='light'
        fixed='top'
      >
        <Container>
          <Navbar.Brand>Blogs List</Navbar.Brand>
          <Nav className='me-auto' as='ul'>
            <Nav.Item as='li'>
              <Nav.Link>
                <Nav.Link to='/' as={Link}>
                  blogs
                </Nav.Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link>
                <Nav.Link to='/users' as={Link}>
                  users
                </Nav.Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Navbar.Brand>{user.username} logged in</Navbar.Brand>
            <Button onClick={handleLogout}>logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlog(blogs.data))
    })
  }, [dispatch])

  useEffect(() => {
    userService.getUsers().then((users) => {
      dispatch(setUsers(users.data))
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
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)

  if (user === null) {
    return (
      <div className='container'>
        <Notification message={message} variant='danger' />
        <LoginForm />
      </div>
    )
  } else {
    return (
      <body>
        <NavBar user={user} handleLogout={handleLogout} />
        <div className='container pt-3'>
          <h2 className='mb-3'>Blogs</h2>
          <Notification message={message} />

          <Routes>
            <Route path='/' element={<BlogsList blogs={blogs} />} />
            <Route path='/users' element={<Users users={users} />} />
            <Route path='/users/:id' element={<User users={users} />} />
            <Route path='/blogs/:id' element={<BlogPage blogs={blogs} />} />
          </Routes>
        </div>
      </body>
    )
  }
}

export default App
