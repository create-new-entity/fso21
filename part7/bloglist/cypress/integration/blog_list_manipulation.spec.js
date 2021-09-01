import utils from './utils';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', utils.resetEverythingURL);
    cy.request('POST', utils.userURL, utils.users[0]);
    cy.request('POST', utils.userURL, utils.users[1]);
    cy.visit(utils.frontEndURL);
  });

  describe('Blog list manipulation', function () {
    beforeEach(function () {
      cy.get('#username').type(utils.correctLoginCredentials.username);
      cy.get('#password').type(utils.correctLoginCredentials.password);
      cy.get('#submit').click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);
    });

    afterEach(function () {
      cy.get('#logout').click();
    });

    it('User who created a blog, can delete it.', function () {
      //Add one blog
      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(utils.newBlog.title);
      cy.get('#author').type(utils.newBlog.author);
      cy.get('#url').type(utils.newBlog.url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      //Add another
      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(utils.dummyBlogs[1].title);
      cy.get('#author').type(utils.dummyBlogs[1].author);
      cy.get('#url').type(utils.dummyBlogs[1].url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      cy.get('.blog').contains(utils.newBlog.title).parent().within(function () {
        cy.get('.viewButton').click();
        cy.wait(2000);
        cy.get('button').contains('remove').click();
        cy.wait(utils.NOTIFICATION_TIMEOUT);
      });

      cy.get('.blog').contains(utils.newBlog.title).should('not.exist');
    });

    it('User who did not create a blog, can not delete it', function () {
      //Add one blog
      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(utils.newBlog.title);
      cy.get('#author').type(utils.newBlog.author);
      cy.get('#url').type(utils.newBlog.url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      //Add another
      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(utils.dummyBlogs[1].title);
      cy.get('#author').type(utils.dummyBlogs[1].author);
      cy.get('#url').type(utils.dummyBlogs[1].url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      cy.get('#logout').click();

      cy.get('#username').type(utils.users[1].username);
      cy.get('#password').type(utils.users[1].password);
      cy.get('#submit').click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      cy.get('.blog').contains(utils.dummyBlogs[1].title).parent().within(function () {
        cy.get('.viewButton').click();
        cy.wait(2000);
        cy.get('button').contains('remove').click();
        cy.wait(500);
      });

      cy.get('#notification').should('have.text', 'Blog deletion failed!!');
      cy.wait(utils.NOTIFICATION_TIMEOUT);
      cy.get('.blog').contains(utils.dummyBlogs[1].title).parent().should('exist');
    });

    it('Blogs are sorted properly (most liked one comes first)', function () {
      //Add one blog
      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(utils.newBlog.title);
      cy.get('#author').type(utils.newBlog.author);
      cy.get('#url').type(utils.newBlog.url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      //Add another
      cy.get('button').contains('Create New Blog').click();
      cy.get('#title').type(utils.dummyBlogs[1].title);
      cy.get('#author').type(utils.dummyBlogs[1].author);
      cy.get('#url').type(utils.dummyBlogs[1].url);
      cy.get('button').contains(/^Create$/).click();
      cy.wait(utils.NOTIFICATION_TIMEOUT);

      cy.get('.title').then(function (els) {
        const firstBlogOk = els[0].innerText.includes(utils.dummyBlogs[0].title);
        const secondBlogOk = els[1].innerText.includes(utils.dummyBlogs[1].title);

        if(!firstBlogOk || !secondBlogOk) throw new Error('Blogs were not rendered correctly the first time');
      });


      cy.get('.title').contains(utils.dummyBlogs[1].title).parent().within(function () {
        cy.get('button').contains('view').click();
        cy.get('button').contains('like').click();
        cy.wait(3000);
        cy.get('button').contains('like').click();
        cy.wait(3000);
        cy.get('button').contains('like').click();
        cy.wait(3000);
        cy.get('button').contains('hide').click();
        cy.wait(3000);
      });

      cy.get('.title').then(function (els) {
        const firstBlogOk = els[0].innerText.includes(utils.dummyBlogs[1].title);
        const secondBlogOk = els[1].innerText.includes(utils.dummyBlogs[0].title);

        if(!firstBlogOk || !secondBlogOk) throw new Error('Pressing like did not reorder the rendered blogs');
      });
    });
  });
});

