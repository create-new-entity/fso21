const blogsRouter = require('express').Router();
const { rangeRight } = require('lodash');
const Blog = require('./../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  let newObj = request.body;
  if(!newObj.title || !newObj.url) {
    response.status(400).end();
    return;
  }
  newObj.hasOwnProperty('likes') ? newObj : newObj.likes = 0;

  const blog = new Blog(newObj);

  const result = await blog.save();
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