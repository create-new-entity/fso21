  
import React from 'react'

import {
  useQuery
} from "@apollo/client";

import { GET_ALL_AUTHORS } from '../queries';
import NewBirthYearForm from './NewBirthYearForm';

const Authors = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);

  if(loading) return <div>Loading...</div>;
  if(error) return <div>ERROR!!</div>;
  const authors = data.allAuthors;
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <NewBirthYearForm authors={authors}/>
    </div>
  )
}

export default Authors
