import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl]= useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    createBlog(newBlog)
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
            type="text"
            value={title}
            name="Title"
            id='title-input'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="Author"
            id='author-input'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="url"
            value={url}
            name="Url"
            id='url-input'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm