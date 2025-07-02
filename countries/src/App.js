import {useState, useEffect} from 'react'
import countriesService from './services/countries'
import Message from './components/Message'
import Countries from './components/Countries'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
        });
    }
  };

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleChange}/>
      <Message message={message} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
