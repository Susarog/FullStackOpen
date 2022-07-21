import axios from "axios";
import { useState, useEffect } from "react";

const Countries = ({ countries, input }) => {
  const lowerCase = input.toLowerCase();
  const filteredCountries = countries
    .map((name) => name.toLowerCase())
    .filter((name) => name.includes(lowerCase));
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another another filter</div>;
  }
  return (
    <div>
      {filteredCountries.map((name) => (
        <div>{name}</div>
      ))}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setNewInput] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data.map((obj) => obj.name.common));
    });
  },[]);

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
