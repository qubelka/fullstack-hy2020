import Languages from "./Languages"
import Weather from "./Weather";
import React, {useState, useEffect} from "react"
import axios from 'axios'

const CountryFullInfo = ({country}) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

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
            <h2>Weather in {country.name}</h2>
            {weather ? <Weather weather={weather}/> : ''}
        </>
    )
}

export default CountryFullInfo