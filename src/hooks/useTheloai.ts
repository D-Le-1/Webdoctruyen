import { useQuery } from '@tanstack/react-query'
import { fetchTheloai } from '../services/api'

export const useTheloai = () => {
  return useQuery({
    queryKey: ['theloai'],
    queryFn: fetchTheloai
  })
}
