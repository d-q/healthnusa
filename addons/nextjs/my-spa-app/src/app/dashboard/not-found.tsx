import Link from 'next/link'

export default function DashboardNotFound() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Dashboard
      </h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-4">
        Halaman Dashboard Tidak Ditemukan
      </h2>
      <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Kembali ke Dashboard
      </Link>
    </div>
  )
}