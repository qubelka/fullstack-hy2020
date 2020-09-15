import React from "react";
import InputField from "./InputField";

const PersonForm = ({addNameAndNumber, newName, newNumber, handleChange, setNewName, setNewNumber}) =>
        <form onSubmit={addNameAndNumber}>
            <InputField id='name' value={newName} onChange={handleChange(setNewName)}>
                name:
            </InputField>
            <InputField id='number' value={newNumber} onChange={handleChange(setNewNumber)}>
                number:
            </InputField>
            <div><button type='submit'>add</button></div>
        </form>

export default PersonForm