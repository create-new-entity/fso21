const dummyBlog = {
  title: "Node.js – The Past, Present, and Future",
  author: "Jason Grant",
  url: "https://sevenpeakssoftware.com/node-js-past-present-future-summary/",
  likes: 5
};

const dummyUsers = [
  {
    name: 'Abul',
    username: 'vokchod_the_great',
    password: 'the_cow_is_a_domestic_animal'
  },
  {
    name: 'Babul',
    username: 'abal_man',
    password: 'the_goat_is_a_domestic_animal'
  }
];

const dummyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
].map(blog => {
  delete blog._id;
  delete blog.__v;
  return blog;
});

const dummyStuffs = {
  dummyBlog,
  dummyBlogs,
  dummyUsers
};

module.exports = dummyStuffs;
