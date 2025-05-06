"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Code,
  Database,
  FileCode,
  Folder,
  Home,
  Layers,
  Map,
  MessageSquare,
  Puzzle,
  Search,
  Settings,
  Terminal,
  PenToolIcon as Tool,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// 导入品牌标识组件
import { BrandLogo } from "./brand-logo"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive?: boolean
}

// 侧边栏项组件 / Sidebar item component
function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  // 按钮点击动画
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    button.classList.add("button-press")
    setTimeout(() => {
      button.classList.remove("button-press")
    }, 200)
  }

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          isActive ? "bg-blue-accent-50 text-blue-accent-700 font-medium" : "text-muted-foreground sidebar-item-3d",
        )}
        onClick={handleButtonClick}
      >
        {icon}
        {label}
      </Button>
    </Link>
  )
}

interface SidebarCategoryProps {
  title: string
  children: React.ReactNode
}

// 修改SidebarCategory组件，使标题更加突出
// Modified SidebarCategory component to make the title more prominent
function SidebarCategory({ title, children }: SidebarCategoryProps) {
  return (
    <div className="space-y-1">
      <h3 className="px-4 py-1 text-xs font-semibold text-blue-accent-600 uppercase tracking-wider bg-blue-accent-50 rounded-md mx-1 card-3d">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen sidebar-3d flex flex-col">
      {/* 顶部标题区域 / Top title area */}
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo showTagline={true} />
        </Link>
      </div>

      {/* 搜索框区域 / Search box area */}
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="搜索..."
            className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring input-3d input-focus-animation"
          />
        </div>
      </div>

      {/* 导航菜单区域 / Navigation menu area */}
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-6">
          <SidebarCategory title="核心功能">
            <SidebarItem icon={<Home className="h-4 w-4" />} label="首页导航" href="/" isActive={pathname === "/"} />
            <SidebarItem
              icon={<Puzzle className="h-4 w-4" />}
              label="API集成"
              href="/api"
              isActive={pathname === "/api"}
            />
            <SidebarItem
              icon={<FileCode className="h-4 w-4" />}
              label="代码片段"
              href="/snippets"
              isActive={pathname === "/snippets"}
            />
            <SidebarItem
              icon={<Tool className="h-4 w-4" />}
              label="开发工具"
              href="/tools"
              isActive={pathname === "/tools"}
            />
          </SidebarCategory>
          <SidebarCategory title="API分类">
            <SidebarItem
              icon={<Layers className="h-4 w-4" />}
              label="认证授权"
              href="/api/auth"
              isActive={pathname === "/api/auth"}
            />
            <SidebarItem
              icon={<Database className="h-4 w-4" />}
              label="数据存储"
              href="/api/storage"
              isActive={pathname === "/api/storage"}
            />
            <SidebarItem
              icon={<MessageSquare className="h-4 w-4" />}
              label="消息通知"
              href="/api/notification"
              isActive={pathname === "/api/notification"}
            />
            <SidebarItem
              icon={<Map className="h-4 w-4" />}
              label="地图位置"
              href="/api/map"
              isActive={pathname === "/api/map"}
            />
          </SidebarCategory>
          <SidebarCategory title="代码分类">
            <SidebarItem
              icon={<Code className="h-4 w-4" />}
              label="JavaScript"
              href="/snippets/javascript"
              isActive={pathname === "/snippets/javascript"}
            />
            <SidebarItem
              icon={<Code className="h-4 w-4" />}
              label="React框架"
              href="/snippets/react"
              isActive={pathname === "/snippets/react"}
            />
            <SidebarItem
              icon={<Code className="h-4 w-4" />}
              label="CSS样式"
              href="/snippets/css"
              isActive={pathname === "/snippets/css"}
            />
            <SidebarItem
              icon={<Code className="h-4 w-4" />}
              label="HTML标记"
              href="/snippets/html"
              isActive={pathname === "/snippets/html"}
            />
          </SidebarCategory>
          <SidebarCategory title="工具箱">
            <SidebarItem
              icon={<Terminal className="h-4 w-4" />}
              label="终端命令"
              href="/tools/terminal"
              isActive={pathname === "/tools/terminal"}
            />
            <SidebarItem
              icon={<Terminal className="h-4 w-4" />}
              label="终端变量"
              href="/tools/terminal/variables"
              isActive={pathname === "/tools/terminal/variables"}
            />
            <SidebarItem
              icon={<Wrench className="h-4 w-4" />}
              label="编辑器"
              href="/tools/vscode"
              isActive={pathname === "/tools/vscode"}
            />
            <SidebarItem
              icon={<Folder className="h-4 w-4" />}
              label="环境配置"
              href="/tools/environment"
              isActive={pathname === "/tools/environment"}
            />
            <SidebarItem
              icon={<BookOpen className="h-4 w-4" />}
              label="术语表"
              href="/tools/glossary"
              isActive={pathname === "/tools/glossary"}
            />
          </SidebarCategory>
          <SidebarCategory title="关于">
            <SidebarItem
              icon={<BookOpen className="h-4 w-4" />}
              label="品牌说明"
              href="/about/brand"
              isActive={pathname === "/about/brand"}
            />
            <SidebarItem
              icon={<Settings className="h-4 w-4" />}
              label="设置"
              href="/settings"
              isActive={pathname === "/settings"}
            />
          </SidebarCategory>
        </div>
      </ScrollArea>

      {/* 底部设置区域 / Bottom settings area */}
      <div className="p-4 border-t mt-auto">
        <SidebarItem
          icon={<Settings className="h-4 w-4" />}
          label="设置"
          href="/settings"
          isActive={pathname === "/settings"}
        />
      </div>
    </div>
  )
}
