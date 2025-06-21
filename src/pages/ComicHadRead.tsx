import { useReadTruyenStore } from '../utils/store/useReadStore'
import { Link } from 'react-router-dom'

const TruyenDaDoc = () => {
  const readTruyen = useReadTruyenStore((state) => state.readTruyen)

  console.log('TruyenDaDoc readTruyen:', readTruyen) // Debug

  if (readTruyen.length === 0) return <p>Chưa có truyện đã đọc.</p>

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Truyện đã đọc</h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {readTruyen.map((truyen) => (
          <li key={truyen.id} className="border p-2">
            <Link to={`/truyen/${truyen.slug}`}>
              <img src={truyen.thumb_url} alt={truyen.name} className="mb-2" />
              <p className="font-semibold text-blue-500">{truyen.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TruyenDaDoc
