const CountryList = ({countries, setCountries}) => {
    return (
      <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common} <button onClick={() => setCountries([country])}>show</button>
        </div>))}
      </div>
    )
  }

export default CountryList;