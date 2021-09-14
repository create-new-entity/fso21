const userModel = require('./../../models/user');
const blogModel = require('./../../models/blog');
const commentModel = require('./../../models/comment');

const resetDatabase = async () => {
  await blogModel.deleteMany({});
  await userModel.deleteMany({});
  await commentModel.deleteMany({});
};

const utils = {
  resetDatabase
};

module.exports = utils;