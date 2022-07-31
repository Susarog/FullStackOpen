const Persons = ({
  persons,
  filterValue,
  deletePerson,
  setPersons,
  setMessage,
  setIsError,
}) => {
  const deletePhonePerson = (person) => {
    const personID = person.id;
    const personName = person.name;
    if (window.confirm(`Delete ${personName}?`)) {
      deletePerson(personID)
        .then(setPersons(persons.filter((person) => person.id !== personID)))
        .catch((err) => {
          setPersons(persons.filter((person) => person.id !== personID));
          setMessage(`'${personName}' was already removed from the server`);
          setTimeout(() => setMessage(null), 5000);
          setIsError(true);
        });
    }
    return;
  };

  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(filterValue.toLowerCase());
        })
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
