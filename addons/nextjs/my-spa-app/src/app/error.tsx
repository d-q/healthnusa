'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="container mx-auto py-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                Terjadi Kesalahan!
            </h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
                onClick={reset}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Coba Lagi
            </button>
        </div>
    )
}