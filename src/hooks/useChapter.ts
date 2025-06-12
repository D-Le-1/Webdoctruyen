import { useQuery } from '@tanstack/react-query'
import { fetchChapter } from '../services/api'

export const useChapter = (chapterId: string) => {
  return useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => fetchChapter(chapterId!),
    enabled: !!chapterId // Chỉ fetch khi có chapterId
  })
}
