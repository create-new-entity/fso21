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