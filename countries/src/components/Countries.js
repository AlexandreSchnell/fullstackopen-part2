import Country from "./Country"

const Countries = ({ countries, showCountry, selectedCountry }) => {
  if (!countries)
    return null

  if (countries.length === 0)
    return <p>No countries found</p>

  if (countries.length > 1 && countries.length <= 10) {
    return (
        <div>
          {countries.map(country => (
            <div key={country.name.common}>
              <p key={country.name.common}>
                {country.name.common} <button onClick={() => showCountry(country)}>Show</button>
              </p>
              {selectedCountry === country.name.common && (
                <Country country={country} />
              )}
            </div>
          ))}
        </div>
    )
  }

  if (countries.length === 1)
    return <Country country={countries[0]} />
}

export default Countries;