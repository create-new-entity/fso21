const userModel = require('./../models/user');
const blogModel = require('./../models/blog');
const dummyStuffs = require('./dummyStuffs');
const _ = require('lodash');

const resetDatabase = async () => {
  await blogModel.deleteMany({});
  await userModel.deleteMany({});
};

const createAUserAndInitializeDB = async (api) => {
  const dummyUser = await createADummyUser(api);
  const { token } = await login(api, dummyUser);
  await initializeDBWithDummyBlogs(api, token);
  const response = await api.get('/api/blogs');
  return response.body;
};

const getAllUsernamesFromDB = async () => {
  const users = await userModel.find({});
  return users.map(user => user.username);
};

const createADummyUser = async (api) => {
  const dummyUsers = dummyStuffs.dummyUsers;

  await api.post('/api/users').send(dummyUsers[0]);
  return dummyUsers[0];  // { name, username, password }
};

const login = async (api, user) => {
  const res = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    });
  return res.body  // { username, id, token }
};

const initializeDBWithDummyBlogs = async (api, token) => {
  for (blog of dummyStuffs.dummyBlogs) {
    const newDummyBlog = {
      ...blog
    };
    await api
      .post('/api/blogs')
      .send(newDummyBlog)
      .set('Authorization', 'bearer ' + token);
  }
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, curr) => acc.likes < curr.likes ? curr : acc );
};

const mostBlogs = (blogs) => {
  return _
    .chain(blogs)
    .map((blog) => blog.author)
    .uniq()
    .map(author => {
      const result = blogs.filter(blog => blog.author.localeCompare(author) === 0).length;
      const count = result ? result : 0;
      return {
        author,
        blogs: count
      };
    })
    .maxBy('blogs')
    .value()
};

const mostLikes = (blogs) => {
  return _
    .chain(blogs)
    .map((blog) => blog.author)
    .uniq()
    .map(author => {

      const totalLikes = blogs.reduce((acc, curr) => {
        if(curr.author.localeCompare(author) === 0) {
          return curr.likes + acc;
        }
        else return acc;
      }, 0);

      return {
        author,
        likes: totalLikes
      };
    })
    .maxBy('likes')
    .value();
};

const dummy = (blogs) => {
  return 1;
}

module.exports = {
  dummy,
  resetDatabase,
  getAllUsernamesFromDB,
  createADummyUser,
  initializeDBWithDummyBlogs,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  createAUserAndInitializeDB,
  mostLikes,
  login
};