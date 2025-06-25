import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      return alert(`${newName} is already added to phonebook`)
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))

    if(newName.toLowerCase().includes(search))
      setFilteredPersons(filteredPersons.concat(personObject))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => {
    console.log('aqui')
    const searchTerm = event.target.value.toLowerCase()
    setSearch(searchTerm)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchTerm)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App