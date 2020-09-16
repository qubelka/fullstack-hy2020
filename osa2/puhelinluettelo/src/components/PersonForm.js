import React from "react";
import InputField from "./InputField";
import Button from "./Button";

const PersonForm = ({addNameAndNumber, newName, newNumber, handleChange, setNewName, setNewNumber}) =>
    <form onSubmit={addNameAndNumber}>
        <InputField id='name' value={newName} onChange={handleChange(setNewName)}>
            name:
        </InputField>
        <InputField id='number' value={newNumber} onChange={handleChange(setNewNumber)}>
            number:
        </InputField>
        <Button type='submit'>add</Button>
    </form>

export default PersonForm