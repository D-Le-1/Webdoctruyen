import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li className="text-md font-bold">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="text-md font-bold">
            <Link to="/tim-kiem">Thể loại</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
