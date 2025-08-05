import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="container mx-auto py-8 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
            <p className="text-gray-600 mb-4">Halaman tidak ditemukan</p>
            <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Kembali ke Home
            </Link>
        </div>
    )
}