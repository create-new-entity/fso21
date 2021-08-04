const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const ErrorNames = require('./../error');

const userModel = require('./../models/user');



usersRouter.get('/', async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json(users);
});

usersRouter.post('/', async (req, res, next) => {
  try {
    let error;

    if(!req.body.username) {
      error =  new Error('username is missing');
      error.name = ErrorNames.UsernameMissingError;
      throw error;
    }

    if(!req.body.password) {
      error = new Error('password is missing');
      error.name = ErrorNames.PasswordMissingError;
      throw error;
    }
  
    if(req.body.username.length < 3) {
      error = new Error('username is too short');
      error.name = ErrorNames.ShortUsernameError;
      throw error;
    }

    if(req.body.password.length < 3) {
      error = new Error('password is too short');
      error.name = ErrorNames.ShortPasswordError;
      throw error;
    }
  
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
  
    await userModel(newUser).save();
    res.status(201).end();
  }
  catch(error) {
    next(error);
  }
});

module.exports = usersRouter;