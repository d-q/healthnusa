export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Home
        </h1>
        <div className="mt-8 text-center">
          <nav className="space-x-4">
            <a href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </a>
            <a href="/employee" className="text-blue-600 hover:underline">
              Employee
            </a>
            <a href="/about" className="text-blue-600 hover:underline">
              About
            </a>
          </nav>
        </div>
      </div>
    </main>
  )
}