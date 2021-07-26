import React from 'react';
import { nanoid } from 'nanoid';


const Country = ({ name, capital, population, languages, flag, weatherData }) => {

  let renderedLanguages = languages.map(language => {
    return <li key={nanoid()}>{language}</li>
  });

  let weatherStuffs = null;

  if(weatherData) {
    weatherStuffs = (
      <>
        <p><b>Weather in {capital}</b></p>
        <p><b>temperature:</b> {weatherData.temperature} celsius</p>
        <img src={weatherData.icon} width='50' height='50' alt='Weather Icon'/>
        <p><b>wind:</b> {weatherData.wind} mph direction {weatherData.wind_direction}</p>
      </>
    );
  }

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
      <img src={flag} width='300' height='220' alt='Country Flag'/>
      { weatherStuffs }
    </>
  );
};



export default Country;