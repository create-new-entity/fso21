import React from 'react';
import { nanoid } from 'nanoid';

import Country from './Country';


const Countries = ({countries, handleShowButtonClick}) => {
  let renderedCountries = countries.map(country => {
    if(!country.show) {
      return (
        <div key={nanoid()}>
          <p>{country.name} <button onClick={() => handleShowButtonClick(country.name)}>{ country.show ? 'hide': 'show' }</button></p>
        </div>
      );
    }
    else {
      return (
        <div key={nanoid()}>
          <p>{country.name} <button onClick={() => handleShowButtonClick(country.name)}>{ country.show ? 'hide': 'show' }</button></p>
          <Country
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages.map(language => language.name)}
            flag={country.flag}
          />
        </div>
      );
    }
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