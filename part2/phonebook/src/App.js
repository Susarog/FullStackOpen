import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas",id: 0 }]);
  const [newName, setNewName] = useState("");

  const newInput = (event) => {
    setNewName(event.target.value);
  };


  

  const submit = (event) => {
    event.preventDefault();
    if(persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    }
    setPersons(persons.concat({name: newName, id: persons.length}));
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.id}>{person.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
