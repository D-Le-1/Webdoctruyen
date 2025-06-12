import React, { useState } from 'react'
import { useTruyen } from '../hooks/useTruyen'
import TruyenCard from '../components/TruyenComponent'
import SliderBanner from 'components/SliderBanner'
import { Truyen, Chapter } from '../utils/type'
import PaginationComponent from '../components/PaginationComponent'

const Home: React.FC = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useTruyen(page)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">Đang tải...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-red-500">Lỗi: {error.message}</div>
        </div>
      </div>
    )
  }

  const truyenList: Truyen[] = data?.items || []
  const totalItems = data?.params?.pagination?.totalItems || 0
  const totalItemsPerPage = data?.params?.pagination?.totalItemsPerPage || 24
  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  return (
    <div className="container mx-auto space-x-5 p-4">
      <SliderBanner items={truyenList} />
      <h1 className="mb-4 text-2xl font-bold">Truyện đang phát hành</h1>

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
              currentPage: 1,
              pageRanges: 5,
              totalItems: 100,
              totalItemsPerPage: 20
            }
          }}
        />
      )}
    </div>
  )
}

export default Home
