const inputBlogs = require('./../utils/testInputBlogs');
const listHelper = require('../utils/list_helper');

describe('Initial tests', () => {

  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1)
  });

});


describe('Total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(inputBlogs)
    expect(result).toBe(36)
  })
})


describe('Favorite Blog', () => {

  test('Most liked blog works', () => {

    const targetBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    };

    const result = listHelper.favoriteBlog(inputBlogs);
    expect(result).toEqual(targetBlog);
  });

  test('Author that has written most blogs works', () => {
    const targetAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    };

    const result = listHelper.mostBlogs(inputBlogs);
    expect(result).toEqual(targetAuthor);
  });

  test('Author that has most likes works', () => {
    const targetAuthor = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };

    const result = listHelper.mostLikes(inputBlogs);
    expect(result).toEqual(targetAuthor);
  });
});