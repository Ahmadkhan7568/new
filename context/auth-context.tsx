"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserRole = "admin" | "user"

type User = {
  name: string
  email: string
  avatar?: string
  role: UserRole
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define our users
const USERS = [
  {
    email: "admin@admin.com",
    password: "Admin@123",
    name: "Admin User",
    avatar: "/placeholder.svg?height=200&width=200&text=AU",
    role: "admin" as UserRole,
  },
  {
    email: "salim@salim.com",
    password: "salim",
    name: "Dr. Muhammad Salim",
    avatar: "/placeholder.svg?height=200&width=200&text=MS",
    role: "user" as UserRole,
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in (from localStorage in a real app)
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Find user with matching credentials
      const foundUser = USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      // Create user data without the password
      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar,
        role: foundUser.role,
      }

      setUser(userData)
      setIsAuthenticated(true)

      // Save to localStorage (in a real app, you'd store a token)
      localStorage.setItem("user", JSON.stringify(userData))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    router.push("/")
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
