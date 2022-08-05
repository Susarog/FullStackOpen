const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const res = await Blog.find({})
  response.json(res)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const newBlog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })


  const blog = new Blog(newBlog)
  const result = blog.save()
  response.status(201).json(result)
})
module.exports = blogsRouter