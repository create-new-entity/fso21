const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, curr) => acc.likes < curr.likes ? curr : acc );
};

const mostBlogs = (blogs) => {
  return _
    .chain(blogs)
    .map((blog) => blog.author)
    .uniq()
    .map(author => {
      const result = blogs.filter(blog => blog.author.localeCompare(author) === 0).length;
      const count = result ? result : 0;
      return {
        author,
        blogs: count
      };
    })
    .maxBy('blogs')
    .value()
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}