import React from 'react'
import { useTruyen } from '../hooks/useTruyen'
import GridMotion from '../utils/custom/GridMotion'
import { Truyen } from '../utils/type'

interface TruyenResponse {
  items: Truyen[]
}

const SliderBanner: React.FC<TruyenResponse> = ({ items }) => {
  const { data, isLoading, isError } = useTruyen(1) as {
    data: TruyenResponse | undefined
    isLoading: boolean
    isError: boolean
  }

  if (isLoading) {
    return (
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h2 className="text-2xl font-bold text-white">Loading...</h2>
        </div>
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500">Error loading banner</div>
  }

  if (!data || !data.items || data.items.length === 0) {
    return <div className="text-gray-500">No banner data available</div>
  }

  const mappedItems = data.items.map((item) => {
    if (
      item.thumb_url &&
      typeof item.thumb_url === 'string' &&
      item.thumb_url.trim() !== ''
    ) {
      const url = item.thumb_url.startsWith('http')
        ? item.thumb_url
        : `https://img.otruyenapi.com/uploads/comics${
            item.thumb_url.startsWith('/') ? '' : '/'
          }${item.thumb_url}`
      return url
    }
    console.warn('Invalid thumb_url:', item)
    return 'https://via.placeholder.com/150'
  })

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-gray-100 p-4">
      <GridMotion items={mappedItems} />
    </div>
  )
}

export default SliderBanner
