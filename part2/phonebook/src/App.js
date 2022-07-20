import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const FilterInput = (event) => {
    setFilterValue(event.target.value);
  };
  const newInput = (event) => {
    setNewName(event.target.value);
  };
  const newInputNum = (event) => {
    setNewNumber(event.target.value);
  };
  const submit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName) ||persons.map((person) => person.number).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} FilterInput={FilterInput}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} newInput={newInput} newInputNum={newInputNum} submit={submit}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue}/>
    </div>
  );
};

export default App;
