import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import {
  ADD_NEW_BOOK,
  GET_ALL_AUTHORS,
  GET_ALL_BOOKS
} from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(ADD_NEW_BOOK, {
    refetchQueries: [
      GET_ALL_AUTHORS
    ],
    update: (cache, response) => {
      const dataInStore = cache.readQuery({
        query: GET_ALL_BOOKS
      });
      // console.log(dataInStore);
      cache.writeQuery({
        query: GET_ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
        }
      });
    }
  });
  

  const submit = async (event) => {
    event.preventDefault()
    

    const variables = {
      title, author, genres,
      published: Number(published)
    };
    
    addBook({ variables });

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
    props.setPage('authors');
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook