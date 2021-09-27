import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  useQuery
} from "@apollo/client";

import { GET_ALL_BOOKS } from '../queries';

const Books = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const [ selectedGenres, setSelectedGenres ] = useState([]);

  const genreSelected = {
    background: '#33769B',
    color: 'white'
  };
  const genreNotSelected = {
    background: '#EFEFEF',
    color: 'black'
  };

  const genreClickHandler = (genre) => {
    return () => {
      let newGenres;
      if(selectedGenres.includes(genre)){
        newGenres = selectedGenres.filter(selectedGenre => selectedGenre !== genre);
      }
      else {
        newGenres = [ ...selectedGenres ];
        newGenres.push(genre);
      }
      setSelectedGenres(newGenres);
    };
  };

  const allGenresSelected = () => {
    return (
      uniqueGenres.length === selectedGenres.length
      &&
      uniqueGenres.every(genre => selectedGenres.includes(genre))
    );
  };

  const noGenreSelected = () => selectedGenres.length === 0;

  if (!props.show) {
    return null;
  }
  
  if(loading) return <div>Loading...</div>;
  if(error) return <div>ERROR!!</div>;
  const books = data.allBooks;
  const genres = books.reduce((genres, currBook) => genres.concat(currBook.genres), []);
  const uniqueGenres = genres.filter((genre, index, genres) => genres.indexOf(genre) === index);

  const genresContent = () => {
    const genreButtons = uniqueGenres.map(genre => {
      return <button key={uuidv4()} style={(selectedGenres.includes(genre)) ? genreSelected : genreNotSelected} onClick={genreClickHandler(genre)}>{genre}</button>
    });

    genreButtons.push(
      <button key={uuidv4()} style={ (allGenresSelected() || noGenreSelected()) ? genreSelected : genreNotSelected } onClick={() => setSelectedGenres([])}>all genres</button>
    );

    return genreButtons;
  };

  const getBooks = () => {
    if(!selectedGenres.length) return books;
    return books.filter(book => book.genres.some((genre) => selectedGenres.includes(genre)));
  };

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
          {
            getBooks().map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        {
          genresContent()
        }
      </div>
    </div>
  )
}

export default Books