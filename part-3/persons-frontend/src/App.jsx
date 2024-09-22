import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import phoneBook from './services/phonebook.js'
import './index.css'

const Notification = ({ message, className }) => {
  if (message == null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [shownPersons, setShownPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneBook.getAll()
      .then(personsData => {
        setPersons(personsData)
        setShownPersons(personsData)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()

    const existingNames = persons.map(person => person.name)

    if ((newName === '') || (newNumber === '')) {
      alert('Missing name/number field!')
      return
    }

    if ((existingNames.includes(newName)) &&
    (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))) {
      const targetPerson = persons.find(person => person.name === newName)
      let personObject = {...targetPerson, number: newNumber}

      phoneBook.update(targetPerson.id, personObject)
        .then(updatedPersonData => {

          let newPersonList = persons.map(person => person.id === targetPerson.id ? updatedPersonData : person)
          setPersons(newPersonList)
          setShownPersons(newPersonList)
          
          setSuccessMessage('Entry updated!')
          setTimeout(() => setSuccessMessage(null), 3000)

        })
        .catch(error => {
          console.log(error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), 3000)
        })
      
      return
    }

    let personObject = {
      name: newName,
      number: newNumber
    }

    phoneBook.create(personObject)
      .then(newPersonData => {
        let newPersonList = persons.concat(newPersonData)
        setPersons(newPersonList)
        setShownPersons(newPersonList)
        
        setNewName('')
        setNewNumber('')
          
        setSuccessMessage('New entry added!')
        setTimeout(() => setSuccessMessage(null), 3000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 3000)
      })
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

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {

      phoneBook.deleteObject(event.target.id)
        .then(deletedPersonData => {
          const deletedList = persons.filter(person => person.id !== event.target.id)
          setPersons(deletedList)
          setShownPersons(deletedList)
        })

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addEntry} onNameChange={handleNewName} onNumberChange={handleNewNumber} nameValue={newName} numberValue={newNumber} />

      <Notification message={successMessage} className='success' />

      <Notification message={errorMessage} className='error' />
      
      <h2>Numbers</h2>

      <Persons persons={shownPersons} onDelete={handleDelete}/>
    </div>
  )
}

export default App