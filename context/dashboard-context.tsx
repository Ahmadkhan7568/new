"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { initialDashboardData } from "@/lib/data-utils"

type DashboardContextType = {
  data: typeof initialDashboardData
  updateData: (newData: Partial<typeof initialDashboardData>) => void
  resetData: () => void
  isLoading: boolean
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<typeof initialDashboardData>(() => {
    // Check if we have saved data in localStorage
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("dashboardData")
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          return parsedData
        } catch (error) {
          console.error("Failed to parse saved dashboard data:", error)
          return initialDashboardData
        }
      }
    }
    return initialDashboardData
  })

  const [isLoading, setIsLoading] = useState(true)
  const initialLoadComplete = useRef(false)

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Deep merge function to properly merge nested objects
  const deepMerge = (target: any, source: any) => {
    const output = { ...target }

    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] })
          } else {
            output[key] = deepMerge(target[key], source[key])
          }
        } else if (Array.isArray(source[key])) {
          // For arrays, replace the entire array
          output[key] = [...source[key]]
        } else {
          Object.assign(output, { [key]: source[key] })
        }
      })
    }

    return output
  }

  // Helper function to check if value is an object
  const isObject = (item: any) => {
    return item && typeof item === "object" && !Array.isArray(item)
  }

  const updateData = (newData: Partial<typeof initialDashboardData>) => {
    setData((prevData) => {
      // Use deep merge to properly handle nested objects
      const updatedData = deepMerge(prevData, newData)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("dashboardData", JSON.stringify(updatedData))
      }

      return updatedData
    })
  }

  const resetData = () => {
    setData(initialDashboardData)
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardData", JSON.stringify(initialDashboardData))
    }
  }

  return (
    <DashboardContext.Provider value={{ data, updateData, resetData, isLoading }}>{children}</DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
