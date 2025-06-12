import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChapterListProps } from '../utils/type'
import { useReadStore } from '../utils/store/useReadStore'

type Chapter = {
  chapter_name: string
  chapter_title?: string
  chapter_api_data: string
  filename: string
  server_name: string
  isRead?: boolean
}

const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  perPage = 10,
  slug,
  maxVisiblePages = 5
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const getReadChapters = useReadStore((state) => state.getReadChapters)

  const allChapters: Chapter[] = useMemo(() => {
    console.log('useMemo running for allChapters') // Debug
    if (!slug) {
      console.warn('Slug is missing') // Debug
      return []
    }
    return chapters.flatMap((server) =>
      server.server_data.map((chap, idx) => {
        const chapterId =
          chap.chapter_api_data.split('/').pop() || `chapter-${idx}`
        console.log(
          'chapter_api_data:',
          chap.chapter_api_data,
          'chapterId:',
          chapterId
        ) // Debug
        return {
          ...chap,
          server_name: server.server_name,
          isRead: getReadChapters(slug).has(chapterId)
        }
      })
    )
  }, [chapters, slug, getReadChapters])

  const totalPages = Math.ceil(allChapters.length / perPage)

  const currentChapters = allChapters.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - half)
    const end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">Chapters</h2>

      {currentChapters.length === 0 ? (
        <p>Không có chương nào.</p>
      ) : (
        <div className="grid gap-2">
          {currentChapters.map((chapter, idx) => {
            const chapterId =
              chapter.chapter_api_data.split('/').pop() || `chapter-${idx}`
            return (
              <div
                key={chapterId || idx}
                className="rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">
                      Chapter {chapter.chapter_name}
                    </span>
                    {chapter.chapter_title && (
                      <span className="ml-2 text-gray-600">
                        - {chapter.chapter_title}
                      </span>
                    )}
                    <div className="text-sm text-gray-500">
                      {chapter.server_name}
                    </div>
                  </div>
                  {chapter.isRead && (
                    <span className="ml-2 text-sm font-semibold text-green-600">
                      ✓ Đã đọc
                    </span>
                  )}
                  <Link
                    to={`/truyen/${slug}/${chapterId}`}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Read →
                  </Link>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {chapter.filename}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅ Trước
          </button>

          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300"
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`rounded px-3 py-2 text-sm ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300 disabled:opacity-50"
          >
            Sau ➡
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-2 text-center text-sm text-gray-600">
          Trang {currentPage} / {totalPages}
        </div>
      )}
    </div>
  )
}

export default ChapterList
