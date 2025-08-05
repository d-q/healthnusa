export default function EmployeeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="employee-layout">
        <div className="bg-green-100 p-2 text-center text-sm text-green-800">
          Employee Layout Active
        </div>
        {children}
      </div>
    )
  }