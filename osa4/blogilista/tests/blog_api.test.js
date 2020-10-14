const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  let token

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const response = await api
      .post('/api/login')
      .send({ username: 'mluukkai', password: 'salainen' })

    token = response.body.token
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('React patterns')
  })

  test('blogs are returned in the format where _id is replaced with id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  describe('adding a new blog', () => {
    test('succeeds with a valid data', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain('First class tests')
    })

    test('succeeds if parameter likes is left empty, sets likes to 0', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
      }

      const response = await api.post('/api/blogs').send(newBlog)
      expect(response.status).toBe(201)
      expect(response.body.likes).toBe(0)
    })

    test('fails with status code 400 if title missing', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status code 400 if author missing', async () => {
      const newBlog = {
        title: 'First class tests',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status code 400 if url missing', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('update of an existing blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = Object.assign(blogToUpdate, { title: 'abusing kerberos', likes: 100 })

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(updatedBlog)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain('abusing kerberos')
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlog = Object.assign(blogToUpdate, { title: 'abusing kerberos', likes: 100 })

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(updatedBlog)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).not.toContain('abusing kerberos')
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .put(`/api/blogs/${invalidId}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog',  () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })
})

describe('when there is initially some users at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const initialUsersCopy = JSON.parse(JSON.stringify(helper.initialUsers))
    const usersWithHashedPasswords = await Promise.all(initialUsersCopy
      .map(user =>  helper.addUserToDb(user)))
    await User.insertMany(usersWithHashedPasswords)
  })

  test('all users are returned', async () => {
    const response = await api
      .get('/api/users')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  describe('adding a new user', () => {
    test('succeeds with correct information', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'new_user',
        name: 'New User',
        password: 'secret'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
    })

    test('fails with status code 400 if username already exists', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'mluukkai',
        name: 'Matti another account',
        password: 'secret'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails with status code 400 if username shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'qu',
        name: 'Qubelka',
        password: 'secret'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('shorter than the minimum allowed length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUser.username)
    })

    test('fails with status code 400 if username missing', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: 'Qubelka',
        password: 'secret'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUser.username)
    })

    test('fails with status code 400 if password less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'qubelka',
        name: 'Qubelka',
        password: 'se'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('user should have a password of minimum 3 characters in length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUser.username)
    })

    test('fails with status code 400 if password missing', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'qubelka',
        name: 'Qubelka'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('user should have a password of minimum 3 characters in length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUser.username)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})