const logger = require('./logger');
const jwt = require('jsonwebtoken');

const ErrorNames = require('../error');
const User = require('./../models/user');


const userExtractor = async (req, res, next) => {
  try {
    const token = req.token;
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
  }
  catch(err) {
    next();
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  else req.token = null;

  next();
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(`${error.name}: ${error.message}`);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  else if(
    error.name === ErrorNames.UsernameMissingError
    || error.name === ErrorNames.PasswordMissingError
    || error.name === ErrorNames.ShortUsernameError
    || error.name === ErrorNames.ShortPasswordError) {
      return response.status(400).json({ error: error.message })
  }
  else if(
    error.name === ErrorNames.IncorrectUsername
    || error.name === ErrorNames.IncorrectPassword
    || error.name === ErrorNames.TokenMissingOrInvalid
  ) {
    return response.status(401).json({
      error: error.message
    });
  }
  else if(
    error.name === ErrorNames.BlogEntryNotFound
    || error.name === ErrorNames.UserIsNotAuthorized
  ) {
    return response.status(400).json({
      error: error.message
    });
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}