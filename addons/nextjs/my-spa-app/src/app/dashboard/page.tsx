export default function Dashboard() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">$12,345</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Orders</h3>
                    <p className="text-3xl font-bold text-purple-600">567</p>
                </div>
            </div>
        </div>
    )
}