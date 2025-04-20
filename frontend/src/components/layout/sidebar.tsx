"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ArrowRightLeft,
  PieChart,
  Receipt,
  PiggyBank,
  BanknoteIcon,
  Settings,
  Menu,
  X,
  LogOut,
  FileText,
  Calculator,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout, getCurrentUser } from "@/services/authService"

interface SidebarProps {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setUserRole(user.role)
    }
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    onLogout()
  }

  // Define navigation items based on user role
  let navItems = []
  
  if (userRole === "loanDistributor") {
    // Only show relevant items for loan distributors
    navItems = [
      { href: "/loan-distributor", label: "Loan Applications", icon: FileText },
      { href: "/loan-distributor/tax-calculator", label: "Tax Calculator", icon: Calculator },
      { href: "/loan-distributor/notifications", label: "Notifications", icon: Bell },
      { href: "/settings", label: "Settings", icon: Settings },
    ]
  } else {
    // Regular user navigation items
    navItems = [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
      { href: "/budget", label: "Budget", icon: PieChart },
      { href: "/bills", label: "Bills", icon: Receipt },
      { href: "/savings", label: "Savings", icon: PiggyBank },
      { href: "/loans", label: "Loans", icon: BanknoteIcon },
      { href: "/settings", label: "Settings", icon: Settings },
    ]
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-navy border-r border-emerald/20 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-emerald/20">
            <h2 className="text-2xl font-bold text-emerald">FinWise</h2>
            <p className="text-off-white/70 text-sm">Financial Budget Tracker</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                    isActive ? "bg-emerald text-navy font-medium" : "text-off-white hover:bg-charcoal",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-emerald/20">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start text-off-white hover:bg-charcoal"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
