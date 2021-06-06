import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '34-23-3434'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


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



  const renderedNumbers = persons.map((person) => {
    return (
      <p key={person.name}>{person.name}   {person.number}</p>
    );
  });

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        renderedNumbers
      }
    </div>
  )
}

export default App;
