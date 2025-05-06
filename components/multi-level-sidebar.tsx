"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DynamicIcon } from "./dynamic-icon"
import { type NavItem, mainCategories } from "@/data/navigation-data"

interface NavItemProps {
  item: NavItem
  depth?: number
  pathname: string
  onNavigate?: () => void
}

function NavItemComponent({ item, depth = 0, pathname, onNavigate }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href && pathname === item.href

  // 检查当前路径是否匹配子项或是子项的子路径
  const isActiveOrHasActiveChild = item.href && pathname.startsWith(item.href)

  // 检查是否有活跃的子项
  const hasActiveChild = item.children?.some(
    (child) =>
      (child.href && pathname.startsWith(child.href)) ||
      child.children?.some((grandchild) => grandchild.href && pathname.startsWith(grandchild.href)),
  )

  // 如果有活跃的子项，默认展开
  useEffect(() => {
    if (hasActiveChild || isActiveOrHasActiveChild) {
      setIsOpen(true)
    }
  }, [pathname, hasActiveChild, isActiveOrHasActiveChild])

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    } else if (item.href && onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className={cn("flex flex-col", depth > 0 && "ml-4")}>
      <div
        className={cn(
          "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer",
          isActiveOrHasActiveChild ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
          depth === 0 && "font-medium",
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {item.icon && <DynamicIcon name={item.icon} className={isActiveOrHasActiveChild ? "text-primary" : ""} />}
          {item.href ? (
            <Link href={item.href} className="flex-1" onClick={onNavigate}>
              {item.title}
            </Link>
          ) : (
            <span className="flex-1">{item.title}</span>
          )}
        </div>
        {hasChildren && (
          <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {isOpen && hasChildren && (
        <div className="mt-1">
          {item.children?.map((child, index) => (
            <NavItemComponent key={index} item={child} depth={depth + 1} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

export function MultiLevelSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(mainCategories)

  // 当搜索查询变化时过滤导航项
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(mainCategories)
      return
    }

    const query = searchQuery.toLowerCase()

    // 递归搜索导航项
    const searchNavItems = (items: NavItem[]): NavItem[] => {
      return items
        .map((item) => {
          // 检查当前项是否匹配
          const titleMatch = item.title.toLowerCase().includes(query)

          // 如果有子项，递归搜索
          let matchedChildren: NavItem[] = []
          if (item.children && item.children.length > 0) {
            matchedChildren = searchNavItems(item.children)
          }

          // 如果当前项匹配或有匹配的子项，返回项
          if (titleMatch) {
            return { ...item }
          } else if (matchedChildren.length > 0) {
            return { ...item, children: matchedChildren }
          }

          return null
        })
        .filter((item): item is NavItem => item !== null)
    }

    const filtered = searchNavItems(mainCategories)
    setFilteredCategories(filtered)
  }, [searchQuery])

  return (
    <div className={cn("flex h-full flex-col border-r bg-background", className)}>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {filteredCategories.map((category, index) => (
            <NavItemComponent key={index} item={category} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
        {filteredCategories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">没有找到匹配的结果</div>
        )}
      </ScrollArea>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  const handleNavigate = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px]">
        <MultiLevelSidebar onNavigate={handleNavigate} />
      </SheetContent>
    </Sheet>
  )
}
