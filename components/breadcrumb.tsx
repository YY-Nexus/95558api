"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { navPathMap } from "@/data/navigation-data"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") {
    return null
  }

  // 将路径分割成段
  const segments = pathname.split("/").filter(Boolean)

  // 生成面包屑项
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`

    // 从导航映射中获取友好名称，如果没有则使用格式化的路径段
    const displayName =
      navPathMap[href] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    return {
      href,
      label: displayName,
    }
  })

  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      <ol className="flex items-center">
        <li>
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">首页</span>
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="mx-1 h-4 w-4" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
