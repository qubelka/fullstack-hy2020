import React from "react";
import Country from "./Country";

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