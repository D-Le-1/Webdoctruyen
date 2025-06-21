import { Link, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useTruyendetail } from '../hooks/useTruyenDetail'
import ChapterList from '../components/ChapterListComponent'
import { Chapter } from '../utils/type'
import { useReadTruyenStore } from '../utils/store/useReadStore'

const ComicDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, error } = useTruyendetail(slug!)
  const addTruyen = useReadTruyenStore((state) => state.addTruyen)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Hoặc 'auto'
  }, [])

  useEffect(() => {
    if (data?.item) {
      const item = data.item
      addTruyen({
        id: item.id,
        name: item.name,
        slug: item.slug,
        title: item.title || item.name, // dùng name nếu không có title riêng
        status: item.status || 'Đang cập nhật',
        chaptersLatest: item.chaptersLatest || [], // hoặc truyền mảng chương nếu có
        thumb_url: `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}` // nếu vẫn muốn dùng
      })
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">Error: {error.message}</div>
    )
  }

  // Sửa lại logic kiểm tra data - kiểm tra data.data.item thay vì data.items
  if (!data.item) {
    return <div className="p-4 text-center">No comic data found</div>
  }

  const comic = data.item // Sửa từ data?.item thành data.data.item
  const breadCrumb = data.breadCrumb || [] // Sửa từ breadcrumb thành breadCrumb
  const fullImageUrl = `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center gap-2 text-gray-500">
        <Link to="/" className="text-gray-600">
          Trang chủ
        </Link>
        <Link to={`/truyen/${comic.slug}`} className="text-gray-600">
          / {comic.name}
        </Link>
      </div>
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <img
            src={fullImageUrl}
            alt={comic.name}
            className="mx-auto w-full max-w-sm rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg'
            }}
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            {comic.name}
          </h1>

          {comic.origin_name && comic.origin_name[0] && (
            <p className="mb-2 text-lg text-gray-600">
              <span className="font-semibold">Original Name:</span>{' '}
              {comic.origin_name[0]}
            </p>
          )}

          <div className="mb-4">
            <span className="font-semibold">Status:</span>
            <span
              className={`ml-2 rounded px-2 py-1 text-sm ${
                comic.status === 'ongoing'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {comic.status === 'ongoing' ? 'Ongoing' : comic.status}
            </span>
          </div>

          {comic.author && comic.author.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Author:</span>
              <span className="ml-2">{comic.author.join(', ')}</span>
            </div>
          )}

          {comic.category && comic.category.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Genres:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {comic.category.map((genre: { id: string; name: string }) => (
                  <span
                    key={genre.id}
                    className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {comic.content && (
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Description</h2>
          <div
            className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: comic.content }}
          />
        </div>
      )}

      {/* Chapter List */}
      {slug && <ChapterList chapters={comic.chapters} slug={slug} />}

      {/* Breadcrumb */}
      {breadCrumb && breadCrumb.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-4">
          <nav className="text-sm text-gray-600">
            <span>Categories: </span>
            {breadCrumb
              .filter(
                (item: Chapter) =>
                  !item.isCurrent &&
                  item.chapter_name !== 'Mắt Thần Huyền Thoại'
              )
              .map((item: Chapter, index: number, array: Chapter[]) => (
                <span key={index}>
                  {item.chapter_name}
                  {index < array.length - 1 && ' • '}
                </span>
              ))}
          </nav>
        </div>
      )}
    </div>
  )
}

export default ComicDetail
