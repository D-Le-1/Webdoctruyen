import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import ComicDetail from '../pages/ComicDetail'
import Search from '../pages/Search'
import Login from '../pages/Login'
import ReadComic from '../pages/ReadComic'
import TheloaiPage from '../pages/Theloai'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'truyen/:slug', element: <ComicDetail /> },
      { path: 'truyen/:slug/:chapterId', element: <ReadComic /> },
      { path: 'tim-kiem', element: <Search /> },
      { path: 'the-loai/:slug', element: <TheloaiPage /> }
    ]
  },
  {
    path: '/dang-nhap',
    element: <Login />
  }
])

export default router
