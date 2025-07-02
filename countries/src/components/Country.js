import Languages from "./Languages";

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <Languages languages={country.languages} />
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )    
}

export default Country;