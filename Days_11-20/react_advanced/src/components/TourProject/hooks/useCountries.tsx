// hooks/useCountries.js
import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../data/countriesapi'

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 10,
  })
}