
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, curr) => acc.likes < curr.likes ? curr : acc );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}