const Person = ({person,deletePerson}) => {
  
    const handleDelete = () => {
      deletePerson(person.id)
    }
  
    return (
        <li>
        {person.name} {person.phone_number} <button type="button" onClick={handleDelete}>delete</button>
        </li>
    )
  }

  const Persons = ({persons, deletePerson}) => {
    return (
      <ul>
        {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
      </ul>
    )
  }
  
  export {Person,Persons}