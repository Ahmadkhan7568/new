"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Facebook, Twitter, Instagram, Linkedin, Share2 } from "lucide-react"
import { useDashboard } from "@/context/dashboard-context"
import { motion } from "framer-motion"

export default function DetailedAnalytics() {
  const { data, isLoading } = useDashboard()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true)
    }
  }, [isLoading])

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-400" />
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-700" />
      default:
        return <Share2 className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card
      className={cn(
        "neumorphic-card transition-all duration-500 h-full",
        loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
      )}
    >
      <CardHeader>
        <CardTitle>Detailed Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="articles">
          <TabsList className="neumorphic-tabs mb-4">
            <TabsTrigger value="articles">Articles Traffic</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article Title</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loaded
                    ? data.articlesData.map((article, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={cn("transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800")}
                        >
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell className="text-right">{article.views.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{article.shares.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{article.comments.toLocaleString()}</TableCell>
                        </motion.tr>
                      ))
                    : Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full max-w-[250px]"></div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16 ml-auto"></div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12 ml-auto"></div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-10 ml-auto"></div>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-center justify-center p-8 text-gray-500">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin mb-4"></div>
                <p>Comments fetching...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loaded
                ? data.socialSharesData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={cn(
                        "neumorphic-card-inner p-4 rounded-lg",
                        "transition-all duration-300 hover:shadow-md",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="neumorphic-icon-container-sm">{getSocialIcon(item.platform)}</div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">{item.platform}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">
                              {item.shares.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">shares</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="neumorphic-card-inner p-4 rounded-lg animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
