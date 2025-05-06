import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/main-layout"
import { SearchProvider } from "@/contexts/search-context"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "启智云枢³ - IntelliCloudHub³",
  description: "智联万物丨枢启未来 - Connect Intelligence, Hub the Future",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <Suspense>
              <MainLayout>{children}</MainLayout>
            </Suspense>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
