import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas",id: 0, number: "123-1231" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const newInput = (event) => {
    setNewName(event.target.value);
  };
  const newInputNum = (event) => {
    setNewNumber(event.target.value);
  }
  const submit = (event) => {
    event.preventDefault();
    if(persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    }
    setPersons(persons.concat({name: newName, id: persons.length, number: newNumber}));
    setNewName('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => (
          <div key={person.id}>{person.name} {person.number}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
