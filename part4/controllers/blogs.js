const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('./../models/blog');
const User = require('./../models/user');

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res, next) => {
  try {
    const userFieldsToReturn = { name: 1, username: 1, id: 1 };
    const blogs = await Blog.find({}).populate('user', userFieldsToReturn);
    res.status(200).json(blogs);
  }
  catch(err) {
    next(err);
  }
})

blogsRouter.post('/', async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = await jwt.verify(token, process.env.SECRET);

  let newObj = req.body;
  if(!newObj.title || !newObj.url) {
    res.status(400).end();
    return;
  }
  newObj.hasOwnProperty('likes') ? newObj : newObj.likes = 0;

  const user = await User.findById(decodedToken.id);
  newObj.user = user._id;
  const blog = new Blog(newObj);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  res.status(201).json(result);
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const targetId = res.params.id;

  await Blog.remove({ _id: targetId });
  res.status(204).end();
});

blogsRouter.patch('/:id', async (req, res, next) => {
  const targetId = req.params.id;
  const newLikes = req.body.likes;

  const filter = { _id: targetId };
  const update = { likes: newLikes };
  const options = { new: true };

  let updatedDocument = await Blog.findOneAndUpdate(filter, update, options);
  res.status(200).json(updatedDocument);
});

module.exports = blogsRouter;