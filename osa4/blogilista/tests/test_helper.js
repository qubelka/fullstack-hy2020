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

const addUserToDb = async (user) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  delete user.password
  return {
    ...user,
    passwordHash
  }
}

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

module.exports =
  {
    initialBlogs,
    initialUsers,
    addUserToDb,
    blogsInDb,
    usersInDb,
    nonExistingId
  }
