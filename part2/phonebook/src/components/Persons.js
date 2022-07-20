
const Persons = ({persons,filterValue}) => {
    return(
        <div>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
          .map((person) => (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          ))}
      </div>
    )
}


export default Persons;