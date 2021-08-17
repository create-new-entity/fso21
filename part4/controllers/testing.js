const testingRouter = require('express').Router();

const utils = require('./miscellaneous/utils');

testingRouter.post('/reset', async (req, res, next) => {
  await utils.resetDatabase();
  res.status(200).end();
});

module.exports = testingRouter;