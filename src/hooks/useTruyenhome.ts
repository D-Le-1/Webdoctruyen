import { useQuery } from '@tanstack/react-query'
import { fetchTruyenHome } from '../services/api'

export const useTruyenHome = () => {
  return useQuery({
    queryKey: ['truyenHome'],
    queryFn: fetchTruyenHome,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
    retry: 1 // Retry once on failure
  })
}
