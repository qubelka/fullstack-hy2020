describe('Blog app', function() {
  let user
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser()
      .then(returned => user = returned)
      .visit('/')
  })

  it('Login form is shown', function() {
    cy.findByTestId('login-form').should('be.visible')
    cy.findByLabelText(/username/).should('not.be.undefined')
    cy.findByLabelText(/password/).should('not.be.undefined')
    cy.findByText('Log in').should('exist')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.findByLabelText(/username/).type(user.username)
      cy.findByLabelText(/password/).type(user.password)
      cy.findByText('Log in').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.findByLabelText(/username/).type(user.username)
      cy.findByLabelText(/password/).type('wrong_password')
      cy.findByText('Log in').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 255)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.name} logged in`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.findByText('New blog').click()
      cy.findByLabelText('title').type('Cypress test')
      cy.findByLabelText('author').type('Tester')
      cy.findByLabelText('url').type('test_url.com')
      cy.findByText('create').click()

      cy.get('.info')
        .should('contain', `Added a new blog: Cypress test by Tester`)
        .and('have.css', 'color', 'rgb(127, 255, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('contain', 'Cypress test, Tester')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog()
          .visit('/')
      })

      it('A blog can be liked', function() {
        cy.findByText('view').click()
        cy.findByText('like').click()
        cy.findByTestId('likes').contains(1)
      })

      it('A blog can be removed by its author', function() {
        cy.findByText('view').click()
        cy.findByText('remove blog').click()
        cy.get('.blog').should('not.exist')
      })

      describe('and someone else than author logs in', function() {
        let notAuthor
        beforeEach(function() {
          cy.createUser()
            .then(returned => notAuthor = returned)
            .then(() => {
              cy.login({username: notAuthor.username, password: notAuthor.password})
            })
        })

        it('A blog can be removed only by its author', function() {
          cy.findByText('view').click()
          cy.findByText('remove blog').should('not.exist')
        })
      })
    })

    describe('and multiple blogs exist', function() {
      let blog1, blog2, blog3

      beforeEach(function() {
        cy.createBlog({ likes: 5 })
          .then(blog => blog1 = blog)
          .visit('/')

        cy.createBlog({ likes: 2 })
          .then(blog => blog2 = blog)
          .visit('/')

        cy.createBlog()
          .then(blog => blog3 = blog)
          .visit('/')

      })

      it('shows blogs in descending order based on likes', function() {
        cy.get('.blog').then(blogs => {
            cy.wrap(blogs[0]).findByText('view').click()
            cy.wrap(blogs[0]).findByTestId('likes').should('contain', blog1.likes)

            cy.wrap(blogs[2]).findByText('view').click()
            cy.wrap(blogs[2]).findByTestId('likes').should('contain', blog3.likes)
          }
        )
      })
    })

  })

})