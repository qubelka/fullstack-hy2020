import React from "react";
import Person from "./Person";

const Persons = ({filteredPersons, deletePerson}) =>
    <ul style={{listStyleType:'none', padding:0, margin:0}}>
            {filteredPersons.map(person =>
                <Person
                    key={person.name}
                    deletePerson={deletePerson}
                    person={person}
                />
            )}
    </ul>

export default Persons