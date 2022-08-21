import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs (blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user.data)
      )
      setUser(user.data)
      blogService.setToken(user.data.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createBlog = async (newBlog) => {
    if(newBlog.title.length === 0 || newBlog.author.length === 0 || newBlog.url.length === 0){
      setMessage('enter input for all three boxes')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response.data))
    setMessage(`a new blog ${response.data.title} by ${response.data.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const updateLikes = async (blogId,updatedBlog) => {
    const response = await blogService.update(blogId ,updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog : response.data))
  }
  const deleteBlog = async (blogId) => {
    try{
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (err){
      setMessage('cannot delete blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }


  if(user === null) {
    return (
      <div>
        <Notification message={message}/>
        <Form handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <div>
          <p style={{ display:'inline-block' }}>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel={'new note'}>
          <BlogForm createBlog={createBlog}/>
        </Togglable>
        <div className='bloglist'>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes ={updateLikes} deleteBlog={deleteBlog}/>
          )}
        </div>
      </div>
    )
  }
}

export default App
