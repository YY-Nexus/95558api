"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { BrandLogoShort } from "./brand-logo"
import { Breadcrumb } from "./breadcrumb"
import { EnhancedSearch } from "./enhanced-search"

export function TopNav() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 监听滚动事件，用于导航栏滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // 主导航链接
  const navLinks = [
    { href: "/api", label: "API集成" },
    { href: "/snippets", label: "代码片段" },
    { href: "/tools", label: "开发工具" },
  ]

  // 检查路径是否活跃
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  // 按钮点击动画
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    button.classList.add("button-press")
    setTimeout(() => {
      button.classList.remove("button-press")
    }, 200)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "nav-3d" : "border-b bg-white dark:bg-background"
      }`}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden nav-button-3d" onClick={handleButtonClick}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 sidebar-3d">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <BrandLogoShort className="hidden sm:flex" />
            </Link>

            {/* 搜索框 - 桌面版 */}
            <div className="relative w-full max-w-md hidden md:block">
              <EnhancedSearch placeholder="搜索API、代码片段、开发文档..." />
            </div>

            {/* 搜索框 - 移动版 */}
            <div
              className={`absolute inset-0 bg-white dark:bg-background z-50 p-3 flex items-center ${searchOpen ? "flex" : "hidden"} md:hidden`}
            >
              <EnhancedSearch placeholder="搜索..." autoFocus={searchOpen} />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 nav-button-3d"
                onClick={(e) => {
                  handleButtonClick(e as React.MouseEvent<HTMLButtonElement>)
                  setSearchOpen(false)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* 移动版搜索按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden nav-button-3d"
              onClick={(e) => {
                handleButtonClick(e as React.MouseEvent<HTMLButtonElement>)
                setSearchOpen(true)
              }}
            >
              <span className="sr-only">搜索</span>
            </Button>
          </div>

          <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  size="sm"
                  className={`w-24 justify-center hidden md:flex ${
                    isActive(link.href) ? "" : "nav-button-3d menu-item-hover"
                  }`}
                  onClick={handleButtonClick}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/settings">
              <Button
                variant={isActive("/settings") ? "default" : "ghost"}
                size="sm"
                className={`w-16 justify-center hidden md:flex ${
                  isActive("/settings") ? "" : "nav-button-3d menu-item-hover"
                }`}
                onClick={handleButtonClick}
              >
                设置
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      {/* 面包屑导航 */}
      <div className="container py-2 hidden md:block">
        <Breadcrumb />
      </div>
    </header>
  )
}
