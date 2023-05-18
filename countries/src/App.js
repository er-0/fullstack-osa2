import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/country.js'
import Filter from './components/filter.js'
import CountryList from './components/countrylist.js'

/*const Filter = (props) => {
  return (
    <div>
    find countries 
      <input
        value={props.filter}
        onChange={props.onChange} />
      <button onClick={props.reset}>reset</button>
    </div>
  )
}

const CountryList = ({countries, setCountries}) => {
  return (
    <div>
    {countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common} <button onClick={() => setCountries([country])}>show</button>
      </div>))}
    </div>
  )
}*/

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weatherData, setWeather] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])
  console.log('data', countries)
   
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const name = event.target.value
    setCountries(countries.filter((country) => new RegExp(name, "i").test(country.name.common)))
  }
  
  const emptyFilter = () => {
    setFilter('')
    getCountries()
  }

  useEffect(() => {
    if (countries.length === 1) {
      const [lat, lng] = countries[0].capitalInfo.latlng
      const weather = `${baseUrl}lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
      axios
        .get(weather)
        .then((response) => {
          setWeather(response.data)
        })
    }

  }, [countries])

  return (
    <div>
    <Filter 
      filter={filter}
      onChange={handleFilterChange}
      reset={emptyFilter} />
    {filter.length === 0 ? <p></p>
      :
      (countries.length > 10 ? <p>too many matches, specify another filter</p>
        :
        ((countries.length === 1 && weatherData) ? <Country country={countries[0]} weatherData={weatherData} />
          :
          <CountryList countries={countries} setCountries={setCountries} />))
    }
    </div>
    
  )
  
  }
  export default App