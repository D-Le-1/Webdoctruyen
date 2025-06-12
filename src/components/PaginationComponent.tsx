import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  params: {
    filterCategory: string[]
    pagination: {
      currentPage: number
      pageRanges: number
      totalItems: number
      totalItemsPerPage: number
    }
  }
  onPageChange: (page: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5 // Số trang hiển thị tối đa

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    const endPage = Math.min(totalPages, startPage + showPages - 1)

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-md px-3 py-2 ${
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        ‹ Trước
      </button>

      {/* First page */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="rounded-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-2 ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="rounded-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-md px-3 py-2 ${
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Sau ›
      </button>
    </div>
  )
}

export default PaginationComponent
