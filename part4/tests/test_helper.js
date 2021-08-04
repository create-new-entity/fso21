const userModel = require('./../models/user');
const blogModel = require('./../models/blog');
const testInputBlogs = require('./../utils/testInputBlogs');

const resetDatabase = async () => {
  await blogModel.deleteMany({});
  await userModel.deleteMany({});
  const newTestInputBlogs = testInputBlogs.map((blog) => {
    let newEmptyObj = { ...blog };
    delete newEmptyObj._id;
    delete newEmptyObj.__v;
    return newEmptyObj;
  });
  await blogModel.insertMany(newTestInputBlogs);
};

const getAllUsernamesFromDB = async () => {
  const users = await userModel.find({});
  return users.map(user => user.username);
};

const dummyBlog = {
  title: "Node.js – The Past, Present, and Future",
  author: "Jason Grant",
  url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/",
  likes: 5
};

const dummyNewUser = {
  name: 'Abul',
  username: 'vokchod_the_great',
  password: 'the_cow_is_a_domestic_animal'
};

module.exports = {
  dummyBlog,
  dummyNewUser,
  resetDatabase,
  getAllUsernamesFromDB
};