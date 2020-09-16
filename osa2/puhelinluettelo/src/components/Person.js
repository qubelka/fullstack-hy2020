import React from "react";
import Button from "./Button";

const Person = ({person, deletePerson}) =>
    <li>
        {person.name} &nbsp;
        {person.number} &nbsp;
        <Button handleClick={() => deletePerson(person)}>delete</Button>
    </li>

export default Person