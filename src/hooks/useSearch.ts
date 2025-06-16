import { SearchTruyen } from '../services/api'
import { useQuery } from '@tanstack/react-query'

export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['search', keyword],
    queryFn: () => SearchTruyen({ keyword }),
    enabled: !!keyword, // Only run the query if keyword is not empty
    refetchOnWindowFocus: false // Optional: prevent refetching on window focus
  })
}
