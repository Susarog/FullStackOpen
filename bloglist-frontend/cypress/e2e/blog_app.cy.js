describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Sus',
      name: 'Ryan',
      password:'123123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown ', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Sus')
      cy.get('#password').type('123123')
      cy.get('#login-button').click()

      cy.contains('Sus logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Sus')
      cy.get('#password').type('l123120-8739120')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Sus')
      cy.get('#password').type('123123')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()

      cy.get('#title-input').type('asd;lfkjasdf')
      cy.get('#author-input').type('joemama')
      cy.get('#url-input').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

      cy.get('#submit-blog-button').click()
      cy.contains('asd;lfkjasdf joemama')
    })

    it('likes counter increase when like button is pressed', function() {
      cy.contains('new note').click()

      cy.get('#title-input').type('asd;lfkjasdf')
      cy.get('#author-input').type('joemama')
      cy.get('#url-input').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

      cy.get('#submit-blog-button').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('deletes new note when button is pressed', function() {
      cy.contains('new note').click()

      cy.get('#title-input').type('asd;lfkjasdf')
      cy.get('#author-input').type('joemama')
      cy.get('#url-input').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

      cy.get('#submit-blog-button').click()

      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'asd;lfkjasdf joemama')
    })

    it('another user cannot delete blog', function(){
      const newBlog = {
        title:'asd;lfkjasdf',
        author:'joemama',
        url:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
      const user = {
        username: 'Susa',
        name: 'Ryan',
        password:'123123'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.request('POST', 'http://localhost:3003/api/login', {
        username:'Susa',
        password:'123123'
      }).then((response) => {
        const token = response.body.token
        return cy.request({
          method:'POST',
          url:'http://localhost:3003/api/blogs',
          body:newBlog,
          headers:{
            Authorization: `bearer ${token}`
          }
        })
      }).then(() => {
        cy.reload()
        cy.contains('new note').click()
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.contains('asd;lfkjasdf joemama')
      })
    })

    it.only('check most likes from greatest to lowest', function() {
      cy.contains('new note').click()

      cy.get('#title-input').type('asd;lfkjasdf')
      cy.get('#author-input').type('joemama')
      cy.get('#url-input').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      cy.get('#submit-blog-button').click()

      cy.get('#title-input').type('im tired')
      cy.get('#author-input').type('bob')
      cy.get('#url-input').type('https://www.gogle.com')
      cy.get('#submit-blog-button').click()
      cy.wait(500, { log: false })
      cy.get('.bloglist>div').eq(0).contains('view').click()
      cy.wait(500, { log:false })
      cy.get('.bloglist>div').eq(1).contains('view').click()
      updateLikes()
      updateLikes2()
      cy.get('.bloglist>div').eq(0).should('contain', 'asd;lfkjasdf joemama')
      cy.get('.bloglist>div').eq(1).should('contain', 'im tired bob')
    })
  })
})

const updateLikes = () => {
  cy.get('.bloglist>div>.like-div').eq(0).wait(500)
    .then((asdf) => {
      return parseInt(asdf.text().replace(/\D/g,''))
    })
    .then((number) => {
      if (number === 12) {
        return
      }
      cy.wait(500, { log: false })
      cy.get('.bloglist>div>.like-div').eq(0).contains('like').click()
      updateLikes()
    })
}

const updateLikes2 = () => {
  cy.get('.bloglist>div>.like-div').eq(1).wait(500)
    .then((asdf) => {
      return parseInt(asdf.text().replace(/\D/g,''))
    })
    .then((number) => {
      if (number === 4) {
        return
      }
      cy.wait(500, { log: false })
      cy.get('.bloglist>div>.like-div').eq(1).contains('like').click()
      updateLikes2()
    })
}