import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTruyenByTheloai } from './../hooks/useTruyenByTheloai'
import TruyenCard from '../components/TruyenComponent'
import PaginationComponent from '../components/PaginationComponent'
import { Truyen } from '../utils/type'

const TheloaiPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState(1)
  const {
    data: theloaiData,
    isLoading,
    isError
  } = useTruyenByTheloai(slug, page)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const truyenList: Truyen[] = theloaiData?.items || []
  const totalItems = theloaiData?.params?.pagination?.totalItems || 0
  const totalItemsPerPage =
    theloaiData?.params?.pagination?.totalItemsPerPage || 24
  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>
  }
  if (isError) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Tổng hợp truyện {theloaiData?.titlePage}
      </h1>

      {truyenList.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {truyenList.map((truyen) => {
            if ('slug' in truyen) {
              return <TruyenCard key={truyen.slug} truyen={truyen} />
            }
          })}
        </div>
      ) : (
        <div>Không có truyện nào.</div>
      )}
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          params={{
            filterCategory: [], // hoặc ['action', 'comedy'] nếu có danh sách lọc
            pagination: {
              currentPage: page,
              pageRanges: 5,
              totalItems,
              totalItemsPerPage
            }
          }}
        />
      )}
    </div>
  )
}

export default TheloaiPage
