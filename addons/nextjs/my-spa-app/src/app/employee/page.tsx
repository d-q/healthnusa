import Link from 'next/link'

const employees = [
  { id: 1, name: 'John Doe', position: 'Developer' },
  { id: 2, name: 'Jane Smith', position: 'Designer' },
  { id: 3, name: 'Bob Johnson', position: 'Manager' },
]

export default function Employee() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Employee
      </h1>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {employees.map((employee) => (
          <Link
            key={employee.id}
            href={`/employee/${employee.id}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold">{employee.name}</h3>
            <p className="text-gray-600">{employee.position}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}