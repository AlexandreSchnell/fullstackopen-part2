import {useState, useEffect} from 'react'
import countriesService from './services/countries'
import Message from './components/Message'
import Countries from './components/Countries'
import weatherService from './services/weather'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [uniqueCountry, setUniqueCountry] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry('');
    if(event.target.value.length > 0){
      countriesService.getCountryByName(event.target.value)
        .then(data => {
          if(data.length > 10){
            setMessage('Too many matches, specify another filter');
            setCountries(null);
          }else {
            if(data.length === 1)
              setUniqueCountry(data[0]);
            setMessage(null);
            setCountries(data);
          }
        }).catch(error => {
          setMessage('No countries found');
          setCountries(null);
        });
    }else{
      setCountries(null);
    }
  };

  const showCountry = (country) => {
    setSelectedCountry(country.name.common);
    setUniqueCountry(country);
  };

  useEffect(() => {
    if(uniqueCountry){
      weatherService
        .getWeather(uniqueCountry.latlng[0], uniqueCountry.latlng[1])
        .then(weather => {
          setWeatherInfo(weather);
        }).catch(error => {
          setMessage('Weather information not available');
          setWeatherInfo(null);
        })
    }
  }, [uniqueCountry])

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleChange}/>
      <Message message={message} />
      <Countries countries={countries} showCountry={showCountry} selectedCountry={selectedCountry} weatherInfo={weatherInfo}/>
    </div>
  );
}

export default App;
