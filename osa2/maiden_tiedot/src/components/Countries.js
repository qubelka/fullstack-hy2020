import React from "react";

const Country = ({country, showFullCountryInfo}) => {
    const name = country.name
    return (
        <>
            <li>
                {name}&nbsp;
                <button onClick={() => showFullCountryInfo(name)}>show</button>
            </li>
        </>
    )
}

const Countries = ({filteredCountries, showFullCountryInfo}) =>
    <ul style={{listStyleType:'none', padding:0, marginTop:10}}>
        {filteredCountries.map(country =>
            <Country key={country.numericCode}
                     country={country}
                     showFullCountryInfo={showFullCountryInfo}
            />
        )}
    </ul>

export default Countries