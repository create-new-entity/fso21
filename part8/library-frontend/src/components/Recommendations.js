import React from 'react';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  GET_LOGGED_IN_USER,
  GET_ALL_BOOKS
} from '../queries';


const Recommendations = () => {
  const printErr = (err) => {
    console.log(err);
  };

  const loggedInUser = useQuery(GET_LOGGED_IN_USER, {
    onError: printErr
  });

  const books = useQuery(GET_ALL_BOOKS, {
    onError: printErr
  });

  if(loggedInUser.loading || books.loading) return <div>Loading...</div>
  if(!loggedInUser.data || !books.data) return <div>Error</div>
  const userGenre = loggedInUser.data.me.favoriteGenre;

  const getRecommendedBooks = () => {
    return books.data.allBooks
      .filter(book => book.genres.includes(userGenre))
      .map(book => 
        <tr key={uuidv4()}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      );
  };
  
  return (
    <React.Fragment>
      <h1>recommendations</h1>
      <h2>books in you favorite genre: {userGenre}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            getRecommendedBooks()
          }
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Recommendations;