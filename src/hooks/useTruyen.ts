import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchTruyenDangPhatHanh } from '../services/api'
import { TruyenResponse } from '../utils/type'

export const useTruyen = (page: number) => {
  const options: UseQueryOptions<
    TruyenResponse,
    Error,
    TruyenResponse,
    readonly [string, number]
  > = {
    queryKey: ['truyen', page] as const, // Ensure readonly
    queryFn: () => fetchTruyenDangPhatHanh(page),
    staleTime: 5 * 60 * 1000
  }

  return useQuery<
    TruyenResponse,
    Error,
    TruyenResponse,
    readonly [string, number]
  >(options)
}
