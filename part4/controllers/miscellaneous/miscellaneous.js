// To setup/clean db with some initial data.

const miscellaneousRouter = require('express').Router();
const utils = require('./utils');

miscellaneousRouter.delete('/', async (req, res, next) => {
  try {
    await utils.resetDatabase();
    res.status(200).end();
  }
  catch(err) {
    res.status(500).end();
  }
});


module.exports = miscellaneousRouter;