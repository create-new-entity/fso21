import {
  gql
} from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const GET_ALL_BOOKS_WITHOUT_GENRES = gql`
  query {
    allBooks {
      title,
      published,
      author,
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
          author
          id
          genres
    }
  }
`;