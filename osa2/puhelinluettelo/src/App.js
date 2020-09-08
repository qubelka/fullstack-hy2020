import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '+12-123-1234'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <p style={{fontSize: "24px", fontWeight: "bold"}}>Phonebook</p>
            <form onSubmit={addNameAndNumber}>
                <div>name: <input value={newName} onChange={handleNameChange} /></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
                <div><button type="submit">add</button></div>
            </form>
            <p style={{fontSize: "24px", fontWeight: "bold"}}>Numbers</p>
            <ul style={{listStyleType:"none", padding:0, margin:0}}>
                {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )

}

export default App
