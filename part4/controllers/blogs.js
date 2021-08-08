const blogsRouter = require('express').Router();
const ErrorNames = require('../error');

const Blog = require('./../models/blog');

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
  const user = req.user;

  let newObj = req.body;
  if(!newObj.title || !newObj.url) {
    res.status(400).end();
    return;
  }
  newObj.hasOwnProperty('likes') ? newObj : newObj.likes = 0;
  
  newObj.user = user._id;
  const blog = new Blog(newObj);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  res.status(201).json(result);
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user;
    const targetId = req.params.id;
    
    const blog = await Blog.findOne( { _id: targetId });
    if(!blog) {
      const err = new Error('Blog not found');
      err.name = ErrorNames.BlogEntryNotFound;
      throw err;
    }
    if(blog.user.toString().localeCompare(user._id.toString()) === 0){
      await Blog.findByIdAndDelete( { _id: targetId });
      user.blogs = user.blogs.filter(id => id.toString().localeCompare(targetId.toString()) !== 0 );
      await user.save();
      res.status(204).end();
    }
    else {
      const err = new Error('This user is not authorized to delete this blog');
      err.name = ErrorNames.UserIsNotAuthorized;
      throw err;
    }
  }
  catch(err) {
    next(err);
  }
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