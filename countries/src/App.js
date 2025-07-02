import {useState} from 'react'
import countriesService from './services/countries'
import Message from './components/Message'
import Countries from './components/Countries'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

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
  };

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleChange}/>
      <Message message={message} />
      <Countries countries={countries} showCountry={showCountry} selectedCountry={selectedCountry}/>
    </div>
  );
}

export default App;
