export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="dashboard-layout">
            <div className="bg-blue-100 p-2 text-center text-sm text-blue-800">
                Dashboard Layout Active
            </div>
            {children}
        </div>
    )
}