const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const res = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(res)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = request.user
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (!body.title && !body.url) {
    response.status(400).end()
  } else {
    const user = await User.findById(decodedToken.id)
    const newBlog = new Blog({
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
      comments: [],
    })
    const savedBlog = await newBlog.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const decodedToken = request.user
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  }
  const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  }).populate('user', { username: 1, name: 1 })
  response.json(res)
})

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body
    const decodedToken = request.user
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else if (body.text.length === 0) {
      response.status(400).end()
    } else {
      const user = await User.findById(decodedToken.id)
      const newBlog = {
        title: body.blog.title,
        author: body.blog.author,
        url: body.blog.url,
        likes: body.blog.likes,
        comments: body.blog.comments.concat(body.text),
      }
      console.log(newBlog)

      const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
        new: true,
      }).populate('user', { username: 1, name: 1 })

      user.blogs = user.blogs.filter((blog) =>
        blog.id === request.params.id ? newBlog : blog
      )
      await user.save()
      response.status(201).json(res)
    }
  }
)

module.exports = blogsRouter
