import type { Metadata } from "next"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard/header"
import UpdateForm from "@/components/update/update-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Update Dashboard Data",
  description: "Update your dashboard data",
}

export default function UpdateDataPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/"
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-soft text-gray-600 dark:text-gray-300 transition-all duration-200 hover:shadow-soft-lg hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Update Dashboard Data</h1>
        </div>
        <UpdateForm />
      </main>
    </div>
  )
}
