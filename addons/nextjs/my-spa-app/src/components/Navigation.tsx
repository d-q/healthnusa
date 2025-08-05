'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/employee', label: 'Employee' },
        { href: '/about', label: 'About' }
    ]

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto">
                <div className="flex space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3 py-2 rounded transition-colors ${pathname === item.href
                                    ? 'bg-blue-800 text-white'
                                    : 'hover:bg-blue-700'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}