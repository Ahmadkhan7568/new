"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

export default function UserPermissions() {
  const [loaded, setLoaded] = useState(false)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setUsers([
        { id: 1, name: "Sarah Johnson", role: "Editor", access: true },
        { id: 2, name: "Michael Chen", role: "Viewer", access: true },
        { id: 3, name: "Alex Rodriguez", role: "Contributor", access: false },
      ])
      setLoaded(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const toggleAccess = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, access: !user.access } : user)))
  }

  return (
    <Card
      className={cn(
        "neumorphic-card transition-all duration-500",
        loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle>User Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loaded ? (
            <>
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    "neumorphic-card-inner",
                    "transition-all duration-300",
                    "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <Switch
                    checked={user.access}
                    onCheckedChange={() => toggleAccess(user.id)}
                    className="neumorphic-switch"
                  />
                </div>
              ))}
              <Button className="w-full mt-4 neumorphic-button group" variant="outline">
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
                Invite New Member
              </Button>
            </>
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-1"></div>
                  </div>
                </div>
                <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
