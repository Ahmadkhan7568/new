"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BookOpen, ShoppingCart, MessageSquare, Share2, Star } from "lucide-react"

export default function ActivityFeed() {
  const [loaded, setLoaded] = useState(false)
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setActivities([
        {
          id: 1,
          type: "purchase",
          message: "New purchase of 'The Silent Echo'",
          time: "5 minutes ago",
          icon: ShoppingCart,
        },
        {
          id: 2,
          type: "comment",
          message: "New comment on your latest article",
          time: "27 minutes ago",
          icon: MessageSquare,
        },
        {
          id: 3,
          type: "share",
          message: "Your book was shared on Twitter",
          time: "1 hour ago",
          icon: Share2,
        },
        {
          id: 4,
          type: "review",
          message: "New 5-star review for 'Midnight's Embrace'",
          time: "3 hours ago",
          icon: Star,
        },
        {
          id: 5,
          type: "read",
          message: "100 new readers started your book",
          time: "5 hours ago",
          icon: BookOpen,
        },
      ])
      setLoaded(true)
    }, 1600)

    return () => clearTimeout(timer)
  }, [])

  const getIconColor = (type: string) => {
    switch (type) {
      case "purchase":
        return "text-green-500"
      case "comment":
        return "text-blue-500"
      case "share":
        return "text-purple-500"
      case "review":
        return "text-yellow-500"
      case "read":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card
      className={cn(
        "neumorphic-card transition-all duration-500",
        loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loaded
            ? activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={cn("flex items-start gap-3", "animate-fade-in-up")}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn("neumorphic-icon-container-sm", getIconColor(activity.type))}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-start gap-3 animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
