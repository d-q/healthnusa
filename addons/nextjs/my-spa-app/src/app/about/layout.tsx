export default function AboutLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="about-layout">
        <div className="bg-purple-100 p-2 text-center text-sm text-purple-800">
          About Layout Active
        </div>
        {children}
      </div>
    )
  }