import axios from 'axios'

export const fetchCountries = async () => {
  const { data } = await axios.get('https://restcountries.com/v3.1/all?fields=name')
  return data
}