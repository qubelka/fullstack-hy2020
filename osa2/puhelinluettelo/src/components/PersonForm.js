import React from "react";

const PersonForm = ({addNameAndNumber, newName, newNumber, handleChange, setNewName, setNewNumber}) =>
        <form onSubmit={addNameAndNumber}>
            <div>
                <label htmlFor='name'>name: </label>
                <input id='name' value={newName} onChange={handleChange(setNewName)} />
            </div>
            <div>
                <label htmlFor='number'>number: </label>
                <input id='number' value={newNumber} onChange={handleChange(setNewNumber)} />
            </div>
            <div><button type='submit'>add</button></div>
        </form>

export default PersonForm