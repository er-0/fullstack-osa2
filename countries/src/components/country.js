
const Country = ({country, weatherData}) => {
    const languages = Object.values(country.languages);

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital.join(", ")}</div>
        <div>area: {country.area}</div>
        <br />
        <h3>languages:</h3>
        <ul>
        {languages.map(x => (<li key={x}>{x}</li>))}
        </ul>

        <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>

        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weatherData.main.temp} Celsius</p>
        <p><img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/></p>
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }

export default Country;