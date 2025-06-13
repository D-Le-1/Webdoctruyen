import GooeyNav from '../utils/custom/GooayNav'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Tìm kiếm', href: '/tim-kiem' },
  { label: 'Yêu thích', href: '/yeu-thich' }
]

export default function Header() {
  return (
    <header className="w-full bg-gray-800 p-4 text-white">
      <div style={{ position: 'relative' }}>
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
    </header>
  )
}
