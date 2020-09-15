import React from "react";

const Button = ({type='submit', handleClick, children}) =>
    <button type={type} onClick={handleClick}>{children}</button>

const Person = ({person, deletePerson}) =>
    <li>
            {person.name} &nbsp;
            {person.number} &nbsp;
            <Button handleClick={() => deletePerson(person.id)}>delete</Button>
    </li>

export default Person