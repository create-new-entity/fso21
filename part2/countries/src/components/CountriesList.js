import React from 'react';
import { nanoid } from 'nanoid';


const Countries = ({countries}) => {
  let renderedCountries = countries.map(country => {
    return <p key={nanoid()}>{country.name}</p>
  });

  return (
    <>
      {
        renderedCountries
      }
    </>
  );
};


export default Countries;