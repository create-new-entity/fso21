const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');

const dummyData = require('./dummyData');

let authors = dummyData.authors;
let books = dummyData.books;


const typeDefs = gql`

  type Author {
    name: String!,
    id: ID!,
    bookCount: Int!,
    born: Int
  }

  type Book {
    title: String!,
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String!]!
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
    ): Book
  }
`

const resolvers = {

  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  },

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, args) => {
      let filteredBooks;

      filteredBooks = books;
      if(args && args.author) filteredBooks = filteredBooks.filter(book => book.author === args.author);
      if(args && args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
      };
      
      return filteredBooks;
    },
    allAuthors: () => authors
  },

  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        ...args, id: uuid()
      };
      
      books.push(newBook);
      const found = authors.find(author => author.name === args.author);
      if(!found) {
        const newAuthor = {
          name: args.author
        };
        authors.push(newAuthor);
      }
      return newBook;
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