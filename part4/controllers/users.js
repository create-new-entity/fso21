const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const ErrorNames = require('./../error');

const userModel = require('./../models/user');



usersRouter.get('/', async (req, res, next) => {
  try {
    const blogFieldsToReturn = {title: 1, author: 1, url: 1, likes: 1, id: 1};
    let users = await userModel.find({}).populate('blogs', blogFieldsToReturn);
    res.status(200).json(users);
  }
  catch(err) {
    next(err);
  }
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
  
    let newUser = {
      username: newUserName,
      passwordHash,
      name: newName
    };
  
    newUser = await userModel(newUser).save();
    res.status(201).json({
      username: newUser.username,
      id: newUser.id
    });
  }
  catch(error) {
    next(error);
  }
});


usersRouter.get('/userData', async (req, res) => {
  try {
    const blogFieldsToReturn = {title: 1, author: 1, url: 1, likes: 1, id: 1};
    let users = await userModel.find({}).populate('blogs', blogFieldsToReturn);
    users = users.map((user) => {
      return {
        name: user.name,
        id: user.id,
        blogsCount: user.blogs.length
      };
    });
    res.status(200).json(users);
  }
  catch(error) {
    next(error);
  }
});

usersRouter.get('/userData/:id', async (req, res) => {
  try {
    const blogFieldsToReturn = {title: 1, id: 1};
    const user = await userModel.findById(req.params.id).populate('blogs', blogFieldsToReturn);
    res.status(200).json(user);
  }
  catch(error) {
    next(error);
  }
});

module.exports = usersRouter;