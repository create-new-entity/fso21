const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const userModel = require('./../models/user');

usersRouter.get('/', async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json(users);
});

usersRouter.post('/', async (req, res, next) => {
  const newUserName = req.body.username;
  const newPassword = req.body.password;
  const newName = req.body.name;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);

  const newUser = {
    username: newUserName,
    passwordHash,
    name: newName
  };

  try {
    await userModel(newUser).save();
    res.status(201).end();
  }
  catch(err) {
    res.status(500).json({
      'error': 'Entry saving failed'
    });
  }
});

module.exports = usersRouter;