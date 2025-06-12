import { fetchTruyenBySlug } from '../services/api'
import { useQuery } from '@tanstack/react-query'

// Trong useTruyendetail hook
export const useTruyendetail = (slug: string) => {
  return useQuery({
    queryKey: ['truyendetail', slug],
    queryFn: () => fetchTruyenBySlug(slug),
    enabled: !!slug, // Chỉ fetch khi có slug
    retry: 1
  })
}
