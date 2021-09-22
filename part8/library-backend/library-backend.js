require('dotenv').config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const dummyData = require('./dummyData');

let authors = dummyData.authors;
let books = dummyData.books;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('DB Connection failed'));

const initializeDB = async () => {
  let author, newAuthor, filteredBooks, newBook;

  await Author.deleteMany();
  await Book.deleteMany();
  await User.deleteMany();

  for await (author of authors) {
    newAuthor = await new Author(author).save();
    filteredBooks = books.filter(book => book.author === newAuthor.name);
    filteredBooks.forEach(book => book.author = newAuthor.id);
    let promises = filteredBooks.map(book => new Book(book).save());
    await Promise.all(promises);
  }
};

initializeDB();




const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!,
    id: ID!,
    bookCount: Int!,
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(
      author: String,
      genre: String
    ): [Book!]!,
    allAuthors: [Author!]!,
    me: User
  }


  type Mutation {

    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book,

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author,

    createUser(
      username: String!
      favoriteGenre: String!
    ): User,

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {

  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => Book.find(),
    allAuthors: async () => Author.find(),
    me: (root, args, { currentUser }) => currentUser 
  },



  Mutation: {

    addBook: async (root, args, { currentUser }) => {

      if(!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let newBook = {
        ...args
      };
      let savedAuthor;

      let author = await Author.find({ name: newBook.author });
      try {
        if(!author.length) {
          const newAuthor = {
            name: args.author
          };
          savedAuthor = await new Author(newAuthor).save();
        }
        else savedAuthor = author;
        
        newBook.author = savedAuthor.id;
        return new Book(newBook).save();
      }
      catch(err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {

      if(!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo;
        return author.save();
      }
      catch(err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        });
      }
    },

    createUser: (root, args) => {
      try {
        return new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        }).save();
      }
      catch(err) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }

        console.log(user);

        const userForToken = {
          username: user.username,
          id: user.id,
        }

        console.log(userForToken);

        return {
          value: jwt.sign(userForToken, process.env.JWT_SECRET)
        };
      }
      catch(err) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    // console.log(auth);
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      // console.log(currentUser);
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})