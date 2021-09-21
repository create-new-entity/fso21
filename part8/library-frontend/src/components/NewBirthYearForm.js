import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';

import {
  EDIT_AUTHOR_BIRTH_YEAR,
  GET_ALL_AUTHORS
} from '../queries'

const NewBirthYearForm = ({ authors }) => {
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [ editAuthorBirthYear ] = useMutation(EDIT_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [
      GET_ALL_AUTHORS
    ],
    onError: (error) => {
      console.log(error.graphQLErrors[0]);
    }
  });


  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    };
  });

  const submit = async (event) => {
    event.preventDefault()
    

    const variables = {
      name: selectedOption.label,
      setBornTo: Number(born)
    };
    
    editAuthorBirthYear({ variables });
    
    setBorn('')
  }


  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default NewBirthYearForm