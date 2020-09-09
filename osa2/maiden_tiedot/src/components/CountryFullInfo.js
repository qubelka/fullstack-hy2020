import Languages from "./Languages";
import React from "react";

const CountryFullInfo = ({country}) => {
    return (
        <>
            <h1>{country.name}</h1>
            <div>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
            </div>
            <h2>languages</h2>
            <Languages country={country}/>
            <img height={'80'} width={'110'} src={country.flag} alt={`Flag of ${country.name}`}/>
        </>
    )
}

export default CountryFullInfo