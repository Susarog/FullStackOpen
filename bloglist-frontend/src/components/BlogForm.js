import { useState } from 'react'
import { createBlog } from '../reducers/blogsReducer'
import { newNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={addBlog}>
        <Form.Group className='mb-3' controlId='title-input'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='author-input'>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='url-input'>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type='url'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button className='mb-3' id='submit-blog-button' type='submit'>
          create
        </Button>
      </Form>
    </div>
  )
}
export default BlogForm
