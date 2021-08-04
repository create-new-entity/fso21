const mongoose = require('mongoose');
const supertest = require('supertest');


const app = require('./../app');
const TIMEOUT = 10000;
const dummyStuffs = require('./dummyStuffs');
const helpers = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await helpers.resetDatabase();
});


describe('API returns data in correct amount and in correct format.', () => {
  
  test('API return correct amount of data', async () => {
    let response;
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;

    const dummyBlogs = dummyStuffs.dummyBlogs.map(blog => {
      blog.user = userId;
      return blog;
    });

    const promises = dummyBlogs.map(blog => {
      return api.post('/api/blogs').send(blog).expect(201);
    });

    await Promise.all(promises);
    
    response = await api.get('/api/blogs');
    expect(response.body.length).toBe(6);
  }, TIMEOUT);

  test('API returns data in JSON format', async () => {
    let response;
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;
    
    const dummyBlog = dummyStuffs.dummyBlogs[0];

    const newDummyBlog = {
      ...dummyBlog,
      user: userId
    };

    await api
      .post('/api/blogs')
      .send(newDummyBlog)
      .expect(201);

    response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  }, TIMEOUT);

  test('id is defined in document', async () => {
    let response;
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;
    
    const dummyBlog = dummyStuffs.dummyBlogs[0];

    const newDummyBlog = {
      ...dummyBlog,
      user: userId
    };

    await api
      .post('/api/blogs')
      .send(newDummyBlog)
      .expect(201);

    response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  }, TIMEOUT);

  test('Adding new blog works', async () => {
    let response;
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;
    
    const dummyBlog = dummyStuffs.dummyBlogs[0];

    response = await api.get('/api/blogs');
    expect(response.body.length).toBe(0);

    const newDummyBlog = {
      ...dummyBlog,
      user: userId
    };

    await api
      .post('/api/blogs')
      .send(newDummyBlog)
      .expect(201);

    response = await api.get('/api/blogs');
    expect(response.body.length).toBe(1);
  }, TIMEOUT);

  test('If likes is missing in new entry, it is set to 0', async () => {
    let response;
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;

    const dummyBlog = { ...dummyStuffs.dummyBlog };
    delete dummyBlog.likes;
    dummyBlog.user = userId;
    
    response = await api
      .post('/api/blogs')
      .send(dummyBlog)
      .expect(201);
  
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  }, TIMEOUT);

  test('If title is missing POST request returns with 400 status code', async () => {
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;

    const dummyBlog = { ...dummyStuffs.dummyBlog };
    delete dummyBlog.title;
    dummyBlog.user = userId;

    await api
      .post('/api/blogs')
      .send(dummyBlog)
      .expect(400);
  }, TIMEOUT);

  test('If url is missing POST request returns with 400 status code', async () => {
    const dummyUsers = dummyStuffs.dummyUsers;

    response = await api.post('/api/users').send(dummyUsers[0]).expect(201);
    const userId = response.body.id;

    const dummyBlog = { ...dummyStuffs.dummyBlog };
    delete dummyBlog.url;
    dummyBlog.user = userId;

    await api
      .post('/api/blogs')
      .send(dummyBlog)
      .expect(400);
  }, TIMEOUT);

});


describe('Deletion and Update', () => {

  test('Deleting a blog entry works', async () => {

    const dummyBlog = {
      title: "Node.js – The Past, Present, and Future",
      author: "Jason Grant",
      url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/",
      likes: 5
    };

    let response = await api.get('/api/blogs');
    expect(response.body.map(blog => blog.author)).not.toContain(dummyBlog.author);

    response = await api
      .post('/api/blogs')
      .send(dummyBlog);

    const targetId = response.body.id;

    response = await api.get('/api/blogs');
    expect(response.body.map(blog => blog.author)).toContain(dummyBlog.author);
    
    await api
      .delete(`/api/blogs/${targetId}`)
      .expect(204);

    response = await api.get('/api/blogs');
    expect(response.body.map(blog => blog.author)).not.toContain(dummyBlog.author);
  }, TIMEOUT);


  test('Updating likes works', async () => {

    let response = await api
      .post('/api/blogs')
      .send(helpers.dummyBlog);
    
    const targetId = response.body.id;
    expect(response.body.likes).toBe(helpers.dummyBlog.likes);

    response = await api
      .patch(`/api/blogs/${targetId}`)
      .send({ likes: 50 });
    expect(response.body.likes).toBe(50);

    response = await api.get('/api/blogs');
    let target = response.body.find((blog) => blog.author.localeCompare(helpers.dummyBlog.author) === 0);
    expect(target.likes).toBe(50);

  }, TIMEOUT);

});


describe('Authentication tests', () => {

  test('Can not create user without username', async () => {
    let dummyUser = { ...helpers.dummyNewUser };
    delete dummyUser.username;

    await api.post('/api/users').send(dummyUser).expect(400);
  });

  test('Can not create user without password', async () => {
    let dummyUser = { ...helpers.dummyNewUser };
    delete dummyUser.password;

    await api.post('/api/users').send(dummyUser).expect(400);
  });

  test('Can not create user with very short username', async () => {
    let dummyUser = { ...helpers.dummyNewUser };
    dummyUser.username = 'ba';

    await api.post('/api/users').send(dummyUser).expect(400);
  });

  test('Can not create user with very short password', async () => {
    let dummyUser = { ...helpers.dummyNewUser };
    dummyUser.password = 'qw';

    await api.post('/api/users').send(dummyUser).expect(400);
  });

  test('Duplicate username not allowed', async () => {
    let dummyUser = { ...helpers.dummyNewUser };

    await api.post('/api/users').send(dummyUser).expect(201);
    await api.post('/api/users').send(dummyUser).expect(400);
  });

  test('New User creation works', async () =>{
    let response;

    const initialUsernames = await helpers.getAllUsernamesFromDB();
    expect(initialUsernames).not.toContain(helpers.dummyNewUser.username);

    await api
      .post('/api/users')
      .send(helpers.dummyNewUser)
      .expect(201);
    
    response = await api.get('/api/users');
    const usernamesInDB = response.body.map(user => user.username);
    expect(usernamesInDB).toContain(helpers.dummyNewUser.username);
  }, TIMEOUT);

});




afterAll(async () => {
  await mongoose.connection.close();
});