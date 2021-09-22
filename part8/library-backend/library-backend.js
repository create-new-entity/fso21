require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');


const Author = require('./models/author');
const Book = require('./models/book');
const dummyData = require('./dummyData');

let authors = dummyData.authors;
let books = dummyData.books;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('DB Connection failed'));

const initializeDB = async () => {
  let author, newAuthor, filteredBooks, newBook;

  await Author.deleteMany({});
  await Book.deleteMany({});

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
    allAuthors: [Author!]!
  }


  type Mutation {

    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book,

    editAuthor(name: String!, setBornTo: Int!): Author
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
    allAuthors: async () => Author.find()
  },



  Mutation: {

    addBook: async (root, args) => {
      let newBook = {
        ...args
      };
      let savedAuthor;

      let author = await Author.find({ name: newBook.author });
      if(!author.length) {
        const newAuthor = {
          name: args.author
        };
        savedAuthor = new Author(newAuthor).save();
      }
      else savedAuthor = author;
      
      newBook.author = savedAuthor.id;
      return new Book(newBook).save();
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo;
      return author.save();
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})