const resetEverythingURL = 'http://localhost:3003/api/testing/reset';
const userURL = 'http://localhost:3003/api/users';
const frontEndURL = 'http://localhost:3000';
const NOTIFICATION_TIMEOUT = 5000;

const user = {
  'name': 'Ridley Scott',
  'username': 'house_of_gucci',
  'password': 'ridley_won'
};

const newBlog = {
  title: 'Create an Abstract Image Slideshow with OGL, GLSL, and GSAP',
  author: 'Francesco Michelini',
  url: 'https://tympanus.net/codrops/2021/08/16/abstract-image-carousel-ogl-glsl-gsap/'
};

const correctLoginCredentials = {
  username: user.username,
  password: user.password
};

const wrongLoginCredentials = {
  username: 'vadur_jadu',
  password: 'ore_jala'
};


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
      cy.wait(NOTIFICATION_TIMEOUT);
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
  });
});