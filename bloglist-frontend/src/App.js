import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl]= useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user.data)
      ) 
      setUser(user.data)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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

  const createBlog = async (event) => {
    event.preventDefault()
    if(title.length === 0 || author.length === 0 || url.length === 0){
      setMessage('malformed input')
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    const newBlog = {
      title,
      author,
      url
    }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response.data))
      setMessage(`a new blog ${response.data.title} by ${response.data.author} added`)
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setAuthor('')
      setUrl('')
      setTitle('')
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
        <p style={{display:"inline-block"}}>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
        </div>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
</form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
