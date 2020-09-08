import React, { useState } from 'react'

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
            <div>
                <label htmlFor="filter">filter by name: </label>
                <input id="filter" type="text" onChange={handleChange(setFilter)}/>
            </div>
            <h2>Add new phone number</h2>
            <form onSubmit={addNameAndNumber}>
                <div>
                    <label htmlFor="name">name: </label>
                    <input id="name" value={newName} onChange={handleChange(setNewName)} />
                </div>
                <div>
                    <label htmlFor="number">number: </label>
                    <input id="number" value={newNumber} onChange={handleChange(setNewNumber)} />
                </div>
                <div><button type="submit">add</button></div>
            </form>
            <h2>Numbers</h2>
            <ul style={{listStyleType:"none", padding:0, margin:0}}>
                {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )

}

export default App
