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
    const blogs = await helpers.createAUserAndInitializeDB(api);
    expect(blogs.length).toBe(6);
  }, TIMEOUT);

  test('API returns data in JSON format', async () => {
    let response;

    await helpers.createAUserAndInitializeDB(api);

    response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  }, TIMEOUT);

  test('id is defined in document', async () => {
    let response;
    
    await helpers.createAUserAndInitializeDB(api);

    response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  }, TIMEOUT);

  test('Adding new blog works', async () => {
    let response;
    const user = await helpers.createADummyUser(api);
    const { username, id, token } = await helpers.login(api, user);
    const dummyBlog = dummyStuffs.dummyBlogs[0];

    response = await api.get('/api/blogs');
    expect(response.body.length).toBe(0);

    const newDummyBlog = {
      ...dummyBlog
    };

    await api
      .post('/api/blogs')
      .send(newDummyBlog)
      .set('Authorization', 'bearer ' + token)
      .expect(201);

    response = await api.get('/api/blogs');
    expect(response.body.length).toBe(1);
  }, TIMEOUT);

  test('If likes is missing in new entry, it is set to 0', async () => {
    let response;
    const user = await helpers.createADummyUser(api);

    const dummyBlog = { ...dummyStuffs.dummyBlog };
    delete dummyBlog.likes;
    dummyBlog.user = user.id;

    const { username, id, token } = await helpers.login(api, user);
    
    response = await api
      .post('/api/blogs')
      .send(dummyBlog)
      .set('Authorization',  'bearer ' + token)
      .expect(201);
  
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  }, TIMEOUT);

  test('If title is missing POST request returns with 400 status code', async () => {
    let response;
    const user = await helpers.createADummyUser(api);

    const dummyBlog = { ...dummyStuffs.dummyBlog };
    delete dummyBlog.title;
    dummyBlog.user = user.id;

    const { username, id, token } = await helpers.login(api, user);
    
    response = await api
      .post('/api/blogs')
      .send(dummyBlog)
      .set('Authorization',  'bearer ' + token)
      .expect(400);
  }, TIMEOUT);

  test('If url is missing POST request returns with 400 status code', async () => {
    const user = await helpers.createADummyUser(api);

    const dummyBlog = { ...dummyStuffs.dummyBlog };
    delete dummyBlog.url;
    dummyBlog.user = user.id;
    
    const { username, id, token } = await helpers.login(api, user);
  
    response = await api
      .post('/api/blogs')
      .send(dummyBlog)
      .set('Authorization',  'bearer ' + token)
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
    

    const user = await helpers.createADummyUser(api);
    const { username, id, token } = await helpers.login(api, user);
    response = await api
      .post('/api/blogs')
      .send(dummyBlog)
      .set('Authorization', `bearer ${token}`);

    const targetId = response.body.id;

    response = await api.get('/api/blogs');
    expect(response.body.map(blog => blog.author)).toContain(dummyBlog.author);
    
    await api
      .delete(`/api/blogs/${targetId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    response = await api.get('/api/blogs');
    expect(response.body.map(blog => blog.author)).not.toContain(dummyBlog.author);
  }, TIMEOUT);


  test('Updating likes works', async () => {
    const user = await helpers.createADummyUser(api);
    const { username, id, token } = await helpers.login(api, user);

    let response = await api
      .post('/api/blogs')
      .send(dummyStuffs.dummyBlog)
      .set('Authorization', `bearer ${token}`);
    
    const targetId = response.body.id;
    expect(response.body.likes).toBe(dummyStuffs.dummyBlog.likes);

    response = await api
      .patch(`/api/blogs/${targetId}`)
      .send({ likes: 50 })
      .set('Authorization', `bearer ${token}`);
    
    expect(response.body.likes).toBe(50);

    response = await api.get('/api/blogs');
    let target = response.body.find((blog) => blog.author.localeCompare(dummyStuffs.dummyBlog.author) === 0);
    expect(target.likes).toBe(50);

  }, TIMEOUT);

});


describe('Authentication tests', () => {

  test('Can not create new blog without authentication', async () => {
    await api
      .post('/api/blogs')
      .send(dummyStuffs.dummyBlog)
      .expect(401);
  });

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
    let dummyUser = { ...dummyStuffs.dummyUsers[0] };

    await api.post('/api/users').send(dummyUser).expect(201);
    await api.post('/api/users').send(dummyUser).expect(400);
  });

  test('New User creation works', async () =>{
    let response;

    const initialUsernames = await helpers.getAllUsernamesFromDB();
    expect(initialUsernames).not.toContain(dummyStuffs.dummyUsers[0].username);

    await api
      .post('/api/users')
      .send(dummyStuffs.dummyUsers[0])
      .expect(201);
    
    response = await api.get('/api/users');
    const usernamesInDB = response.body.map(user => user.username);
    expect(usernamesInDB).toContain(dummyStuffs.dummyUsers[0].username);
  }, TIMEOUT);

});


describe('Other tests', () => {
  test('Total likes OK', async () => {
    const blogs = await helpers.createAUserAndInitializeDB(api);
    const totalLikes = helpers.totalLikes(blogs);
    expect(totalLikes).toBe(36);
  }, TIMEOUT);

  test('Most liked blog works', async () => {

    const targetBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    };

    const blogs = await helpers.createAUserAndInitializeDB(api);
    const result = helpers.favoriteBlog(blogs);
    expect(result.likes).toBe(targetBlog.likes);
  });

  test('Author that has written most blogs works', async () => {
    const targetAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    };
    
    const blogs = await helpers.createAUserAndInitializeDB(api);
    const result = helpers.mostBlogs(blogs);
    expect(result).toEqual(targetAuthor);
  });

  test('Author that has most likes works', async () => {
    const targetAuthor = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };

    const blogs = await helpers.createAUserAndInitializeDB(api);
    const result = helpers.mostLikes(blogs);
    expect(result).toEqual(targetAuthor);
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});