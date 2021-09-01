import {
  resetEverythingURL,
  userURL,
  frontEndURL,
  NOTIFICATION_TIMEOUT,
  user,
  newBlog,
  correctLoginCredentials,
  wrongLoginCredentials
} from './utils';


describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', resetEverythingURL);
    cy.request('POST', userURL, user);
    cy.visit(frontEndURL);
  });

  it('Login form is shown', function () {
    cy
      .get('#login')
      .should('to.exist')
      .should('be.visible')
      .within(function () {
        cy
          .get('#username')
          .should('to.exist')
          .should('be.visible')

        cy
          .get('#password')
          .should('to.exist')
          .should('be.visible')

        cy
          .get('#submit')
          .should('to.exist')
          .should('be.visible')
      })
  });

  describe('Login', function () {

    it('Succeeds with correct credentials', function () {
      cy.get('#username').type(correctLoginCredentials.username);
      cy.get('#password').type(correctLoginCredentials.password);
      cy.get('#submit').click();

      cy.get('#notification')
        .should('be.visible')
        .should('have.css', 'color', 'rgb(0, 128, 0)');

      cy.wait(NOTIFICATION_TIMEOUT);

      cy.get('#logged_in_user')
        .should('be.visible')
        .contains(`${user.name} logged in`);
    });

    it('Fails with wrong credentials', function () {
      cy.get('#username').type(wrongLoginCredentials.username);
      cy.get('#password').type(wrongLoginCredentials.password);
      cy.get('#submit').click();

      cy.get('#notification')
        .should('be.visible')
        .should('have.css', 'color', 'rgb(255, 0, 0)');

      cy.wait(NOTIFICATION_TIMEOUT);

      cy.get('#logged_in_user')
        .should('not.exist');
    });
  });

  describe('After logging in', function () {

    beforeEach(function () {
      cy.get('#username').type(correctLoginCredentials.username);
      cy.get('#password').type(correctLoginCredentials.password);
      cy.get('#submit').click();
      cy.wait(NOTIFICATION_TIMEOUT);
    });

    afterEach(function () {
      cy.get('#logout').click();
    });

    it('A blog can be created', function () {

      cy.get('.blog').should('not.exist');   // No blog entry added yet.

      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(newBlog.title);
      cy.get('#author').type(newBlog.author);
      cy.get('#url').type(newBlog.url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(NOTIFICATION_TIMEOUT);

      cy.get('.blog').contains(newBlog.title);
    });

    it('User can like a blog', function () {

      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(newBlog.title);
      cy.get('#author').type(newBlog.author);
      cy.get('#url').type(newBlog.url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(NOTIFICATION_TIMEOUT);

      cy.get('.blog').contains(newBlog.title)
        .get('button').contains('view').click();

      cy.get('.title').contains(newBlog.title).parent().within(function () {
        cy.get('.likes').should('have.text', 'likes 0');
        cy.get('button').contains('like').click();
        cy.wait(2000);
        cy.get('.likes').should('have.text', 'likes 1');
      });
    });

    it('User who created the blog, can delete it', function () {

    });

  });
});