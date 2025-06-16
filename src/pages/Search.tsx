import React, { useState } from 'react'
import { useTheloai } from '../hooks/useTheloai'
import { useSearch } from '../hooks/useSearch'
import { Link } from 'react-router-dom'
import TruyenCard from '../components/TruyenComponent'
import { Theloai, Truyen } from '../utils/type'

const Search = () => {
  const { data: theloaiData, isLoading, isError } = useTheloai()
  const [keyword, setKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { data: searchData } = useSearch(searchTerm)

  console.log('Search data:', searchData)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTerm(keyword.trim())
  }

  console.log('Theloai data:', theloaiData)
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>
  }
  if (isError) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Trang tìm kiếm</h1>
      <p className="mb-4">Bạn có thể tìm kiếm theo tên truyện hoặc thể loại.</p>
      <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          className="w-full border border-gray-300 p-2"
        />
        <button
          type="submit"
          className="w-40 rounded-md border border-emerald-300 bg-gray-100 p-2"
        >
          Tìm kiếm
        </button>
      </form>
      {searchTerm && (
        <>
          <p className="mb-2 mt-6 text-xl font-bold">
            Kết quả tìm kiếm cho:{' '}
            <span className="text-blue-600">{searchTerm}</span>
          </p>
          {searchData?.items?.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {searchData.items.map((truyen: Truyen) => {
                if (truyen.chaptersLatest != null && 'slug' in truyen) {
                  return <TruyenCard key={truyen.slug} truyen={truyen} />
                }
                return null
              })}
            </ul>
          ) : (
            <p>Không tìm thấy truyện phù hợp.</p>
          )}
        </>
      )}
      <p className="mb-4 text-xl font-bold">Danh sách thể loại:</p>
      <ul className="grid grid-cols-2 gap-2">
        {theloaiData?.items.map((item: Theloai) => (
          <li key={item._id} className="mb-2">
            <Link to={`/the-loai/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
