import LoadingSpinner from '../../components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Employee
      </h1>
      <LoadingSpinner />
      <p className="text-center text-gray-600 mt-4">Memuat data employee...</p>
    </div>
  )
}