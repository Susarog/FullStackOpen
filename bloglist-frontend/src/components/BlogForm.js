import { useState } from 'react'
import { createBlog } from '../reducers/blogsReducer'
import { newNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    if (
      newBlog.title.length === 0 ||
      newBlog.author.length === 0 ||
      newBlog.url.length === 0
    ) {
      dispatch(newNotification('enter input for all three boxes', 5000))
      return
    }
    dispatch(createBlog(newBlog))
    dispatch(
      newNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        5000
      )
    )
    setAuthor('')
    setUrl('')
    setTitle('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            id='title-input'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            id='author-input'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='url'
            value={url}
            name='Url'
            id='url-input'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-blog-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}
export default BlogForm
