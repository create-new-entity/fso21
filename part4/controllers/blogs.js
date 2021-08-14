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

blogsRouter.post('/', async (req, res, next) => {
  try {
    const user = req.user;
    if(!user) {
      const err = new Error('Token missing or invalid');
      err.name = ErrorNames.TokenMissingOrInvalid;
      throw err;
    }

    let newObj = req.body;
    if(!newObj.title || !newObj.url) {
      res.status(400).end();
      return;
    }
    newObj.hasOwnProperty('likes') ? newObj : newObj.likes = 0;
    
    newObj.user = user._id;
    const blog = new Blog(newObj);
    const result = await blog.save();
    const updatedBlogs = user.blogs.concat(result.id);
    const updateConfig = {
      $set: { 
        blogs: updatedBlogs
      }
    };
    await user.update(updateConfig);
    res.status(201).json(result);
  }
  catch(err) {
    next(err);
  }
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

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const updatedBlog = {
      user: req.body.user,
      likes: req.body.likes,
      author: req.body.author,
      title: req.body.title,
      url: req.body.url
    };

    const filter = { _id: targetId };
    const options = { new: true };

    const result = await Blog.findOneAndReplace(filter, updatedBlog, options);
    res.status(200).json(result);
  }
  catch(err) {
    next(err);
  }
});


module.exports = blogsRouter;