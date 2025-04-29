export function generateRandomData(min = 0, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateBookSalesData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return months.map((month) => ({
    month,
    physical: generateRandomData(500, 2000),
    ebook: generateRandomData(300, 1500),
    audiobook: generateRandomData(100, 800),
  }))
}

export function generateRegionalData() {
  return [
    { region: "North America", sales: 3500 },
    { region: "Europe", sales: 2800 },
    { region: "Asia", sales: 2000 },
    { region: "Australia", sales: 1200 },
    { region: "South America", sales: 800 },
    { region: "Africa", sales: 400 },
  ]
}

export function generateArticlesData() {
  // Real article titles from the provided URLs
  const articleTitles = [
    "Evil Web",
    "The Status of Heart in Human Personality",
    "Different States of Heart",
    "Transformation of the Heart",
    "Some Aspects of Diseases",
    "Hypocrisy: The Most Serious Spiritual Disease",
    "Taught as a Component of Evil Web",
    "Moderation: An Analysis",
    "Justice: An Islamic Perspective",
  ]

  return articleTitles.map((title) => ({
    title,
    views: generateRandomData(1000, 10000),
    shares: generateRandomData(50, 500),
    comments: generateRandomData(10, 100),
  }))
}

export function generateCommentsData() {
  const comments = [
    {
      user: "Emily Johnson",
      text: "I absolutely loved your latest book! The character development was outstanding.",
      time: "2 hours ago",
      likes: generateRandomData(5, 50),
    },
    {
      user: "Michael Smith",
      text: "Your writing style is so immersive. I couldn't put the book down!",
      time: "5 hours ago",
      likes: generateRandomData(5, 50),
    },
    {
      user: "Sarah Williams",
      text: "The plot twist in chapter 15 completely caught me off guard. Brilliant!",
      time: "1 day ago",
      likes: generateRandomData(5, 50),
    },
  ]

  return comments
}

export function generateSocialSharesData() {
  return [
    {
      platform: "Facebook",
      shares: generateRandomData(500, 2000),
    },
    {
      platform: "Twitter",
      shares: generateRandomData(300, 1500),
    },
    {
      platform: "Instagram",
      shares: generateRandomData(200, 1000),
    },
    {
      platform: "LinkedIn",
      shares: generateRandomData(100, 500),
    },
  ]
}

export function generateTopSellingBooks() {
  return [
    {
      id: 1,
      title: "Brotherhood",
      cover: "/placeholder.svg?height=300&width=200&text=Brotherhood",
      sales: 6,
      rating: 4.7,
      description: "A profound exploration of brotherhood and community bonds.",
    },
    {
      id: 2,
      title: "Divine Providence",
      cover: "/placeholder.svg?height=300&width=200&text=Divine+Providence",
      sales: 5,
      rating: 4.5,
      description: "An in-depth analysis of divine providence from an Islamic perspective.",
    },
  ]
}

// Create a context to share data across components
export const initialDashboardData = {
  // Overview metrics
  totalVisits: 143,
  booksSold: 11,
  liveVisitors: 39,
  liveVisitorsFrom: "Homepage",
  liveVisitorsTo: "Product Page",
  revenue: 99.12,
  appInstalls: 51,
  visitsChange: 12,
  booksSoldChange: 18,
  revenueChange: 15,
  appInstallsChange: 24,

  // Additional metrics
  readersEngaged: 22,
  fullArticleReaders: 18,
  avgReadingTime: "4 mins",
  articleTitle: "The Heart's Journey",
  pageLoadTime: "1.51s",
  bounceRate: "11%",
  conversionRate: "0.33%",
  avgOrderValue: "$45.88",

  // Book images
  brotherhoodImage: "/placeholder.svg?height=300&width=200&text=Brotherhood",
  divineProvidenceImage: "/placeholder.svg?height=300&width=200&text=Divine+Providence",

  // Chart data
  trafficData: Array.from({ length: 12 }).map((_, i) => ({
    month: `Month ${i + 1}`,
    visits: 15000 + i * 2500 + generateRandomData(-1000, 1000),
    uniqueVisitors: 10000 + i * 1500 + generateRandomData(-800, 800),
  })),
  bookSalesData: generateBookSalesData(),
  regionalData: [
    { region: "North America", sales: 3500 },
    { region: "Europe", sales: 2800 },
    { region: "Asia", sales: 2000 },
    { region: "Australia", sales: 1200 },
    { region: "South America", sales: 800 },
    { region: "Africa", sales: 400 },
  ],
  articlesData: generateArticlesData(),
  commentsData: generateCommentsData(),
  socialSharesData: generateSocialSharesData(),
  topSellingBooks: generateTopSellingBooks(),
}
