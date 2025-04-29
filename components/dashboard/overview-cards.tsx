"use client"

import { useState, useEffect } from "react"
import {
  Book,
  DollarSign,
  Globe,
  Users,
  Smartphone,
  Clock,
  BookOpen,
  Zap,
  ArrowUpRight,
  ShoppingCart,
  CreditCard,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CountUp from "react-countup"
import { useDashboard } from "@/context/dashboard-context"
import { motion } from "framer-motion"

export default function OverviewCards() {
  const { data, isLoading } = useDashboard()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true)
    }
  }, [isLoading])

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500"
    if (change < 0) return "text-red-500"
    return "text-gray-500"
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  // Calculate total comments
  const totalComments = data.articlesData
    ? data.articlesData.reduce((sum, article) => sum + (article.comments || 0), 0)
    : 0

  // Define all the cards with their data
  const cards = [
    // Row 1
    {
      title: "Total Books Sold",
      subtitle: "Across all platforms",
      value: data.booksSold || 0,
      icon: <Book className="h-6 w-6 text-purple-500" />,
      change: data.booksSoldChange || 0,
      borderColor: "border-yellow-300",
      delay: 0,
    },
    {
      title: "Total Earnings",
      subtitle: "From book sales",
      value: data.revenue || 0,
      prefix: "$",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      change: data.revenueChange || 0,
      borderColor: "border-pink-300",
      delay: 1,
    },
    {
      title: "Website Traffic",
      subtitle: "Page views this month",
      value: data.totalVisits || 0,
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      change: data.visitsChange || 0,
      borderColor: "border-indigo-300",
      delay: 2,
    },
    {
      title: "Mobile App Installs",
      subtitle: "New installs this month",
      value: data.appInstalls || 0,
      icon: <Smartphone className="h-6 w-6 text-indigo-500" />,
      change: data.appInstallsChange || 0,
      borderColor: "border-orange-300",
      delay: 3,
    },
    // Row 2
    {
      title: "Real-Time Traffic",
      subtitle:
        data.liveVisitorsFrom && data.liveVisitorsTo
          ? `From ${data.liveVisitorsFrom} to ${data.liveVisitorsTo}`
          : "Current visitors on site",
      value: data.liveVisitors || 0,
      icon: <Users className="h-6 w-6 text-green-500" />,
      showPulse: true,
      borderColor: "border-teal-300",
      delay: 4,
    },
    {
      title: "Readers Engaged",
      subtitle: "Total readers on articles",
      value: data.readersEngaged || 22,
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
      borderColor: "border-yellow-300",
      delay: 5,
    },
    {
      title: "Total Comments",
      subtitle: "Comments across all articles",
      value: totalComments,
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      borderColor: "border-blue-300",
      delay: 6,
    },
    {
      title: "Avg. Reading Time",
      subtitle: "Average time spent reading",
      value: data.avgReadingTime || "4 mins",
      isText: true,
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      borderColor: "border-indigo-300",
      delay: 7,
    },
    // Row 3
    {
      title: "Page Load Time",
      subtitle: "Average time to load a page",
      value: data.pageLoadTime || "1.51s",
      isText: true,
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      borderColor: "border-yellow-300",
      delay: 8,
    },
    {
      title: "Bounce Rate",
      subtitle: "Percentage of single-page visits",
      value: data.bounceRate || "11%",
      isText: true,
      icon: <ArrowUpRight className="h-6 w-6 text-teal-500" />,
      borderColor: "border-teal-300",
      delay: 9,
    },
    {
      title: "Conversion Rate",
      subtitle: "Percentage of visitors who make a purchase",
      value: data.conversionRate || "0.33%",
      isText: true,
      icon: <ShoppingCart className="h-6 w-6 text-amber-500" />,
      borderColor: "border-yellow-300",
      delay: 10,
    },
    {
      title: "Average Order Value",
      subtitle: "Average value of each order",
      value: data.avgOrderValue || "$45.88",
      isText: true,
      icon: <CreditCard className="h-6 w-6 text-pink-500" />,
      borderColor: "border-pink-300",
      delay: 11,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          custom={card.delay}
          variants={cardVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
        >
          <Card className={cn("neumorphic-card overflow-hidden border-l-4", card.borderColor)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.subtitle}</p>
                  <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white flex items-center">
                    {loaded ? (
                      <>
                        {card.isText ? (
                          card.value
                        ) : (
                          <>
                            {card.prefix && card.prefix}
                            <CountUp end={card.value} duration={2} separator="," />
                            {card.showPulse && (
                              <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    )}
                  </h3>
                  {card.change !== undefined && loaded && (
                    <p className={cn("text-sm mt-1 flex items-center", getChangeColor(card.change))}>
                      {card.change > 0 ? "+" : ""}
                      {card.change}%
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                    </p>
                  )}
                </div>
                <div className="neumorphic-icon-container">{card.icon}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
