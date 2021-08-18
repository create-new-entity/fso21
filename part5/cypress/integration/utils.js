const resetEverythingURL = 'http://localhost:3003/api/testing/reset';
const userURL = 'http://localhost:3003/api/users';
const frontEndURL = 'http://localhost:3000';
const NOTIFICATION_TIMEOUT = 5000;

const user = {
  'name': 'Ridley Scott',
  'username': 'house_of_gucci',
  'password': 'ridley_won'
};

const users = [
  user,
  {
    'name': 'David Fincher',
    'username': 'whacky_tobacci',
    'password': 'fincher_won_2'
  }
];

const newBlog = {
  title: 'Create an Abstract Image Slideshow with OGL, GLSL, and GSAP',
  author: 'Francesco Michelini',
  url: 'https://tympanus.net/codrops/2021/08/16/abstract-image-carousel-ogl-glsl-gsap/'
};

const dummyBlogs = [
  newBlog,
  {
    'title': 'Refactoring CSS: Strategy, Regression Testing And Maintenance (Part 2)',
    'author': 'Adrian Bece',
    'url': 'https://www.smashingmagazine.com/2021/08/refactoring-css-strategy-regression-testing-maintenance-part2/',
    'likes': 5
  },
  {
    'title': 'React Children And Iteration Methods',
    'author': 'Arihant Verma',
    'url': 'https://www.smashingmagazine.com/2021/08/react-children-iteration-methods/',
    'likes': 6
  },
  {
    'title': 'Seven Mistakes To Avoid In Your Technical Interviews',
    'author': 'Emma Bostian',
    'url': 'https://www.smashingmagazine.com/2021/04/mistakes-technical-interviews/',
    'likes': 7
  },
  {
    'title': 'Building Your Own Personal Learning Curriculum',
    'author': 'Kirsty Simmonds',
    'url': 'https://www.smashingmagazine.com/2021/02/building-personal-learning-curriculum/',
    'likes': 8
  },
  {
    'title': 'How To Build Resilient JavaScript UIs',
    'author': 'Callum Hart',
    'url': 'https://www.smashingmagazine.com/2021/08/build-resilient-javascript-ui/',
    'likes': 2
  },
];

const correctLoginCredentials = {
  username: user.username,
  password: user.password
};

const wrongLoginCredentials = {
  username: 'vadur_jadu',
  password: 'ore_jala'
};

const utils = {
  resetEverythingURL,
  userURL,
  frontEndURL,
  NOTIFICATION_TIMEOUT,
  user,
  users,
  newBlog,
  dummyBlogs,
  correctLoginCredentials,
  wrongLoginCredentials
};

export default utils;