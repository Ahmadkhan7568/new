"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDashboard } from "@/context/dashboard-context"
import { motion } from "framer-motion"

export default function BookSpotlight() {
  const { data, isLoading } = useDashboard()
  const [loaded, setLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true)
    }
  }, [isLoading])

  const scrollToBook = (index: number) => {
    if (carouselRef.current && index >= 0 && index < data.topSellingBooks.length) {
      setActiveIndex(index)
      const scrollAmount = index * (carouselRef.current.offsetWidth / 3)
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const nextBook = () => {
    scrollToBook((activeIndex + 1) % data.topSellingBooks.length)
  }

  const prevBook = () => {
    scrollToBook((activeIndex - 1 + data.topSellingBooks.length) % data.topSellingBooks.length)
  }

  return (
    <Card
      className={cn(
        "neumorphic-card mt-8 transition-all duration-500",
        loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle>Top Selling Books Spotlight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {loaded ? (
            <>
              <div ref={carouselRef} className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
                {data.topSellingBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={cn(
                      "min-w-[33.333%] px-2 snap-start",
                      "transition-all duration-500",
                      activeIndex === index ? "opacity-100 scale-100" : "opacity-70 scale-95",
                    )}
                  >
                    <div
                      className={cn(
                        "neumorphic-card-inner rounded-lg p-4 h-full",
                        "transition-all duration-300 hover:shadow-lg",
                        "group cursor-pointer",
                      )}
                      onClick={() => scrollToBook(index)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative mb-4 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                          <img
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            className="h-40 w-auto object-cover rounded-md shadow-lg"
                          />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-white text-center">{book.title}</h3>
                        <div className="mt-2 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {book.sales.toLocaleString()} copies sold
                          </span>
                          <span className="mx-2">•</span>
                          <span className="text-sm font-medium text-yellow-500">★ {book.rating}</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-2">
                          {book.description}
                        </p>
                        <Button variant="outline" className="mt-4 w-full neumorphic-button">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Button variant="outline" size="icon" className="neumorphic-button-circle" onClick={prevBook}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <div className="flex space-x-1">
                  {data.topSellingBooks.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        activeIndex === index ? "bg-blue-500 w-4" : "bg-gray-300 dark:bg-gray-600",
                      )}
                      onClick={() => scrollToBook(index)}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" className="neumorphic-button-circle" onClick={nextBook}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex overflow-x-auto pb-4 hide-scrollbar">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="min-w-[33.333%] px-2">
                  <div className="rounded-lg p-4 h-full animate-pulse">
                    <div className="flex flex-col items-center">
                      <div className="h-40 w-28 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
