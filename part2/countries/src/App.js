import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Country from './components/Country';
import CountriesList from './components/CountriesList';

const baseURL = 'https://restcountries.eu/rest/v2/all';
const weatherBaseURL = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=`;


const App = () => {

  const [allcountries, setAllCountries] = useState([]);
  const [findCountry, setFindCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    axios
      .get(baseURL)
      .then(response => {
        setAllCountries(response.data);
      });
  }, []);

  useEffect(() => {
    let loadWeatherData = async () => {
      let promises;

      if(filteredCountries.length === 1) {
        promises = [axios.get(weatherBaseURL+filteredCountries[0].capital)];
      }
      else if(filteredCountries.length > 1){
        let countriesWithShowButtons = filteredCountries.filter(country => country.show);
      
        promises = countriesWithShowButtons.map(country => {
          return axios.get(weatherBaseURL+country.capital);
        });
      }
      else return;
      
      let responses = await Promise.all(promises);
      
      let newWeatherData = {};
      responses.forEach((response) => {
        let countryName = filteredCountries.find(country => country.capital.toLowerCase().localeCompare(response.data.location.name.toLowerCase()) === 0).name.toLowerCase();
        if(!countryName) return;
        newWeatherData[countryName] = {
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
  }, [filteredCountries]);


  const handleFindCountryInputChange = (event) => {

    let countryToFind = event.target.value;
    setFindCountry(countryToFind);

    if(!countryToFind.length) {
      setFilteredCountries([]);
      return;
    }


    let newFilteredCountries = 
      allcountries
        .filter(country => {
          return country.name.toLowerCase().includes(countryToFind.toLowerCase());
        })
        .map(country => {
          country.show = false;
          return country;
        });

    setFilteredCountries(newFilteredCountries);
  };



  const handleShowButtonClick = (countryName) => {

    let newFilteredCountries = [...filteredCountries];
    let index = newFilteredCountries.findIndex((country) => country.name.toLowerCase().localeCompare(countryName.toLowerCase()) === 0);

    newFilteredCountries[index].show = !newFilteredCountries[index].show;

    setFilteredCountries(newFilteredCountries);
  };



  let contentUnderSearchBar;
  
  if(filteredCountries.length > 1 && filteredCountries.length <= 10) {

    contentUnderSearchBar =
      <CountriesList
        countries={filteredCountries}
        weatherData={weatherData}
        handleShowButtonClick={handleShowButtonClick}
      />;

  }

  else if(filteredCountries.length === 1) {


    contentUnderSearchBar = <Country
      name={filteredCountries[0].name}
      capital={filteredCountries[0].capital}
      population={filteredCountries[0].population}
      languages={filteredCountries[0].languages.map(language => language.name)}
      flag={filteredCountries[0].flag}
      weatherData={weatherData[filteredCountries[0].name.toLowerCase()]}
    />;

  }

  else if(filteredCountries.length > 10) {
    contentUnderSearchBar = <p>Too many matches, specify another filter</p>;
  }


  return (
    <div>
      <div>
        find countries <input value={findCountry} onChange={handleFindCountryInputChange}/>
      </div>
      <div>
        {
          contentUnderSearchBar
        }
      </div>
    </div>
  );
}

export default App;
