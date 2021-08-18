const LOGIN_URL = 'http://localhost:3003/api/login';

const user = {
  'name': 'Ridley Scott',
  'username': 'house_of_gucci',
  'password': 'ridley_won'
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
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
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

      cy.get('#logged_in_user')
        .should('not.exist');
    });
  });
});