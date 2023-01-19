import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone_number: '04523112'
  }
  ]) 
  const [newName, setNewName] = useState('a new name..')
  const [newNumber, setNewNumber] = useState('add a phone num')


  const addName = (event) => {
    event.preventDefault()
    if (checkIfOriginal(newName) === false) {
      const nameObject = {
        name:newName,
        phone_number:newNumber
      }

      setPersons(persons.concat(nameObject))
      setNewNumber('')
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    
  } 
  
  const handleSubmit = event => {
      event.preventDefault();
      addName(event)
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const checkIfOriginal = (name) => {
    return persons.some(item => item.name === name)
  }

  return (
    <div>
      <h2>Phonebook</h2>

    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumChange}/></div>
      <div><button type="submit">add</button></div>
    </form>


      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>
            {person.name} {person.phone_number}
          </li>
          )}
      </ul>
    </div>
  )

}

export default App