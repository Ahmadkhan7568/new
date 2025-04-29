"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart3,
  BookOpen,
  FileText,
  Save,
  RotateCcw,
  ArrowLeft,
  Eye,
  Smartphone,
  Zap,
  Globe,
  MessageSquare,
} from "lucide-react"
import { useDashboard } from "@/context/dashboard-context"
import { useRouter } from "next/navigation"

export default function UpdateForm() {
  const router = useRouter()
  const { data, updateData, resetData } = useDashboard()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Basic metrics
    totalVisits: data.totalVisits,
    booksSold: data.booksSold,
    liveVisitors: data.liveVisitors,
    liveVisitorsFrom: data.liveVisitorsFrom || "Homepage",
    liveVisitorsTo: data.liveVisitorsTo || "Product Page",
    revenue: data.revenue,
    appInstalls: data.appInstalls,

    // Change percentages
    visitsChange: data.visitsChange,
    booksSoldChange: data.booksSoldChange,
    revenueChange: data.revenueChange,
    appInstallsChange: data.appInstallsChange,

    // Reader metrics
    readersEngaged: data.readersEngaged || 22,
    fullArticleReaders: data.fullArticleReaders || 18,
    avgReadingTime: data.avgReadingTime || "4 mins",

    // Articles data (editable titles, views, comments)
    articles: data.articlesData
      ? data.articlesData.map((article) => ({
          ...article,
          comments: article.comments || 0,
          shares: article.shares || 0,
        }))
      : [],

    // Performance metrics
    pageLoadTime: data.pageLoadTime || "1.51s",
    bounceRate: data.bounceRate || "11%",
    conversionRate: data.conversionRate || "0.33%",
    avgOrderValue: data.avgOrderValue || "$45.88",

    // Book images
    brotherhoodImage: data.brotherhoodImage || "/placeholder.svg?height=300&width=200&text=Brotherhood",
    divineProvidenceImage: data.divineProvidenceImage || "/placeholder.svg?height=300&width=200&text=Divine+Providence",

    // Regional data (simplified for form)
    northAmericaSales: data.regionalData?.[0]?.sales || 3500,
    europeSales: data.regionalData?.[1]?.sales || 2800,
    asiaSales: data.regionalData?.[2]?.sales || 2000,
    australiaSales: data.regionalData?.[3]?.sales || 1200,
    southAmericaSales: data.regionalData?.[4]?.sales || 800,
    africaSales: data.regionalData?.[5]?.sales || 400,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }))
  }

  const handleArticleChange = (index: number, field: string, value: string | number) => {
    setFormData((prev) => {
      const updatedArticles = [...prev.articles]
      updatedArticles[index] = {
        ...updatedArticles[index],
        [field]: value,
      }
      return {
        ...prev,
        articles: updatedArticles,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare updated regional data
    const updatedRegionalData = [
      { region: "North America", sales: formData.northAmericaSales },
      { region: "Europe", sales: formData.europeSales },
      { region: "Asia", sales: formData.asiaSales },
      { region: "Australia", sales: formData.australiaSales },
      { region: "South America", sales: formData.southAmericaSales },
      { region: "Africa", sales: formData.africaSales },
    ]

    // Update the dashboard data
    updateData({
      // Basic metrics
      totalVisits: formData.totalVisits,
      booksSold: formData.booksSold,
      liveVisitors: formData.liveVisitors,
      liveVisitorsFrom: formData.liveVisitorsFrom,
      liveVisitorsTo: formData.liveVisitorsTo,
      revenue: formData.revenue,
      appInstalls: formData.appInstalls,

      // Change percentages
      visitsChange: formData.visitsChange,
      booksSoldChange: formData.booksSoldChange,
      revenueChange: formData.revenueChange,
      appInstallsChange: formData.appInstallsChange,

      // Reader metrics
      readersEngaged: formData.readersEngaged,
      fullArticleReaders: formData.fullArticleReaders,
      avgReadingTime: formData.avgReadingTime,

      // Articles data
      articlesData: formData.articles,

      // Performance metrics
      pageLoadTime: formData.pageLoadTime,
      bounceRate: formData.bounceRate,
      conversionRate: formData.conversionRate,
      avgOrderValue: formData.avgOrderValue,

      // Book images
      brotherhoodImage: formData.brotherhoodImage,
      divineProvidenceImage: formData.divineProvidenceImage,

      // Updated regional data
      regionalData: updatedRegionalData,

      // Keep other data unchanged
      trafficData: data.trafficData,
      bookSalesData: data.bookSalesData,
      commentsData: data.commentsData,
      socialSharesData: data.socialSharesData,
      topSellingBooks: [
        {
          ...data.topSellingBooks[0],
          cover: formData.brotherhoodImage,
        },
        {
          ...data.topSellingBooks[1],
          cover: formData.divineProvidenceImage,
        },
      ],
    })

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleReset = () => {
    resetData()
    router.push("/dashboard")
  }

  const handlePreview = () => {
    // Prepare updated regional data
    const updatedRegionalData = [
      { region: "North America", sales: formData.northAmericaSales },
      { region: "Europe", sales: formData.europeSales },
      { region: "Asia", sales: formData.asiaSales },
      { region: "Australia", sales: formData.australiaSales },
      { region: "South America", sales: formData.southAmericaSales },
      { region: "Africa", sales: formData.africaSales },
    ]

    // Temporarily update data for preview
    updateData({
      // Basic metrics
      totalVisits: formData.totalVisits,
      booksSold: formData.booksSold,
      liveVisitors: formData.liveVisitors,
      liveVisitorsFrom: formData.liveVisitorsFrom,
      liveVisitorsTo: formData.liveVisitorsTo,
      revenue: formData.revenue,
      appInstalls: formData.appInstalls,

      // Change percentages
      visitsChange: formData.visitsChange,
      booksSoldChange: formData.booksSoldChange,
      revenueChange: formData.revenueChange,
      appInstallsChange: formData.appInstallsChange,

      // Reader metrics
      readersEngaged: formData.readersEngaged,
      fullArticleReaders: formData.fullArticleReaders,
      avgReadingTime: formData.avgReadingTime,

      // Articles data
      articlesData: formData.articles,

      // Performance metrics
      pageLoadTime: formData.pageLoadTime,
      bounceRate: formData.bounceRate,
      conversionRate: formData.conversionRate,
      avgOrderValue: formData.avgOrderValue,

      // Book images
      brotherhoodImage: formData.brotherhoodImage,
      divineProvidenceImage: formData.divineProvidenceImage,

      // Updated regional data
      regionalData: updatedRegionalData,
    })

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="neumorphic-card">
        <CardContent className="p-6">
          <Tabs defaultValue="website" className="w-full">
            <TabsList className="neumorphic-tabs mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Website Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Book Sales</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Mobile App</span>
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Articles</span>
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Comments</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="regions" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Regional Data</span>
              </TabsTrigger>
              <TabsTrigger value="bookImages" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Book Images</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="website" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="overview" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Overview Metrics</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="totalVisits">Website Traffic (Page views)</Label>
                          <Input
                            id="totalVisits"
                            name="totalVisits"
                            type="number"
                            value={formData.totalVisits}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="visitsChange">Percentage Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="visitsChange"
                              name="visitsChange"
                              type="number"
                              value={formData.visitsChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="liveVisitors">Real-Time Visitors</Label>
                          <Input
                            id="liveVisitors"
                            name="liveVisitors"
                            type="number"
                            value={formData.liveVisitors}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="liveVisitorsFrom">Visitors From</Label>
                          <Input
                            id="liveVisitorsFrom"
                            name="liveVisitorsFrom"
                            value={formData.liveVisitorsFrom}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="liveVisitorsTo">Visitors To</Label>
                          <Input
                            id="liveVisitorsTo"
                            name="liveVisitorsTo"
                            value={formData.liveVisitorsTo}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="books" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sales" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Book Sales Data</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="booksSold">Total Books Sold</Label>
                          <Input
                            id="booksSold"
                            name="booksSold"
                            type="number"
                            value={formData.booksSold}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="booksSoldChange">Percentage Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="booksSoldChange"
                              name="booksSoldChange"
                              type="number"
                              value={formData.booksSoldChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="revenue">Total Earnings</Label>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input
                              id="revenue"
                              name="revenue"
                              type="number"
                              value={formData.revenue}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="revenueChange">Revenue Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="revenueChange"
                              name="revenueChange"
                              type="number"
                              value={formData.revenueChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avgOrderValue">Average Order Value</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="avgOrderValue"
                              name="avgOrderValue"
                              value={formData.avgOrderValue}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="app" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Mobile App Data</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="appInstalls">Mobile App Installs</Label>
                          <Input
                            id="appInstalls"
                            name="appInstalls"
                            type="number"
                            value={formData.appInstalls}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appInstallsChange">Percentage Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="appInstallsChange"
                              name="appInstallsChange"
                              type="number"
                              value={formData.appInstallsChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="articles" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="articles-list" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Article Metrics</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="readersEngaged">Readers Engaged</Label>
                            <Input
                              id="readersEngaged"
                              name="readersEngaged"
                              type="number"
                              value={formData.readersEngaged}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fullArticleReaders">Full Article Readers</Label>
                            <Input
                              id="fullArticleReaders"
                              name="fullArticleReaders"
                              type="number"
                              value={formData.fullArticleReaders}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="avgReadingTime">Average Reading Time</Label>
                            <Input
                              id="avgReadingTime"
                              name="avgReadingTime"
                              value={formData.avgReadingTime}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Article Titles</h3>
                        <div className="space-y-4">
                          {formData.articles.map((article, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 border rounded-md">
                              <div className="md:col-span-1">
                                <Label htmlFor={`article-title-${index}`}>Title</Label>
                                <Input
                                  id={`article-title-${index}`}
                                  value={article.title}
                                  onChange={(e) => handleArticleChange(index, "title", e.target.value)}
                                  className="neumorphic-input mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`article-views-${index}`}>Views</Label>
                                <Input
                                  id={`article-views-${index}`}
                                  type="number"
                                  value={article.views}
                                  onChange={(e) => handleArticleChange(index, "views", Number(e.target.value))}
                                  className="neumorphic-input mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`article-shares-${index}`}>Shares</Label>
                                <Input
                                  id={`article-shares-${index}`}
                                  type="number"
                                  value={article.shares}
                                  onChange={(e) => handleArticleChange(index, "shares", Number(e.target.value))}
                                  className="neumorphic-input mt-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="comments" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="comments-list" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Comments Management</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Article Comments</h3>
                        <div className="space-y-4">
                          {formData.articles.map((article, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 border rounded-md">
                              <div>
                                <Label>Article Title</Label>
                                <p className="mt-1 font-medium">{article.title}</p>
                              </div>
                              <div>
                                <Label htmlFor={`article-comments-${index}`}>Comments</Label>
                                <Input
                                  id={`article-comments-${index}`}
                                  type="number"
                                  value={article.comments}
                                  onChange={(e) => handleArticleChange(index, "comments", Number(e.target.value))}
                                  className="neumorphic-input mt-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="performance-metrics" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Performance Metrics</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="pageLoadTime">Page Load Time</Label>
                          <Input
                            id="pageLoadTime"
                            name="pageLoadTime"
                            value={formData.pageLoadTime}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bounceRate">Bounce Rate</Label>
                          <Input
                            id="bounceRate"
                            name="bounceRate"
                            value={formData.bounceRate}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="conversionRate">Conversion Rate</Label>
                          <Input
                            id="conversionRate"
                            name="conversionRate"
                            value={formData.conversionRate}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="regions" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible defaultValue="regions" className="w-full">
                <AccordionItem value="regions" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Book Sales by Region</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="northAmericaSales">North America Sales</Label>
                          <Input
                            id="northAmericaSales"
                            name="northAmericaSales"
                            type="number"
                            value={formData.northAmericaSales}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="europeSales">Europe Sales</Label>
                          <Input
                            id="europeSales"
                            name="europeSales"
                            type="number"
                            value={formData.europeSales}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="asiaSales">Asia Sales</Label>
                          <Input
                            id="asiaSales"
                            name="asiaSales"
                            type="number"
                            value={formData.asiaSales}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="australiaSales">Australia Sales</Label>
                          <Input
                            id="australiaSales"
                            name="australiaSales"
                            type="number"
                            value={formData.australiaSales}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="southAmericaSales">South America Sales</Label>
                          <Input
                            id="southAmericaSales"
                            name="southAmericaSales"
                            type="number"
                            value={formData.southAmericaSales}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="africaSales">Africa Sales</Label>
                          <Input
                            id="africaSales"
                            name="africaSales"
                            type="number"
                            value={formData.africaSales}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="bookImages" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="book-images" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Book Cover Images</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="brotherhoodImage">Brotherhood Cover Image URL</Label>
                          <Input
                            id="brotherhoodImage"
                            name="brotherhoodImage"
                            value={formData.brotherhoodImage}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                          {formData.brotherhoodImage && (
                            <div className="mt-2 flex justify-center">
                              <img
                                src={formData.brotherhoodImage || "/placeholder.svg"}
                                alt="Brotherhood Cover"
                                className="h-40 w-auto object-cover rounded-md shadow-lg"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="divineProvidenceImage">Divine Providence Cover Image URL</Label>
                          <Input
                            id="divineProvidenceImage"
                            name="divineProvidenceImage"
                            value={formData.divineProvidenceImage}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                          {formData.divineProvidenceImage && (
                            <div className="mt-2 flex justify-center">
                              <img
                                src={formData.divineProvidenceImage || "/placeholder.svg"}
                                alt="Divine Providence Cover"
                                className="h-40 w-auto object-cover rounded-md shadow-lg"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              className="neumorphic-button w-full sm:w-auto flex items-center gap-2"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="neumorphic-button w-full sm:w-auto flex items-center gap-2"
                onClick={handlePreview}
              >
                <Eye className="h-4 w-4" />
                Preview Changes
              </Button>

              <Button
                type="button"
                variant="outline"
                className="neumorphic-button w-full sm:w-auto flex items-center gap-2"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <Button
                type="submit"
                className="neumorphic-button-primary w-full sm:w-auto flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {showSuccess && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-center animate-fade-in">
              Changes saved successfully!
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}
