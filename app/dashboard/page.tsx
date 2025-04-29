"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardHeader from "@/components/dashboard/header"
import OverviewCards from "@/components/dashboard/overview-cards"
import ChartsSection from "@/components/dashboard/charts-section"
import DetailedAnalytics from "@/components/dashboard/detailed-analytics"
import BookSpotlight from "@/components/dashboard/book-spotlight"
import { motion } from "framer-motion"
import { useDashboard } from "@/context/dashboard-context"

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth()
  const { data } = useDashboard()
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!isAuthenticated && !isLoading) {
      router.push("/")
    }

    // Show content with a delay for animation
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <DashboardHeader />
      {showContent && (
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-8"
        >
          {/* Overview Cards at the top - all 12 cards */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard Overview</h2>
            <OverviewCards />
          </motion.div>

          {/* Book Spotlight */}
          <motion.div variants={itemVariants} className="mt-8">
            <BookSpotlight />
          </motion.div>

          {/* Charts Section and Detailed Analytics in one row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <ChartsSection />
            <DetailedAnalytics />
          </motion.div>
        </motion.main>
      )}
    </div>
  )
}
