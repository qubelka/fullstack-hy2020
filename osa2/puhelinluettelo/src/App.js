import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addNameAndNumber = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name.toLowerCase().trim() === {newName}.newName.toLowerCase().trim()).length === 0
            && {newName}.newName
            && {newNumber}.newNumber)
        {
            setPersons(persons.concat(
                {
                    name: newName,
                    number: newNumber
                }
            ))
            setNewName('')
            setNewNumber('')
        } else if (!{newName}.newName || !{newNumber}.newNumber) {
            alert('Name or phone number missing')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleChange = (setFunction) => (event) => setFunction(event.target.value)

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter handleChange={handleChange} setFilter={setFilter}/>
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
            <Persons filteredPersons={filteredPersons} />
        </div>
    )
}

export default App
