import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { BottomNav } from "./bottom-nav"
import { Breadcrumb } from "./breadcrumb"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* 侧边栏 - 桌面版 */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <TopNav />

        {/* 移动端面包屑 */}
        <div className="container py-2 md:hidden">
          <Breadcrumb />
        </div>

        {/* 主内容 */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">{children}</main>

        {/* 底部导航 - 移动版 */}
        <BottomNav />
      </div>
    </div>
  )
}
