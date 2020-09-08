import React from "react";

const Person = ({name, number}) => <li>{name} {number}</li>

const Persons = ({filteredPersons}) =>
        <ul style={{listStyleType:'none', padding:0, margin:0}}>
            {filteredPersons.map(person => <Person key={person.name} {...person}/>)}
        </ul>

export default Persons