const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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
    describe('when user is authenticated', () => {
      let token

      beforeEach(async () => {
        await User.deleteMany({})
        const user = Object.assign({}, helper.initialUsers[0])
        const userWithHashedPassword = await helper.replacePasswordWithHash(user)
        await User.insertMany([userWithHashedPassword])

        const response = await api
          .post('/api/login')
          .send({ username: helper.initialUsers[0].username,
            password: helper.initialUsers[0].password })

        token = response.body.token
      })

      test('succeeds with valid data', async () => {
        await api
          .post('/api/blogs')
          .send(helper.newBlog)
          .set('Authorization', `Bearer ${token}`)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('First class tests')
      })

      test('succeeds if parameter likes is left empty, sets likes to 0', async () => {
        const newBlogWithoutLikes =
          (({ title, author, url }) => ({ title, author, url }))(helper.newBlog)

        const response = await api
          .post('/api/blogs')
          .send(newBlogWithoutLikes)
          .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body.likes).toBe(0)
      })

      test('fails with status code 400 if title missing', async () => {
        const newBlogWithoutTitle =
          (({ author, url, likes }) => ({ author, url, likes }))(helper.newBlog)

        await api
          .post('/api/blogs')
          .send(newBlogWithoutTitle)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

      test('fails with status code 400 if author missing', async () => {
        const newBlogWithoutAuthor =
          (({ title, url, likes }) => ({ title, url, likes }))(helper.newBlog)

        await api
          .post('/api/blogs')
          .send(newBlogWithoutAuthor)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

      test('fails with status code 400 if url missing', async () => {
        const newBlogWithoutUrl =
          (({ title, author, likes }) => ({ title, author, likes }))(helper.newBlog)

        await api
          .post('/api/blogs')
          .send(newBlogWithoutUrl)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

    })

    test('fails with status code 401 if user is not authenticated', async () => {
      const user = Object.assign({}, helper.initialUsers[1])
      const userWithHashedPassword = await helper.replacePasswordWithHash(user)
      await User.create(userWithHashedPassword)

      await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      expect(titles).not.toContain('First class tests')
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
      await api
        .put(`/api/blogs/${helper.invalidId}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog',  () => {
    describe('when user is authenticated', () => {
      let token

      beforeEach(async () => {
        await User.deleteMany({})
        const user = Object.assign({}, helper.initialUsers[0])
        const userWithHashedPassword = await helper.replacePasswordWithHash(user)
        const idArray = await User.create(userWithHashedPassword)

        const blog = await Blog.findOne({ author: helper.initialUsers[0].name })
        blog.user = idArray._id
        await blog.save()

        const response = await api
          .post('/api/login')
          .send({ username: helper.initialUsers[0].username,
            password: helper.initialUsers[0].password })

        token = response.body.token

      })

      test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[2]
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set('Authorization', `Bearer ${token}`)
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
        await api
          .delete(`/api/blogs/${helper.invalidId}`)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })
    })
  })
})

describe('when there is initially some users at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const initialUsersCopy = JSON.parse(JSON.stringify(helper.initialUsers))
    const usersWithHashedPasswords = await Promise.all(initialUsersCopy
      .map(user =>  helper.replacePasswordWithHash(user)))
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

      await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(helper.newUser.username)
    })

    test('fails with status code 400 if username already exists', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUserWithExistingUsername = Object.assign({},
        helper.newUser, { username: helper.initialUsers[0].username })

      const result = await api
        .post('/api/users')
        .send(newUserWithExistingUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(helper.errorMessages.uniqueUsername)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails with status code 400 if username shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUserWithUsernameShorterThan3Characters = Object.assign({}, helper.newUser,
        {  username: 'ne' })

      const result = await api
        .post('/api/users')
        .send(newUserWithUsernameShorterThan3Characters)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(helper.errorMessages.minLengthUsername)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUserWithUsernameShorterThan3Characters.username)
    })

    test('fails with status code 400 if username missing', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUserWithoutUsername =
        (({ name, password }) => ({ name, password }))(helper.newUser)

      const result = await api
        .post('/api/users')
        .send(newUserWithoutUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(helper.errorMessages.requiredUsername)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUserWithoutUsername.username)
    })

    test('fails with status code 400 if password less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUserWithPasswordLessThan3Characters = Object.assign({}, helper.newUser,
        { password: 'pa' })

      const result = await api
        .post('/api/users')
        .send(newUserWithPasswordLessThan3Characters)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(helper.errorMessages.missingOrTooShortPassword)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUserWithPasswordLessThan3Characters.username)
    })

    test('fails with status code 400 if password missing', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUserWithoutPassword =
        (({ username, name }) => ({ username, name }))(helper.newUser)

      const result = await api
        .post('/api/users')
        .send(newUserWithoutPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(helper.errorMessages.missingOrTooShortPassword)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).not.toContain(newUserWithoutPassword.username)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})