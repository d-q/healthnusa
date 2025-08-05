import LoadingSpinner from '../components/LoadingSpinner'

export default function Loading() {
    return (
        <div className="container mx-auto py-8">
            <LoadingSpinner />
            <p className="text-center text-gray-600 mt-4">Memuat halaman...</p>
        </div>
    )
}