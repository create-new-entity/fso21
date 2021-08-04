const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./../app');

const helpers = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await helpers.resetDatabase();
});

//Verify that the blog list application Returns the correct amount of 
//blog posts in the JSON format.

describe('API returns data in correct amount and in correct format.', () => {
  
  test('API return correct amount of data', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(6);
  });

  test('API returns data in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('id is not undefined in document', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

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
  });

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
  });

  

});



afterAll(async () => {
  await mongoose.connection.close();
});