'use client'

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        About
      </h1>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error About
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Muat Ulang About
        </button>
      </div>
    </div>
  )
}