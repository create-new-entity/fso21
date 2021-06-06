import React from 'react';

import Person from './Person';

const Persons = ({ persons }) => {
  return persons.map(person => {
    if(!person) return;
    return <Person name={person.name} number={person.number}/>
  });
};

export default Persons;