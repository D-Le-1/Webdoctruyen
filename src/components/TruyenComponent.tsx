import React from 'react'
import { Link } from 'react-router-dom'
import { Truyen } from '../utils/type'

// Kiểu dữ liệu cho props của component
interface TruyenCardProps {
  truyen: Truyen
}

const TruyenCard: React.FC<TruyenCardProps> = ({ truyen }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <img
          src={`https://img.otruyenapi.com/uploads/comics/${truyen.thumb_url}`}
          alt={truyen.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-96 md:w-80"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Content Container */}
      <div className="p-4 pb-16">
        <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-orange-600">
          {truyen.name}
        </h2>
        {truyen.chaptersLatest && truyen.chaptersLatest[0] && (
          <p className="mb-4 line-clamp-3 text-sm text-gray-600">
            Chapter {truyen.chaptersLatest[0].chapter_name}
          </p>
        )}
      </div>

      {/* Button */}
      <Link
        to={`/truyen/${truyen.slug}`}
        className="absolute inset-x-3 bottom-3"
      >
        <button className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Đọc truyện
        </button>
      </Link>
    </div>
  )
}

export default TruyenCard
