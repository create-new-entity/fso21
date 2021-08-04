const blogsRouter = require('express').Router();
const Blog = require('./../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  let newObj = request.body;
  newObj.hasOwnProperty('likes') ? newObj : newObj.likes = 0;

  const blog = new Blog(newObj);

  const result = await blog.save();
  response.status(201).json(result)
});

module.exports = blogsRouter;