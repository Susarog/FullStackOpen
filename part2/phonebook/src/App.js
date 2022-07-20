import { useState } from "react";

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
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
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
  };
  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={filterValue} onChange={FilterInput} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={newInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={newInputNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
          .map((person) => (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
