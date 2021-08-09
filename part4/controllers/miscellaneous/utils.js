const userModel = require('./../../models/user');
const blogModel = require('./../../models/blog');

const resetDatabase = async () => {
  await blogModel.deleteMany({});
  await userModel.deleteMany({});
};

const utils = {
  resetDatabase
};

module.exports = utils;