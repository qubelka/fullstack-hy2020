import faker from 'faker'

const blogData = (blog={}) => {
  return {
    title: blog.title || faker.lorem.sentence(),
    author: blog.author || `${faker.name.findName()}`,
    url: blog.url || faker.internet.url(),
    likes: blog.likes || 0
  }
}

const userData = (user = {}) => {
  return {
    username: user.username || faker.internet.userName(),
    password: user.password || faker.internet.password(),
    name: user.name || faker.name.findName()
  }
}

module.exports = {
  blogData,
  userData
}