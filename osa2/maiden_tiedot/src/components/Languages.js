import React from "react";

const Language = ({language}) => <li>{language.name}</li>

const Languages = ({country}) =>
    <ul>
        {country.languages.map(language => <Language key={language.name} language={language}/>)}
    </ul>

export default Languages