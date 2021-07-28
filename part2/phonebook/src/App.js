import React, { useState, useEffect } from 'react';

import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import backEndFns from './services/contacts';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ srchStr, setsrchStr ] = useState('')

  useEffect(() => {
    backEndFns
      .getAll()
      .then(contacts => {
        setPersons(contacts);
      })
      .catch( error => {
        console.log(error.message);
      });
  }, []);


  const handleSubmit = (event) => {

    event.preventDefault();

    if(persons.map(person => person.name.toLowerCase()).indexOf(newName) !== -1){
      window.alert(`${newName} already exists in the phonebook.`);
      return;
    }

    let newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 2
    };

    backEndFns.createNew(newPerson)
      .then( savedContact => {
        setPersons(persons.concat(savedContact));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log(error.message);
        setNewName('');
        setNewNumber('');
      });

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


  let renderedPersons;

  if(srchStr.length) {
    renderedPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(srchStr.toLowerCase());
    })
  }
  else {
    renderedPersons = persons;
  }


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
