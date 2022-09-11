import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import { updateVisible } from '../reducers/blogsReducer'

const Blog = ({ currBlog, deleteBlog }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleVisibility = () => {
    dispatch(updateVisible(currBlog))
  }
  const removeBlog = () => {
    if (
      window.confirm(
        `Remove blog ${currBlog.blog.title} by ${currBlog.blog.author}`
      )
    ) {
      deleteBlog(currBlog.blog.id)
    }
  }

  const addLikes = () => {
    const tempBlog = {
      user: currBlog.blog.user,
      likes: currBlog.blog.likes,
      author: currBlog.blog.author,
      title: currBlog.blog.title,
      url: currBlog.blog.url,
    }
    dispatch(likeBlog(currBlog.blog.id, tempBlog))
  }

  if (currBlog.visibility) {
    return (
      <div style={blogStyle}>
        {currBlog.blog.title} {currBlog.blog.author}
        <button onClick={handleVisibility}>hide</button>
        <div>{currBlog.blog.url}</div>
        <div className='like-div'>
          likes {currBlog.blog.likes}
          <button onClick={addLikes}>like</button>
        </div>
        <div>{currBlog.blog.user.username}</div>
        <button onClick={removeBlog}>delete</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {currBlog.blog.title} {currBlog.blog.author}
        <button onClick={handleVisibility}>view</button>
      </div>
    )
  }
}

export default Blog
