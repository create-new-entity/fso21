import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    if(persons.map(person => person.name.toLowerCase()).indexOf(newName) !== -1){
      window.alert(`${newName} already exists in the phonebook.`);
      return;
    }
    let newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const renderedNumbers = persons.map((person) => {
    return <p key={person.name}>{person.name}</p>
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
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
