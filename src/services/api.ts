import axios from 'axios'
import { ChapterItem } from '../utils/type'

const API_BASE_URL = 'https://otruyenapi.com/v1/api'

export const fetchTruyenHome = async () => {
  const res = await axios.get(`${API_BASE_URL}/home`)
  return res.data.data
}

export const fetchTruyenDangPhatHanh = async (page = 1) => {
  const res = await axios.get(
    `${API_BASE_URL}/danh-sach/dang-phat-hanh?page=${page}`
  )
  console.log('Response data:', res.data)
  // Nếu items nằm trong res.data.items thì trả về đúng
  return res.data.data ?? []
}

export const fetchTruyenBySlug = async (slug: string) => {
  const res = await axios.get(`${API_BASE_URL}/truyen-tranh/${slug}`)
  return res.data.data
}

export const fetchChapter = async (
  chapterId: string
): Promise<{
  domain_cdn: string
  item: ChapterItem
}> => {
  const res = await axios.get(
    `https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`
  )
  return res.data.data
}

export const fetchTheloai = async () => {
  const res = await axios.get(`${API_BASE_URL}/the-loai`)
  return res.data.data
}

export const fetchTruyenByTheloai = async (slug: string, page = 1) => {
  const res = await axios.get(`${API_BASE_URL}/the-loai/${slug}?page=${page}`)
  return res.data.data
}
