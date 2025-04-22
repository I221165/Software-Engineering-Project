"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/customer/dashboard",
    icon: "📊",
  },
  {
    title: "Accounts",
    href: "/customer/accounts",
    icon: "💰",
  },
  {
    title: "Transactions",
    href: "/customer/transactions",
    icon: "💳",
  },
  {
    title: "Profile",
    href: "/customer/profile",
    icon: "👤",
  },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Customer Portal</h1>
        </div>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              )}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
} 