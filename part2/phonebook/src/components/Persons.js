import React from 'react';

import Person from './Person';

const Persons = ({ persons }) => {
  let renderedPersons = persons.map(person => {
    return <Person key={person.id} name={person.name} number={person.number}/>
  });

  return (
    <>
      {
        renderedPersons
      }
    </>
  );
};

export default Persons;