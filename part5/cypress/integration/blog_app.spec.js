

describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      'name': 'Ridley Scott',
      'username': 'house_of_gucci',
      'password': 'ridley_won'
    };
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
});