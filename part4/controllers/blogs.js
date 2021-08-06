const blogsRouter = require('express').Router();
const Blog = require('./../models/blog');
const User = require('./../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const userFieldsToReturn = { name: 1, username: 1, id: 1 };
    const blogs = await Blog.find({}).populate('user', userFieldsToReturn);
    response.status(200).json(blogs);
  }
  catch(err) {
    next(err);
  }
})

blogsRouter.post('/', async (request, response) => {
  let newObj = request.body;
  if(!newObj.title || !newObj.url) {
    response.status(400).end();
    return;
  }
  newObj.hasOwnProperty('likes') ? newObj : newObj.likes = 0;

  const user = await User.findById('610da203af2fff2fececf0c8');
  newObj.user = user._id;
  const blog = new Blog(newObj);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const targetId = request.params.id;

  await Blog.remove({ _id: targetId });
  response.status(204).end();
});

blogsRouter.patch('/:id', async (request, response, next) => {
  const targetId = request.params.id;
  const newLikes = request.body.likes;

  const filter = { _id: targetId };
  const update = { likes: newLikes };
  const options = { new: true };

  let updatedDocument = await Blog.findOneAndUpdate(filter, update, options);
  response.status(200).json(updatedDocument);
});

module.exports = blogsRouter;