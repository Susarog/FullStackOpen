import axios from "axios";
import { useState, useEffect } from "react";

const Countries = ({ countries, input }) => {
  if(input.length == 0) {
    return;
  }
  const lowerCase = input.toLowerCase();
  const filteredCountries = countries
    .filter((obj) => obj.name.common.toLowerCase().includes(lowerCase));
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another another filter</div>;
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((name) => (
          <div key={name.area}>{name.name.common}</div>
        ))}
      </div>
    );
  } else if (filteredCountries.length == 1) {
    const country = filteredCountries[0];
    let id = 1;
    const countryVals = Object.values(country.languages)
    return (
      <div>
          <h1>{country.name.common}</h1>
          <div>capital: {country.capital}</div>
          <div>area: {country.area}</div>

          <h2>languages:</h2>
          <ul>
            {countryVals.map(language => <li key={id++}>{language}</li>)}
          </ul>
          <div>{country.flag}</div>
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setNewInput] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterInput = (event) => {
    setNewInput(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={input} onChange={filterInput} />
      </div>
      <Countries countries={countries} input={input} />
    </div>
  );
};

export default App;
