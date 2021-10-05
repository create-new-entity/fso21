require('dotenv').config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require('apollo-server');
const { PubSub } = require('graphql-subscriptions')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const dummyData = require('./dummyData');

const pubsub = new PubSub();

let authors = dummyData.authors;
let books = dummyData.books;

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


  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {

  Author: {
    bookCount: (root) => root.books.length
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (_, args) => {
      let books = await Book.find().populate('author');
      let filteredBooks;
      filteredBooks = books;

      if(args && args.author) filteredBooks = filteredBooks.filter(book => book.author === args.author);
      if(args && args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
      };

      return filteredBooks;
    },

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
            name: args.author,
            books: []
          };
          savedAuthor = await new Author(newAuthor).save();
        }
        else savedAuthor = author[0];
        
        newBook.author = savedAuthor.id;
        newBook = await new Book(newBook).save();
        savedAuthor.books.push(newBook.id);
        await savedAuthor.save();
        newBook = await newBook.populate('author');

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

        return newBook;
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

        const userForToken = {
          username: user.username,
          id: user.id,
        }

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
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}




const initialize = async () => {
  let author, newAuthor, filteredBooks, savedBooks, savedBookIds;

  await Author.deleteMany();
  await Book.deleteMany();
  await User.deleteMany();

  for await (author of authors) {
    newAuthor = await new Author(author).save();
    filteredBooks = books.filter(book => book.author === newAuthor.name);
    filteredBooks = filteredBooks.map(book => {
      book.author = newAuthor.id;
      return book;
    });
    let promises = filteredBooks.map(book => new Book(book).save());
    savedBooks = await Promise.all(promises);
    savedBookIds = savedBooks.map(book => book.id);
    newAuthor.books = savedBookIds;
    await newAuthor.save();
  }

  await new User({
    username: 'vadur_jadu',
    favoriteGenre: 'refactoring'
  }).save();

  console.log('Initialized');
};



const setUp = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('DB Connected');
  await initialize();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })

  const { url, subscriptionsUrl  } = await server.listen();
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
};



setUp();
