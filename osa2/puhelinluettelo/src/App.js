import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' },
        { name: 'Matti L'}
    ])
    const [newName, setNewName] = useState('')

    const addNumber = (event) => {
        event.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName('')
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
