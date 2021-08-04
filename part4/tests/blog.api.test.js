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

});


afterAll(async () => {
  await mongoose.connection.close();
});