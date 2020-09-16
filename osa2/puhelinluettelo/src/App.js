import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        personService
            .getAll()
            .then(personList => {
                setPersons(personList)
            })
            .catch(() => setError(true))
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
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })

        } else if (!{newName}.newName || !{newNumber}.newNumber) {
            alert('Name or phone number missing')
        } else {
            updatePerson(persons.find(person => person.name === {newName}.newName), {newNumber}.newNumber)
        }
    }

    const deletePerson = person => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(error => {
                    alert(`'${person.name}' was already deleted from the server`)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    const updatePerson = (person, newNumber) => {
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
            const updatedPerson = {...person, number:newNumber}

            personService
                .update(person.id, updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    alert(`'${person.name}' was already deleted from the server`)
                    setPersons(persons.filter(p => p.id !== person.id))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleChange = (setFunction) => (event) => setFunction(event.target.value)

    return (
        <div>
            <h1>Phonebook</h1>
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
            {error && <p>Could not load the person list from the server</p>}
        </div>
    )
}

export default App
