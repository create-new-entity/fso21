const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const miscellaneousRouter = require('./controllers/miscellaneous/miscellaneous');
const testingRouter = require('./controllers/testing');



logger.info('Connecting to DB');
mongoose
  .connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info('DB connected'))
  .catch((err) => logger.error(err));



app.use(cors());
app.use(express.json());
if(process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}
app.use('/api/miscellaneous', miscellaneousRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;