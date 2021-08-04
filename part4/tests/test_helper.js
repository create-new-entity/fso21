const mongoose = require('mongoose');

const blogModel = require('./../models/blog');
const testInputBlogs = require('./../utils/testInputBlogs');

const resetDatabase = async () => {
  await blogModel.deleteMany({});
  const newTestInputBlogs = testInputBlogs.map((blog) => {
    let newEmptyObj = { ...blog };
    delete newEmptyObj._id;
    delete newEmptyObj.__v;
    return newEmptyObj;
  });
  await blogModel.insertMany(newTestInputBlogs);
};

const dummyBlog = {
  title: "Node.js – The Past, Present, and Future",
  author: "Jason Grant",
  url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/",
  likes: 5
};

module.exports = {
  dummyBlog,
  resetDatabase
};