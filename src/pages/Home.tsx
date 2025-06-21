import React, { useEffect } from 'react'
import { useTruyen } from '../hooks/useTruyen'
import TruyenCard from '../components/TruyenComponent'
import SliderBanner from 'components/SliderBanner'
import { useSearchParams } from 'react-router-dom'
import { Truyen } from '../utils/type'
import { useTruyenHome } from '../hooks/useTruyenhome'
import PaginationComponent from '../components/PaginationComponent'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const { data, isLoading, error } = useTruyen(page)
  const { data: homeData } = useTruyenHome()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // hoặc 'auto'
  }, [page])

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
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
  const homeTruyenList: Truyen[] = homeData?.items || []

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Trang chủ</h1>
      <SliderBanner items={truyenList} />
      {homeTruyenList.length > 0 && (
        <div className="mb-8 p-4">
          <h2 className="mb-4 text-2xl font-bold">Truyện đề cử</h2>
          <div className="flex w-full snap-x scroll-pl-6 space-x-4 overflow-x-auto">
            {homeTruyenList.map((truyen) => (
              <Link
                to={`/truyen/${truyen.slug}`}
                key={truyen.slug}
                className="mr-4 min-w-40 snap-start md:min-w-80"
              >
                <img
                  src={`https://img.otruyenapi.com/uploads/comics/${truyen.thumb_url}`}
                  alt={truyen.name}
                  className="h-20 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-96"
                />
                <h3 className="text-md mt-2 font-semibold">{truyen.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
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
