describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'admin',
      username: 'admin',
      password: 'admin'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login',function(){
    it('login fails with wrong password',function(){
      cy.contains('log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')

    })

    it('succeeds with correct credentials ', function() {
      cy.contains('log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('admin logged in')

    })


  })
  describe('when logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'admin' })
    })

    it('A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('title by cypress')
      cy.get('#author').type('author by cypress')
      cy.get('#url').type('url by cypress')
      cy.get('#create').click()
      cy.contains('A new blog title by cypress by author by cypress added')

    })

    it('Users can like a blog', function(){
      cy.contains('create a new blog').click()
      cy.get('#title').type('title by cypress')
      cy.get('#author').type('author by cypress')
      cy.get('#url').type('url by cypress')
      cy.get('#create').click()
      cy.contains('A new blog title by cypress by author by cypress added')

      cy.contains('view').click()
      cy.get('#like').click()
      cy.contains('likes: 1')


    })

    it('Users can delete a blog', function(){
      cy.contains('create a new blog').click()
      cy.get('#title').type('title by cypress')
      cy.get('#author').type('author by cypress')
      cy.get('#url').type('url by cypress')
      cy.get('#create').click()
      cy.contains('A new blog title by cypress by author by cypress added')

      cy.contains('view').click()
      cy.get('#delete').click()

      cy.get('#view').should('not.exist')

    })

    it('Only author can delete blog', function(){
      cy.contains('create a new blog').click()
      cy.get('#title').type('title by cypress')
      cy.get('#author').type('author by cypress')
      cy.get('#url').type('url by cypress')
      cy.get('#create').click()
      cy.contains('A new blog title by cypress by author by cypress added')

      cy.contains('Logout').click()
      cy.contains('view').click()
      cy.get('#delete').click()
      cy.contains('You are not authorized to delete blogs')
    })

    it('blogs are ordered according to likes with the most liked blog first', function() {
      cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'http://blog1.com', likes: 10 })
      cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'http://blog2.com', likes: 5 })
      cy.createBlog({ title: 'Blog 3', author: 'Author 3', url: 'http://blog3.com', likes: 8 })

      cy.login({ username: 'admin', password: 'admin' })

      cy.visit('')

      cy.get('[data-testid="blog"]').should('have.length', 3).as('blogs')
      cy.get('@blogs').eq(0).should('contain.text', 'Blog 1')
      cy.get('@blogs').eq(1).should('contain.text', 'Blog 3')
      cy.get('@blogs').eq(2).should('contain.text', 'Blog 2')
    })
  })
})