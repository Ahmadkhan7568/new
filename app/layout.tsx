import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardProvider } from "@/context/dashboard-context"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DrMuhammadSalim Analytics Dashboard",
  description: "A comprehensive analytics dashboard for book authors",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <DashboardProvider>{children}</DashboardProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
