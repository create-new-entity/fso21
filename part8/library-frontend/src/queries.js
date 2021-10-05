import {
  gql
} from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query Query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query Query {
    allBooks {
      title,
      published,
      author {
        name
      },
      genres,
      id
    }
  }
`;

export const ADD_NEW_BOOK = gql`
  mutation Mutation(
    $title: String!,
    $author: String!,
    $genres: [String!]!,
    $published: Int!
    ) {
      addBook(
        title: $title,
        author: $author,
        genres: $genres,
        published: $published
        ) {
          title
          published
          author {
            name
            born
            bookCount
            id
          }
          id
          genres
      }
  }
`;


export const EDIT_AUTHOR_BIRTH_YEAR = gql`
  mutation Mutation(
    $name: String!,
    $setBornTo: Int!
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      bookCount
      born
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation(
    $username: String!,
    $password: String!
  ) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query Query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
    }
    id
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;