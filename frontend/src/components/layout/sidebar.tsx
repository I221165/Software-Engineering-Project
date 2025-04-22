"use client"

import React, { useState, useEffect } from "react"
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
  Shield,
  Activity,
  FileWarning,
  Calendar,
  Wallet,
  Users,
  CreditCard,
  BarChart,
  Briefcase,
  LineChart,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout, getCurrentUser } from "@/services/authService"

interface SidebarProps {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState<string>("")

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
  const navItems = [
    // Regular user navigation items (shown to all users)
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
    { href: "/budget", label: "Budget", icon: PieChart },
    { href: "/bills", label: "Bills", icon: Receipt },
    { href: "/savings", label: "Savings", icon: PiggyBank },
    { href: "/loans", label: "Loans", icon: BanknoteIcon },

    // Admin specific items
    ...(userRole === "admin" ? [
      { href: "/admin", label: "Admin Dashboard", icon: Shield },
      { href: "/admin/roles", label: "User Roles", icon: Users },
      { href: "/admin/performance", label: "System Performance", icon: Activity },
      { href: "/admin/security", label: "Security Logs", icon: FileWarning },
      { href: "/admin/maintenance", label: "Maintenance", icon: Settings }
    ] : []),

    // Bank Manager specific items
    ...(userRole === "bankManager" ? [
      { href: "/client-summaries", label: "Client Summaries", icon: Users },
      { href: "/consultations", label: "Consultations", icon: Calendar }
    ] : []),

    // Loan Distributor specific items
    ...(userRole === "loanDistributor" ? [
      { href: "/loan-distributor", label: "Loan Applications", icon: FileText },
      { href: "/loan-distributor/notifications", label: "Notifications", icon: Bell },
      { href: "/loan-distributor/tax-calculator", label: "Tax Calculator", icon: Calculator }
    ] : []),

    // Financial Advisor specific items
    ...(userRole === "financial_advisor" ? [
      { href: "/advisor", label: "Advisor Dashboard", icon: Briefcase },
      { href: "/advisor/clients", label: "Clients", icon: Users },
      { href: "/advisor/portfolio", label: "Portfolio Analysis", icon: LineChart },
      { href: "/advisor/consultations", label: "Consultations", icon: Calendar },
      { href: "/advisor/reports", label: "Financial Reports", icon: ClipboardList }
    ] : []),

    // Premium user specific items
    ...(userRole === "premium" ? [
      { href: "/premium/dashboard", label: "Premium Dashboard", icon: LayoutDashboard },
      { href: "/premium/portfolio", label: "Portfolio Analysis", icon: PieChart },
      { href: "/premium/investments", label: "Investments", icon: BarChart },
      { href: "/premium/planning", label: "Financial Planning", icon: Calculator },
      { href: "/premium/tax", label: "Tax Optimization", icon: Receipt },
      { href: "/premium/reports", label: "Premium Reports", icon: FileText }
    ] : []),

    // Settings (shown to all users)
    { href: "/settings", label: "Settings", icon: Settings }
  ]

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
