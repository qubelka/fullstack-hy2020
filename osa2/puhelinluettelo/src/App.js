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

    useEffect(() => {
        personService
            .getAll()
            .then(personList => {
                setPersons(personList)
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
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })

        } else if (!{newName}.newName || !{newNumber}.newNumber) {
            alert('Name or phone number missing')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    const deletePerson = id => {
        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                alert(`Could not delete a person with an id ${id}`)
            })
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
        </div>
    )
}

export default App
