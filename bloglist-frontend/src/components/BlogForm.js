import { createBlog } from '../reducers/blogsReducer'
import { newNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTitle,
  setUrl,
  setAuthor,
  resetText,
} from '../reducers/blogFormReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const inputBlog = useSelector((state) => state.blogForm)
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = inputBlog
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
    dispatch(resetText())
  }
  const handleTitle = (event) => {
    dispatch(setTitle(event.target.value))
  }
  const handleAuthor = (event) => {
    dispatch(setAuthor(event.target.value))
  }
  const handleUrl = (event) => {
    dispatch(setUrl(event.target.value))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={inputBlog.title}
            name='Title'
            id='title-input'
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={inputBlog.author}
            name='Author'
            id='author-input'
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
          <input
            type='url'
            value={inputBlog.url}
            name='Url'
            id='url-input'
            onChange={handleUrl}
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
