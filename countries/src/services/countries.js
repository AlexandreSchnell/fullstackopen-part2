import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1';

const getAllCountries = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const getCountryByName = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`);
  return response.data;
};

export default {
  getAllCountries,
  getCountryByName,
};
