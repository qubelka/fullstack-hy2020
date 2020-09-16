import React from "react";
import Language from "./Language";

const Languages = ({country}) =>
    <ul>
        {country.languages.map(language => <Language key={language.name} language={language}/>)}
    </ul>

export default Languages