import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Home
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link href="/dashboard" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p className="text-gray-600">Lihat dashboard aplikasi</p>
        </Link>
        <Link href="/employee" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Employee</h2>
          <p className="text-gray-600">Kelola data karyawan</p>
        </Link>
        <Link href="/about" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-600">Tentang aplikasi ini</p>
        </Link>
      </div>
    </div>
  )
}