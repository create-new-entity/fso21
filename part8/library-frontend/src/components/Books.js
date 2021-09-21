import React from 'react'

import {
  useQuery
} from "@apollo/client";

import { GET_ALL_BOOKS_WITHOUT_GENRES } from '../queries';

const Books = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS_WITHOUT_GENRES);

  if (!props.show) {
    return null
  }
  
  if(loading) return <div>Loading...</div>;
  if(error) return <div>ERROR!!</div>;
  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books