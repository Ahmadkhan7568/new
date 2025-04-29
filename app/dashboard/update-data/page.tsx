"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import DashboardHeader from "@/components/dashboard/header"
import UpdateForm from "@/components/update/update-form"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function UpdateDataPage() {
  const { isAuthenticated, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!isAuthenticated && !isLoading) {
      router.push("/")
    }

    // If authenticated but not admin, redirect to dashboard
    if (isAuthenticated && !isLoading && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, isAdmin, router])

  if (isLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <DashboardHeader />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-soft text-gray-600 dark:text-gray-300 transition-all duration-200 hover:shadow-soft-lg hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Update Dashboard Data</h1>
        </div>
        <UpdateForm />
      </motion.main>
    </div>
  )
}
