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
  } else if(!body.title && !body.url){
    response.status(400).end()
  } else {
    const user = await User.findById(decodedToken.id)
    const newBlog = new Blog({
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = request.user
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const res = await Blog.findByIdAndUpdate(request.params.id,newBlog,{ new:true })
  response.json(res)
})
module.exports = blogsRouter