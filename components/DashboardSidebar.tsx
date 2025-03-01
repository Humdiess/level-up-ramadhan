"use client"

import { Home, BarChart2, Award, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Statistik", href: "/dashboard/stats", icon: BarChart2 },
  { name: "Rewards", href: "/dashboard/rewards", icon: Award },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 bg-white border-r p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-[hsl(var(--ramadan-green)/10%)] text-[hsl(var(--ramadan-green))]"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <item.icon
                className={cn("mr-3 h-5 w-5", isActive ? "text-[hsl(var(--ramadan-green))]" : "text-gray-400")}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

