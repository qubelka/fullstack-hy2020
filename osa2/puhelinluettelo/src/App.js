import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [infoMessage, setInfoMessage] = useState(null)

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleChange = (setFunction) => (event) => setFunction(event.target.value)

    const setMessageWithTimeout = (setMessage, msg) => {
        setMessage(msg)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const clearFields = () => {
        setNewName('')
        setNewNumber('')
    }

    useEffect(() => {
        personService
            .getAll()
            .then(personList => {
                setPersons(personList)
            })
            .catch(error => {
                setErrorMessage('Could not load the person list from the server')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }, [])

    const addNameAndNumber = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name.toLowerCase().trim() === {newName}.newName.toLowerCase().trim()).length === 0
            && {newName}.newName
            && {newNumber}.newNumber)
        {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setMessageWithTimeout(setInfoMessage, `${returnedPerson.name} has been successfully added to the phonebook!`)
                    setPersons(persons.concat(returnedPerson))
                    clearFields()
                })
                .catch(error => {
                    setMessageWithTimeout(setErrorMessage, 'Something went wrong while trying to add a new person')
                    clearFields()
                })

        } else if (!{newName}.newName || !{newNumber}.newNumber) {
            setMessageWithTimeout(setErrorMessage, 'Name or phone number missing')
        } else {
            updatePerson(persons.find(person => person.name === {newName}.newName), {newNumber}.newNumber)
        }
    }

    const deletePerson = person => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    setMessageWithTimeout(setInfoMessage, `${person.name} has been successfully removed from the phonebook!`)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(error => {
                    setMessageWithTimeout(setErrorMessage, `${person.name}'s contact information has been already removed from the server`)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    const updatePerson = (person, newNumber) => {
        if (window.confirm(`${person.name} has been already added to the phonebook, replace the old number with a new one?`)) {
            const updatedPerson = {...person, number:newNumber}

            personService
                .update(person.id, updatedPerson)
                .then(returnedPerson => {
                    setMessageWithTimeout(setInfoMessage, 'Contact information has been successfully updated!')
                    setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
                    clearFields()
                })
                .catch(error => {
                    setMessageWithTimeout(setErrorMessage, `${person.name}'s contact information has been already removed from the server`)
                    setPersons(persons.filter(p => p.id !== person.id))
                    clearFields()
                })
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} className='error' />
            <Notification message={infoMessage} className='info' />
            <Filter filter={filter} handleChange={handleChange} setFilter={setFilter}/>
            <h2>Add new phone number</h2>
            <PersonForm
                addNameAndNumber={addNameAndNumber}
                handleChange={handleChange}
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
            />
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
        </div>
    )
}

export default App
