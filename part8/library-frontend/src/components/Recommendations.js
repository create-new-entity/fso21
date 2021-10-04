import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  GET_LOGGED_IN_USER,
  GET_ALL_BOOKS
} from '../queries';


const Recommendations = () => {
  const [userFavGenre, setUserFavGenre] = useState('');

  const printErr = (err) => {
    console.log(err);
  };

  const loggedInUser = useQuery(GET_LOGGED_IN_USER, {
    onError: printErr,
    onCompleted: (resultData) => setUserFavGenre(resultData.me.favoriteGenre)
  });

  const [getAllBooks, { _, loading, data }] = useLazyQuery(GET_ALL_BOOKS, {
    onError: printErr,
    variables: {
      genre: userFavGenre.length ? userFavGenre : null
    }
  });

  useEffect(() => {
    getAllBooks();
  }, [userFavGenre, getAllBooks]);

  if(loggedInUser.loading || loading) return <div>Loading...</div>
  if(!loggedInUser.data || !data) return <div>Error</div>

  const getRecommendedBooks = () => {
    return data.allBooks
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
      <h2>books in you favorite genre: {userFavGenre}</h2>
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