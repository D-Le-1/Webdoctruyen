export interface Category {
  id: string
  name: string
  slug: string
}

export interface ChapterData {
  filename: string
  chapter_name: string
  chapter_title: string
  chapter_api_data: string
}

export interface ServerChapterData {
  server_name: string
  server_data: Omit<Chapter, 'server_name'>[]
}

export interface ComicDetails {
  _id: string
  name: string
  slug: string
  origin_name: string[]
  content: string
  status: string
  thumb_url: string
  sub_docquyen: boolean
  author: string[]
  category: Category[]
  chapters: ServerChapterData[]
}

export interface ChapterImage {
  image_page: number
  image_file: string
}

export interface ChapterItem {
  chapterId: string
  chapter_name: string
  chapter_title: string
  chapter_path: string
  comic_id: string
  comic_name: string
  chapter_image: ChapterImage[]
}

export interface ChapterResponse {
  domain_cdn: string
  item: ChapterItem
}

export interface ComicApiResponse {
  status: string
  message: string
  data: {
    seoOnPage: {
      og_type: string
      titleHead: string
      descriptionHead: string
      og_image: string[]
      og_url: string
    }
    breadCrumb: Array<{
      name: string
      slug: string
      isCurrent?: boolean
    }>
    titlePage: string
    item: ComicDetails
  }
}

export interface Truyen {
  id: string
  name: string
  slug: string
  title: string
  thumb_url: string
  chaptersLatest: Chapter[]
}

export interface TruyenResponse {
  items: Truyen[]
  params?: {
    pagination?: Pagination
  }
}

export interface Chapter {
  chapter_name: string
  chapter_title?: string
  chapter_api_data: string
  filename: string
  isRead?: boolean
  server_name?: string
  isCurrent?: boolean
}

export interface ChapterListProps {
  chapters: ServerChapterData[]
  perPage?: number
  slug: string
  maxVisiblePages?: number
}

export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
}

export interface ServerData {
  server_name: string
  server_data: ChapterImage[]
}
