const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./../app');
const TIMEOUT = 10000;

const helpers = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await helpers.resetDatabase();
});


describe('API returns data in correct amount and in correct format.', () => {
  
  test('API return correct amount of data', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(6);
  }, TIMEOUT);

  test('API returns data in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  }, TIMEOUT);

  test('id is not undefined in document', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  }, TIMEOUT);

  test('Adding new blog works', async () => {
    const dummyBlog = {
      title: "Node.js – The Past, Present, and Future",
      author: "Jason Grant",
      url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/",
      likes: 5
    };

    let response = await api.get('/api/blogs');
    let initialLength = response.body.length;

    await api
      .post('/api/blogs')
      .send(dummyBlog)
      .expect(201);

    response = await api.get('/api/blogs');
    expect(response.body.length).toBe(initialLength+1);
    let dummyExists = response.body.some((blog) => {
      if (
        dummyBlog.title.localeCompare(blog.title) === 0 &&
        dummyBlog.author.localeCompare(blog.author) === 0  &&
        dummyBlog.url.localeCompare(blog.url) === 0  &&
        dummyBlog.likes === blog.likes
      ) return true;
      return false
    });
    expect(dummyExists).toBe(true);
  }, TIMEOUT);

  test('If likes is missing in new entry, it is set to 0', async () => {
    const dummyBlog = {
      title: "Node.js – The Past, Present, and Future",
      author: "Jason Grant",
      url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/"
    };

    let response = await api
    .post('/api/blogs')
    .send(dummyBlog)
    .expect(201);
  
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  }, TIMEOUT);

  test('If title is missing POST request returns with 400 status code', async () => {
    const dummyBlog = {
      author: "Jason Grant",
      url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/"
    };

    await api
      .post('/api/blogs')
      .send(dummyBlog)
      .expect(400);
  }, TIMEOUT);

  test('If url is missing POST request returns with 400 status code', async () => {
    const dummyBlog = {
      title: "Node.js – The Past, Present, and Future",
      author: "Jason Grant"
    };

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