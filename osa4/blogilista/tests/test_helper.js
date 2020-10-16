const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Test blog',
    author: 'Matti Luukkainen',
    url: 'https://somesite.com/',
    likes: 5
  }
]

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen'
  },
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'password'
  }
]

const replacePasswordWithHash = async (user) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  delete user.password
  return {
    ...user,
    passwordHash
  }
}

const newBlog = {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10
}

const newUser = {
  username: 'new_user',
  name: 'New User',
  password: 'password'
}

const invalidId = '5a3d5da59070081a82a3445'

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'user22', url: 'https://somesite.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const errorMessages = {
  uniqueUsername: '`username` to be unique',
  minLengthUsername: 'shorter than the minimum allowed length',
  requiredUsername: '`username` is required',
  missingOrTooShortPassword: 'user should have a password of minimum 3 characters in length'
}

module.exports =
  {
    initialBlogs,
    initialUsers,
    replacePasswordWithHash,
    blogsInDb,
    newBlog,
    newUser,
    invalidId,
    usersInDb,
    nonExistingId,
    errorMessages
  }
