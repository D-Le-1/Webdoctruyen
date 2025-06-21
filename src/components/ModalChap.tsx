import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ServerChapterData, Chapter } from '../utils/type'

interface ListChapProps {
  chuong: ServerChapterData[]
  slug?: string
  closeModal?: () => void
}

const ListChapComponent: React.FC<ListChapProps> = ({
  chuong,
  slug,
  closeModal
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [chaptersPerPage] = useState(50) // Giới hạn 50 chương mỗi trang

  const allChapters = useMemo(() => {
    return chuong
      .flatMap((server, serverIdx) =>
        server.server_data.map((chapter: Chapter, idx) => {
          const chapterId =
            chapter.chapter_api_data?.split('/').pop() ||
            `chapter-${serverIdx}-${idx}`
          return {
            chapterId,
            chapterName: chapter.chapter_name || `Chương ${idx + 1}`,
            comicId: chapter.comic_id,
            serverIndex: serverIdx,
            chapterIndex: idx
          }
        })
      )
      .sort((a, b) => {
        // Sắp xếp theo số chương
        const getChapterNumber = (name: string) => {
          const match = name.match(/\d+/)
          return match ? parseInt(match[0]) : 0
        }

        const aNum = getChapterNumber(a.chapterName)
        const bNum = getChapterNumber(b.chapterName)

        return aNum - bNum
      })
  }, [chuong])

  // Tính toán phân trang
  const totalPages = Math.ceil(allChapters.length / chaptersPerPage)
  const startIndex = (currentPage - 1) * chaptersPerPage
  const endIndex = startIndex + chaptersPerPage
  const currentChapters = allChapters.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  if (allChapters.length === 0) {
    return (
      <div className="container w-full bg-white p-3 shadow">
        <h1 className="mb-4 text-lg font-semibold">Danh sách chương</h1>
        <p className="text-gray-500">Chưa có chương nào được cập nhật.</p>
      </div>
    )
  }

  return (
    <div className="container w-full bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Danh sách chương</h1>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {currentChapters.map((chapter, index) => (
          <Link
            key={`${chapter.comicId}-${chapter.chapterId}-${index}`}
            onClick={() => closeModal?.()}
            to={`/truyen/${slug}/${chapter.chapterId}`}
            className="flex items-center justify-center rounded-md border border-green-400 p-2 text-center text-xs transition-colors hover:bg-green-50 hover:underline"
          >
            Chap {chapter.chapterName}
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded bg-gray-300 px-3 py-1 text-sm hover:bg-gray-400 disabled:opacity-50"
          >
            Trước
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`rounded px-2 py-1 text-sm ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="rounded bg-gray-300 px-3 py-1 text-sm hover:bg-gray-400 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}

      <div className="mt-2 text-center text-sm text-gray-500">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  )
}

export default ListChapComponent
