import React from "react";

const Country = ({country}) => <li>{country.name}</li>

const Countries = ({filteredCountries}) =>
    <ul style={{listStyleType:'none', padding:0, marginTop:10}}>
        {filteredCountries.map(country => <Country key={country.numericCode} country={country}/>)}
    </ul>

export default Countries