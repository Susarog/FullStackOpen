import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl]= useState('')
  const [user, setUser] = useState(null)

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
      console.log(exception)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createBlog = async () => {
    const newBlog = {
      title,
      author,
      url
    }
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response.data))
    setAuthor('')
    setUrl('')
    setTitle('')
  }
  if(user === null) {
    return (
      <Form handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
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
