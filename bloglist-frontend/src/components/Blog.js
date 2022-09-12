import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogsReducer'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const updateVisible = () => {
    setVisible(!visible)
  }
 
  const handleRemoveBlog = () => {
    if (
      window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      )
    ) {
      dispatch(removeBlog(blog.id))
    }
  }

  const addLikes = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author:blog.author,
      title: blog.title,
      url:blog.url
    }
    dispatch(likeBlog(blog.id, newBlog))
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={updateVisible}>hide</button>
        <div>{blog.url}</div>
        <div className='like-div'>
          likes {blog.likes}
          <button onClick={addLikes}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <button onClick={handleRemoveBlog}>delete</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={updateVisible}>view</button>
      </div>
    )
  }
}

export default Blog
