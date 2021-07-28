import React from 'react';

import Person from './Person';

const Persons = ({ persons, getDeleteButtonHandler }) => {
  let renderedPersons = persons.map(person => {
    return <Person
      key={person.id}
      name={person.name}
      number={person.number}
      deleteButtonHandler={ getDeleteButtonHandler(person.name, person.id) }
    />
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