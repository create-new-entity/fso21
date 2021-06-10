import React from 'react';
import { nanoid } from 'nanoid';


const Country = ({ name, capital, population, languages, flag }) => {

  let renderedLanguages = languages.map(language => {
    return <li key={nanoid()}>{language}</li>
  });

  return (
    <>
      <h1>{name}</h1>
      <div>
        <p>capital {capital}</p>
        <p>population {population}</p>
      </div>
      <div>
        <h2>languages</h2>
        <ul>
          {
            renderedLanguages
          }
        </ul>
      </div>
      <img src={flag} width='300' height='220'/>
    </>
  );
};



export default Country;