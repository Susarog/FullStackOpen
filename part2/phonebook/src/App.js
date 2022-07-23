import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import phoneBookService from "./services/phonebook";

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
    const dudeInBook = persons.find((person) => person.name.includes(newName));
    if (dudeInBook && dudeInBook.number.includes(newNumber)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      setFilterValue("");
      return;
    } else if (dudeInBook && !dudeInBook.number.includes(newNumber)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const tempObj = { ...dudeInBook, number: newNumber };
        phoneBookService
          .updatePerson(dudeInBook.id, tempObj)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== tempObj.id ? person : response.data
              )
            )
            setNewName("");
            setNewNumber("");
            setFilterValue("");
          });
        return;
      } else {
        return;
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length === 0 ? 1 : persons[persons.length - 1].id + 1,
    };
    phoneBookService.createPerson(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      setFilterValue("");
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
      <Persons
        persons={persons}
        filterValue={filterValue}
        deletePerson={phoneBookService.deletePerson}
        updatePerson={phoneBookService.updatePerson}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
