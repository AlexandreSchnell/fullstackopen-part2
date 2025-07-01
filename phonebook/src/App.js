import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import SuccessNotification from './components/SuccessNotification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updatedPerson = { ...person, number: newNumber }

        personService.update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        
            if(newName.toLowerCase().includes(search))
              setFilteredPersons(filteredPersons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${returnedPerson.name}'s number`)

            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }).catch(error => {
            alert(`Information of ${newName} has already been removed from server`)
          })
      }
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
      
          if(newName.toLowerCase().includes(search))
            setFilteredPersons(filteredPersons.concat(newPerson))
      
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setSearch(searchTerm)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchTerm)))
  }

  const handleDelete = (event) => {
    const id = event.target.value
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      personService.remove(person.id)
        .then(() => {
          alert(`${person.name} has been deleted`)
          setPersons(persons.filter(p => p.id !== person.id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App