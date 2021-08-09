const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();

const User = require('./../models/user');
const ErrorNames = require('./../error');

loginRouter.post('/', async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });
    if(!user) {
      const err = new Error('Incorrect username');
      err.name = ErrorNames.IncorrectUsername;
      throw err;
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if(!passwordCorrect) {
      const err = new Error('Incorrect password');
      err.name = errorNames.IncorrectPassword;
      throw err;
    }

    const payload = {
      username: user.username,
      id: user._id
    };

    const token = await jwt.sign(payload, process.env.SECRET);
    res.status(200).json({
      name: user.name,
      username: user.username,
      id: user._id,
      token
    });
  }
  catch(err) {
    next(err);
  }
});

module.exports = loginRouter;