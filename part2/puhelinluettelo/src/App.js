import { useEffect, useState } from 'react'

import personService from './services/persons'
import './index.css'
import {Person,Persons} from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { Notification,Notification_Error } from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new name..')
  const [newNumber, setNewNumber] = useState('add a phone num')
  const [filter, setFilter] = useState('')

  
  const [errorMessage, setErrorMessage] = useState(null)
  const [addedMessage, setAddedMessage] = useState(null)

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}`)){
      
      personService
      .deletePerson_with_id(person.id)
      .then (() => {
        personService
        .getAll()
        .then(response => setPersons(response))
      })
    }

  }


  const addName = (event) => {
    event.preventDefault()
    const original = checkIfOriginal(newName)

    console.log(persons)
    if (original === false) {
      const nameObject = {
        name:newName,
        phone_number:newNumber
      }
      console.log(nameObject)
      personService
      .create(nameObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setAddedMessage(
          `Added '${newName}' to the phonebook`
        )
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
        setNewNumber('')
        setNewName('')

      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })

    }
    
    else if (original === true){
      const find_person = persons.find(person => person.name === newName)
      const changedPerson = { ...find_person, phone_number: newNumber }
     
      personService
      .update(find_person.id, changedPerson )
      .catch(error => {
        setErrorMessage(
          ` Person '${find_person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .then (() => {
        personService
        .getAll()
        .then(response => setPersons(response))
      })
    }

    else {
      alert(`${newName} is already added to phonebook`)
    }
  } 

  const handleSubmit = event => {
    event.preventDefault()
    addName(event)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const checkIfOriginal = (name) => {
    console.log(name)
    const person = persons.some(item => item.name === name)
    if (person){
      if(window.confirm(`${name} is already added to phonebook do you wish to replace?`)){
        return true
      }
    }
    return person
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />

      <Notification_Error message={errorMessage} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
        <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleSubmit={handleSubmit} 
        handleNameChange={handleNameChange} 
        handleNumChange={handleNumChange} 
      />

      <h3>Numbers</h3>
      <Persons persons={filterPersons} deletePerson={deletePerson} />

    </div>
  )
}

export default App
