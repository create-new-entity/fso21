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
  await initializeDBWithDummyBlogs(api, dummyUser.id);
  const response = await api.get('/api/blogs');
  return response.body;
};

const getAllUsernamesFromDB = async () => {
  const users = await userModel.find({});
  return users.map(user => user.username);
};

const createADummyUser = async (api) => {
  const dummyUsers = dummyStuffs.dummyUsers;

  response = await api.post('/api/users').send(dummyUsers[0]);
  return response.body;
};

const initializeDBWithDummyBlogs = async (api, userId) => {
  const promises = dummyStuffs.dummyBlogs.map((blog) => {
    const newDummyBlog = {
      ...blog,
      user: userId
    };
    return api
      .post('/api/blogs')
      .send(newDummyBlog);
  });

  return Promise.all(promises);
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
  mostLikes
};