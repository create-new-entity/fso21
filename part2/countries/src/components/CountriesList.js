import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';

import Country from './Country';

const weatherBaseURL = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=`;


const Countries = ({countries, handleShowButtonClick}) => {
  const [weatherData, setWeatherData] = useState(null);

  
  useEffect(() => {
    let loadWeatherData = async () => {
      let filteredCountries = countries.filter(country => country.show);
      let promises = filteredCountries.map(country => axios.get(weatherBaseURL+country.capital));
      let responses = await Promise.all(promises);
      
      let newWeatherData = {};
      responses.forEach(response => {
        newWeatherData[response.data.location.country.toLowerCase()] = {
          location: response.data.location.name,
          temperature: response.data.current.temperature,
          wind: response.data.current.wind_speed,
          wind_direction: response.data.current.wind_dir,
          icon: response.data.current.weather_icons[0]
        };
      });
      
      setWeatherData(newWeatherData);
    };
    loadWeatherData();
  }, [countries]);

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
            weatherData={weatherData[country.name.toLowerCase()]}
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