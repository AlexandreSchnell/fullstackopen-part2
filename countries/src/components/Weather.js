const Weather = ({ capital, weatherInfo }) => {
    if(!weatherInfo) 
        return <p>Loading weather...</p>

    return (
        <div>
            <h1>Weather in {capital}</h1>
            <p>Temperature: {weatherInfo.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.weather[0].description}/>
            <p>Wind: {weatherInfo.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;