import faker from 'faker'

const blogData = (blog={}) => {
  return {
    title: blog.title || faker.lorem.sentence(),
    author: blog.author || `${faker.name.findName()}`,
    url: blog.url || faker.internet.url(),
    likes: blog.likes || 0
  }
}

module.exports = {
  blogData
}