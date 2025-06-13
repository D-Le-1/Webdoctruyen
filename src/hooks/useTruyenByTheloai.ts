import { useQuery } from '@tanstack/react-query'
import { fetchTruyenByTheloai } from '../services/api'

export const useTruyenByTheloai = (slug: string, page: number = 1) => {
  return useQuery({
    queryKey: ['truyenByTheloai', slug, page],
    queryFn: () => fetchTruyenByTheloai(slug, page),
    enabled: !!slug, // Only fetch when slug is provided
    retry: 1 // Retry once on failure
  })
}
