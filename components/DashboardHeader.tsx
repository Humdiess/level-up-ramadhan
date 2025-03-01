"use client"

import { MoonStar, Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <MoonStar className="h-8 w-8 text-[hsl(var(--ramadan-gold))]" />
              <span className="ml-2 text-xl font-bold text-[hsl(var(--ramadan-blue))]">Level Up Ramadhan</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/stats">Statistik</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/rewards">Rewards</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/stats"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Statistik
            </Link>
            <Link
              href="/dashboard/rewards"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rewards
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

