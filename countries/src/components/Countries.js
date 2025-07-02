import Languages from "./Languages"

const Countries = ({ countries }) => {
if (!countries)
    return null

  if (countries.length === 0)
    return <p>No countries found</p>

  if (countries.length > 1 && countries.length <= 10) {
    return (
        <div>
          {countries.map(country => (
            <p key={country.name.common}>
              {country.name.common}
            </p>
          ))}
        </div>
    )
  }

  if (countries.length === 1) {
    return (
        <div>
            <h1>{countries[0].name.common}</h1>
            <p>Capital: {countries[0].capital}</p>
            <p>Area: {countries[0].area}</p>
            <Languages languages={countries[0].languages} />
            <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        </div>
    )
  }
}

export default Countries;