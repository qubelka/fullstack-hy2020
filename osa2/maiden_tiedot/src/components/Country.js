import React from "react";

const Country = ({country, showFullCountryInfo}) => {
    const name = country.name
    return (
        <li>
            {name}&nbsp;
            <button onClick={() => showFullCountryInfo(name)}>show</button>
        </li>
    )
}

export default Country