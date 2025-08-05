export default function About() {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About
        </h1>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Tentang Aplikasi</h2>
          <p className="text-gray-600 mb-4">
            Ini adalah Single Page Application yang dibuat dengan Next.js menggunakan App Router.
          </p>
          <h3 className="text-xl font-semibold mb-2">Fitur:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>TypeScript untuk type safety</li>
            <li>Tailwind CSS untuk styling</li>
            <li>App Router dengan semua routing files</li>
            <li>Client-side navigation</li>
            <li>Error boundaries</li>
            <li>Loading states</li>
            <li>Dynamic routes</li>
          </ul>
        </div>
      </div>
    )
  }