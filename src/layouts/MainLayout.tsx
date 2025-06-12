import { Outlet } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto w-full flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
