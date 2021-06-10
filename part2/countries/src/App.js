import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Country from './components/Country';
import CountriesList from './components/CountriesList';

const baseURL = 'https://restcountries.eu/rest/v2/all';

const App = () => {

  const [allcountries, setAllCountries] = useState([]);
  const [findCountry, setFindCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);


  useEffect(() => {
    axios
      .get(baseURL)
      .then(response => {
        setAllCountries(response.data);
      });
  }, []);


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
