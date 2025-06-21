import React, { useMemo, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChapter } from '../hooks/useChapter'
import { Link } from 'react-router-dom'
import { useTruyendetail } from '../hooks/useTruyenDetail'
import { useReadStore } from '../utils/store/useReadStore'
import {
  ChapterImage,
  ChapterItem,
  ServerChapterData,
  Chapter
} from '../utils/type'
import ListChapComponent from '../components/ModalChap'

const ReadComic: React.FC = () => {
  const { slug, chapterId } = useParams<{ slug: string; chapterId: string }>()
  const navigate = useNavigate()
  const [Modal, setOpenModal] = useState(false)
  const { data: truyen } = useTruyendetail(slug!)
  const {
    data: chapterContent,
    isLoading,
    isError,
    error,
    refetch
  } = useChapter(chapterId || '')

  const markAsRead = useReadStore((state) => state.markAsRead)
  const getReadChapters = useReadStore((state) => state.getReadChapters)

  const readChapters = useMemo(() => {
    if (!slug) {
      console.warn('Slug is missing') // Debug
      return new Set<string>()
    }
    const chapters = getReadChapters(slug)
    console.log('readChapters:', [...chapters]) // Debug
    return chapters
  }, [slug, getReadChapters])

  const isRead = (chapterId: string) => {
    if (!chapterId) {
      console.warn('Invalid chapterId:', chapterId) // Debug
      return false
    }
    return readChapters.has(chapterId)
  }

  useEffect(() => {
    if (slug && chapterId) {
      console.log('Marking as read:', slug, chapterId) // Debug
      markAsRead(slug, chapterId)
    } else {
      console.warn('Invalid slug or chapterId:', slug, chapterId) // Debug
    }
  }, [slug, chapterId, markAsRead])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Cuộn lên đầu trang khi tải chapter mới
  }, [chapterId])

  const allChapters = useMemo(() => {
    if (!truyen?.item?.chapters) return []

    return truyen.item.chapters.flatMap((server: ServerChapterData) =>
      server.server_data.map((chapter: Chapter, idx: number) => ({
        server_name: server.server_name,
        chapterId:
          chapter.chapter_api_data?.split('/').pop() || `chapter-${idx}`,
        chapter_name: chapter.chapter_name,
        chapter_title: chapter.chapter_title || '',
        comic_id: '', // hoặc gán nếu bạn có
        comic_name: truyen.item.name,
        chapter_path: chapter.filename,
        chapter_image: [], // bạn không có hình ảnh ở đây
        image_page: 1,
        image_file: ''
      }))
    )
  }, [truyen, isRead])

  console.log(truyen)
  const currentChapterIndex = useMemo(() => {
    return allChapters.findIndex(
      (chapter: ChapterItem) => chapter.chapterId === chapterId
    )
  }, [allChapters, chapterId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div>Đang tải chapter...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4 text-red-500">
          Lỗi khi tải chapter: {error?.message}
        </p>
        <button
          onClick={() => refetch()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    )
  }

  if (!chapterContent?.item) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Không tìm thấy nội dung chapter</p>
      </div>
    )
  }

  const { domain_cdn, item } = chapterContent

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapter = allChapters[currentChapterIndex - 1]
      navigate(`/truyen/${slug}/${prevChapter.chapterId}`)
    }
  }

  const goToNextChapter = () => {
    if (currentChapterIndex < allChapters.length - 1) {
      const nextChapter = allChapters[currentChapterIndex + 1]
      navigate(`/truyen/${slug}/${nextChapter.chapterId}`)
    }
  }

  const hasPreviousChapter = currentChapterIndex > 0
  const hasNextChapter = currentChapterIndex < allChapters.length - 1

  const currentChapterInfo = allChapters[currentChapterIndex]

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="mb-6 flex gap-2 text-gray-500">
        <Link to="/" className="text-gray-600">
          Trang chủ
        </Link>
        <Link to={`/truyen/${slug}`} className="text-gray-600">
          / {item.comic_name}
        </Link>
      </div>
      <div className="top-0 z-10 w-full max-w-screen-md rounded-lg bg-white p-4 shadow-md">
        <h1 className="text-md mb-4 text-center">
          {item.comic_name} - Chương{' '}
          {currentChapterInfo?.chapter_name || item.chapter_name}
        </h1>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPreviousChapter}
            disabled={!hasPreviousChapter}
            className={`w-28 rounded-lg px-4 py-2 font-medium ${
              hasPreviousChapter
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            ←
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
          >
            Chương
          </button>
          {Modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div onClick={(e) => e.stopPropagation()}>
                <ListChapComponent
                  closeModal={() => setOpenModal(false)}
                  slug={slug}
                  chuong={truyen.item.chapters}
                />
              </div>
            </div>
          )}
          <button
            onClick={goToNextChapter}
            disabled={!hasNextChapter}
            className={`w-28 rounded-lg px-4 py-2 font-medium ${
              hasNextChapter
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            →
          </button>
        </div>
        {allChapters.length > 0 && (
          <div className="mt-2 text-center text-sm text-gray-600">
            Chapter {currentChapterIndex + 1} / {allChapters.length}
          </div>
        )}
      </div>
      <div className="flex w-full max-w-screen-md flex-col">
        {item.chapter_image.map((img: ChapterImage) => (
          <img
            key={img.image_page}
            src={`${domain_cdn}/${item.chapter_path}/${img.image_file}`}
            alt={`Trang ${img.image_page}`}
            className="w-full object-contain"
            loading="lazy"
          />
        ))}
      </div>
      <div className="sticky bottom-0 w-full max-w-screen-md rounded-lg bg-white p-4 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPreviousChapter}
            disabled={!hasPreviousChapter}
            className={`w-28 rounded-lg px-4 py-2 font-medium ${
              hasPreviousChapter
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            ←
          </button>
          <span className="text-md font-medium text-gray-600">
            Chương {currentChapterInfo?.chapter_name || item.chapter_name}
          </span>
          <button
            onClick={goToNextChapter}
            disabled={!hasNextChapter}
            className={`w-28 rounded-lg px-4 py-2 font-medium ${
              hasNextChapter
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReadComic
