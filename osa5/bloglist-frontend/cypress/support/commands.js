import '@testing-library/cypress/add-commands'
import { blogData, userData } from '../../utils/fakeDataGenerator'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('/')
    })
})

Cypress.Commands.add('createBlog', (blog) => {
  const generatedBlog = blogData(blog)
  return cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: generatedBlog,
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  }).then(response => {
    return response.body
  })
})

Cypress.Commands.add('createUser', (user) => {
  const generatedUser = userData(user)
  return cy.request('POST', 'http://localhost:3001/api/users/', generatedUser)
    .then(() => {
      return generatedUser
    })
})