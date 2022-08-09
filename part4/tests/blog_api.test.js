const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let note of helper.initialBlogs) {
    let blogObj = new Blog(note)
    await blogObj.save()
  }
})
describe('specific blog',() => {
  test('unique id exist', async () => {
    const response = await helper.get()
    for (let element in response.body) {
      expect(element.id).toBeDefined()
    }
  })
})
describe('when there is initially some blogs saved', () => {
  test('blogs will have the same length', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('adding new blog', () => {
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


  test('missing likes property', async() => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const arrBlogs = await helper.get()
    expect(arrBlogs[arrBlogs.length - 1].likes).toBe(0)
  })

  test('missing title and url', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const arrBlogs = await helper.get()
    expect(arrBlogs.length).toBe(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('will return status 204 if its id is valid', async () => {
    const initialBlogArr = await helper.get()
    const deletedBlog = initialBlogArr[0]
    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .expect(204)
    const currBlogArr = await helper.get()
    expect(currBlogArr.length).toBe(initialBlogArr.length-1)
    const title = currBlogArr.map(obj => obj.title)
    expect(title).not.toContain(deletedBlog.title)
  })
})

describe('updating a blog post', () => {
  test('will return updated blog', async () => {
    const initialBlogArr = await helper.get()
    const initialBlog = initialBlogArr[0]
    const updatedBlog = { ...initialBlog, likes: 123 }
    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(updatedBlog)
    const currBlogArr = await helper.get()
    expect(currBlogArr[0]).toEqual(updatedBlog)

  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('when creating a new user to the web app', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('it will succeed if there is more than 3 char for both username and password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser= {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })
  test('it will fail if there is less than 3 char for both username and pass', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })
  test('it will fail if there is less than 3 char for pass', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'roasdfasdf',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('User validation failed: password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })
  test('it will fail if there is less than 3 char for user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'saasdfasdf',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('User validation failed: username')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })
})

afterAll(() => {
  mongoose.connection.close()
})