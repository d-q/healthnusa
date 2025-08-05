const employees = [
    { id: 1, name: 'John Doe', position: 'Developer', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', position: 'Designer', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', position: 'Manager', email: 'bob@example.com' },
  ]
  
  export default function EmployeeDetail({ params }: { params: { id: string } }) {
    const employee = employees.find(emp => emp.id === parseInt(params.id))
  
    if (!employee) {
      return (
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">Employee tidak ditemukan</h1>
        </div>
      )
    }
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Employee Detail
        </h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">{employee.name}</h2>
          <p className="text-gray-600 mb-2">Position: {employee.position}</p>
          <p className="text-gray-600 mb-4">Email: {employee.email}</p>
          <p className="text-gray-600">ID: {employee.id}</p>
        </div>
      </div>
    )
  }