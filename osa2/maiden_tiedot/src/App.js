import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from "./components/Countries"
import CountryFullInfo from "./components/CountryFullInfo"

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const showFullCountryInfo = (name) => setFilter(name)

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    const renderList = () => {
        if (filteredCountries.length === 0) {
            return <p>Nothing found on your request. Please try again</p>
        } else if (filteredCountries.length === 1) {
            const country = filteredCountries[0]
            return <CountryFullInfo country={country}/>
        } else if (filteredCountries.length > 1 && filteredCountries.length < 11) {
            return (
                <Countries
                    filteredCountries={filteredCountries}
                    showFullCountryInfo={showFullCountryInfo}
                />
            )
        } else {
            return <p>Too many matches, specify another filter</p>
        }
    }

    return (
        <div>
            <label htmlFor='filter'>Find countries </label>
            <input id='filter' type='text' value={filter} onChange={handleFilter}/>
            {filter ? renderList() : <p>Please enter some search criteria</p>}
        </div>
    )
}

export default App;
