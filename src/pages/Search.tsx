import React from 'react'
import { useTheloai } from '../hooks/useTheloai'
import { Link } from 'react-router-dom'
import { Theloai } from '../utils/type'

const Search = () => {
  const { data: theloaiData, isLoading, isError } = useTheloai()
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
      <div className="mb-4 flex items-center gap-2">
        <input type="text" className="w-full border border-gray-300 p-2" />
        <button className="w-40 rounded-md border border-emerald-300 bg-gray-100 p-2">
          Tìm kiếm
        </button>
      </div>
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
