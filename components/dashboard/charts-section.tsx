"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useDashboard } from "@/context/dashboard-context"

export default function ChartsSection() {
  const { data, isLoading } = useDashboard()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true)
    }
  }, [isLoading])

  // Ensure regionalData exists and has items
  const regionalData =
    Array.isArray(data.regionalData) && data.regionalData.length > 0
      ? data.regionalData
      : [
          { region: "North America", sales: 3500 },
          { region: "Europe", sales: 2800 },
          { region: "Asia", sales: 2000 },
          { region: "Australia", sales: 1200 },
          { region: "South America", sales: 800 },
          { region: "Africa", sales: 400 },
        ]

  return (
    <Card
      className={cn(
        "neumorphic-card transition-all duration-500 h-full",
        loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle>Book Sales by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {loaded ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionalData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} sales`, "Sales"]}
                  contentStyle={{
                    borderRadius: "10px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
