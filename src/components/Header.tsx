import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full bg-gray-800 p-4 text-white">
      <nav className="flex gap-4">
        <Link to="/">Trang chủ</Link>
        <Link to="/tim-kiem">Tìm kiếm</Link>
        <Link to="/yeu-thich">Yêu thích</Link>
        <Link to="/dang-nhap">Đăng nhập</Link>
      </nav>
    </header>
  )
}
