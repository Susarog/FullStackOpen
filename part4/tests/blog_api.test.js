const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let note of helper.initialBlogs) {
    let blogObj = new Blog(note)
    await blogObj.save()
  }
})

test('blogs have same length', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const arrBlogs = await helper.get()
  expect(arrBlogs.length).toBe(helper.initialBlogs.length + 1)
  const arrContent = arrBlogs.map(elem => elem.title)
  expect(arrContent).toContain('Go To Statement Considered Harmful')
})

afterAll(() => {
  mongoose.connection.close()
})