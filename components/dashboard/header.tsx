"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, LogOut, Moon, Search, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [searchFocused, setSearchFocused] = useState(false)
  const pathname = usePathname()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20and%20Grey%20Copywriter%20Personal%20Logo-EsHhEczy5fkMUX1Oke7OgUb45rtu1m.png"
                alt="Dr Muhammad Salim Logo"
                className="h-10"
              />
            </Link>
            <div className={cn("relative transition-all duration-300 max-w-md ml-8", searchFocused ? "w-80" : "w-64")}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 h-9 bg-gray-100 dark:bg-gray-800 border-0 neumorphic-input transition-all duration-300"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Only show Update Data button for admin users */}
            {isAdmin && (
              <Link
                href={pathname.includes("/update-data") ? "/dashboard" : "/dashboard/update-data"}
                className={cn(
                  "neumorphic-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  "hover:shadow-lg hover:scale-105 active:scale-95",
                )}
              >
                {pathname.includes("/update-data") ? "Dashboard" : "Update Data"}
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="neumorphic-button-circle relative"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="neumorphic-button-circle relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="neumorphic-button-circle overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-gray-500">{user?.email}</DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-gray-500">
                  Role: {user?.role === "admin" ? "Administrator" : "User"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
