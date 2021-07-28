import React from 'react';

const Person = ({ name, number, deleteButtonHandler }) => {
  return (
    <>
      <p> {name} {number} <button onClick={ deleteButtonHandler }>delete</button> </p> 
    </>
  );
};

export default Person;