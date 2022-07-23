const Persons = ({
  persons,
  filterValue,
  deletePerson,
  setPersons,
  updatePerson,
}) => {
  const deletePhonePerson = (person) => {
    const personID = person.id;
    const personName = person.name;
    let index = 1;
    if (window.confirm(`Delete ${personName}?`)) {
      deletePerson(personID)
        .then(setPersons(persons.filter((person) => person.id !== personID)))
        .catch((error) => alert(`${personName} does not exist`));
    }
    return;
  };

  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePhonePerson(person)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
