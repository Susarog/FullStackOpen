import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import phoneBookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    phoneBookService.getPeople().then((response) => {
      setPersons(response.data);
    });
  }, []);

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
    if (
      persons.map((person) => person.name).includes(newName) ||
      persons.map((person) => person.number).includes(newName)
    ) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    phoneBookService.createPerson(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} FilterInput={FilterInput} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        newInput={newInput}
        newInputNum={newInputNum}
        submit={submit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
