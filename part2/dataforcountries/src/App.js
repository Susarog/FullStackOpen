import axios from "axios";
import { useState, useEffect } from "react";
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ country, weather }) => {
  if (Object.keys(country).length === 0 || Object.keys(weather).length === 0) {
    return;
  }
  return (
    <div>
      <h2>Weather in {country.name.common}</h2>
      <div>
        temperature {Math.round((weather.main.feels_like - 273.15) * 100) / 100}{" "}
        Celsius
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather.description}
      ></img>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
};

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
    );
  }
  return;
};

const Button = ({ onClick, country }) => {
  if (country.show) {
    return <button onClick={onClick}>unshow</button>;
  }
  return <button onClick={onClick}>show</button>;
};

const Countries = ({ filteredCountries, input, setFilteredCountries }) => {
  if (input.length === 0) {
    return;
  }

  const button = (country) => {
    setFilteredCountries(
      filteredCountries.map((obj) => {
        if (obj === country) {
          return { ...obj, show: !country.show };
        }
        return obj;
      })
    );
  };

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another another filter</div>;
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.area}>
            {country.name.common}
            <Button onClick={button.bind(this, country)} country={country} />
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
  const [country, setCurrentCountry] = useState({});
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(country).length === 0) {
      return;
    }
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  const filterInput = (event) => {
    setNewInput(event.target.value);
    const tempCountries = countries
      .filter((obj) =>
        obj.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
      .map((obj) => ({ ...obj, showCountry: false }));
    setFilteredCountries(tempCountries);
    if (tempCountries.length === 1) {
      setCurrentCountry(tempCountries[0]);
    } else {
      setCurrentCountry({});
    }
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
      <Weather country={country} weather={weather} />
    </div>
  );
};

export default App;
