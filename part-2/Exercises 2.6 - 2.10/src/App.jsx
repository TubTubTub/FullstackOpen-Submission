import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-12367' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [shownPersons, setShownPersons] = useState(persons)

  let personsToShow = persons

  const addEntry = (event) => {
    event.preventDefault()
    const existingNames = persons.map(person => person.name)

    if (existingNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      let personObject = {
        name: newName,
        number: newNumber,
      }

      let newPersonList = persons.concat(personObject)
      setPersons(newPersonList)
      setShownPersons(newPersonList)
      
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    let personsToShow = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setShownPersons(personsToShow)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addEntry} onNameChange={handleNewName} onNumberChange={handleNewNumber} nameValue={newName} numberValue={newNumber} />
      
      <h2>Numbers</h2>

      <Persons persons={shownPersons} />
    </div>
  )
}

export default App