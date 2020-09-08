import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addNumber = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name.toLowerCase().trim() === {newName}.newName.toLowerCase().trim()).length === 0 && {newName}.newName) {
            setPersons(persons.concat({name: newName}))
            setNewName('')
        } else if (!{newName}.newName) {
            alert('Please enter new name')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    const handleNumberChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <p style={{fontSize: "24px", fontWeight: "bold"}}>Phonebook</p>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <p style={{fontSize: "24px", fontWeight: "bold"}}>Numbers</p>
            <ul style={{listStyleType:"none", padding:0, margin:0}}>
                {persons.map(person => <li key={person.name}>{person.name}</li>)}
            </ul>
        </div>
    )

}

export default App
