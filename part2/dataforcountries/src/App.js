import axios from "axios";
import { useState, useEffect } from "react";

const ShowInfo = ({ country }) => {
  if (country.show) {
    let id = 1;
    const countryVals = Object.values(country.languages);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>

        <h2>languages:</h2>
        <ul>
          {countryVals.map((language) => (
            <li key={id++}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} Flag`} />
      </div>
    )
  }
  return;
};

const Button = ({onClick, country}) => {
  if(country.show){
    return (
      <button onClick={onClick}>unshow</button>
    )
  }
  return (
    <button onClick={onClick}>show</button>
  )
}

const Countries = ({ filteredCountries, input, setFilteredCountries }) => {
  if (input.length === 0) {
    return;
  }

  const button = (country) => {
    setFilteredCountries(filteredCountries.map(obj => {
      if(obj === country) {
        obj.show = !obj.show;
      }
      return obj;
    }))
  };

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another another filter</div>;
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.area}>
            {country.name.common}
            <Button onClick={button.bind(this, country)} country={country}/>
            <ShowInfo country={country} />
          </div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    let id = 1;
    const countryVals = Object.values(country.languages);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>

        <h2>languages:</h2>
        <ul>
          {countryVals.map((language) => (
            <li key={id++}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} Flag`} />
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setNewInput] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterInput = (event) => {
    setNewInput(event.target.value);
    setFilteredCountries(
      countries
        .filter((obj) =>
          obj.name.common
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
        .map((obj) => ({ ...obj, showCountry: false }))
    );
  };

  return (
    <div>
      <div>
        find countries <input value={input} onChange={filterInput} />
      </div>
      <Countries
        filteredCountries={filteredCountries}
        input={input}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
};

export default App;
