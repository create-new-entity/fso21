import React, { useState } from 'react'

import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ srchStr, setsrchStr ] = useState('')


  const handleSubmit = (event) => {

    event.preventDefault();

    if(persons.map(person => person.name.toLowerCase()).indexOf(newName) !== -1){
      window.alert(`${newName} already exists in the phonebook.`);
      return;
    }

    let newPerson = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');

  };



  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };


  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSrchStrChange = (event) => {
    setsrchStr(event.target.value);
  };



  const renderedPersons = persons.map((person) => {
    if(srchStr.length) {
      if(person.name.toLowerCase().includes(srchStr.toLowerCase())) {
        return person;
      }
      return;
    }
    return person;
  });



  return (
    <div>

      <h2>Phonebook</h2>
      <Search
        srchStr={srchStr}
        handleSrchStrChange={handleSrchStrChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />

      <h2>Numbers</h2>
      <Persons persons={renderedPersons}/>
      
    </div>
  )
}

export default App;
