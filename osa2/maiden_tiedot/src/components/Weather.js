import React from "react";

const Weather = ({weather}) => {
    return (
        <>
            <p><span style={{fontWeight:'bold'}}>temperature: </span>{weather.main.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
            <p><span style={{fontWeight:'bold'}}>wind: </span>{weather.wind.speed} mps direction {weather.wind.deg} degrees</p>
        </>
    )
}

export default Weather