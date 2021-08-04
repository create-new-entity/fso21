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

module.exports = {
  resetDatabase
};