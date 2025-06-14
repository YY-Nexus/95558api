"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Code, Wrench, Eye, Heart } from "lucide-react"

interface Stats {
  articles: number
  snippets: number
  tools: number
  totalViews: number
  totalLikes: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    snippets: 0,
    tools: 0,
    totalViews: 0,
    totalLikes: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // 模拟API调用
      setTimeout(() => {
        setStats({
          articles: 25,
          snippets: 48,
          tools: 12,
          totalViews: 15420,
          totalLikes: 892,
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("加载统计数据失败:", error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">加载中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">管理后台</h1>
        <p className="text-muted-foreground mt-2">系统概览和内容管理</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">文章总数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.articles}</div>
            <p className="text-xs text-muted-foreground">已发布文章</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">代码片段</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.snippets}</div>
            <p className="text-xs text-muted-foreground">代码示例</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">开发工具</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tools}</div>
            <p className="text-xs text-muted-foreground">推荐工具</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">页面访问</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总点赞数</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes}</div>
            <p className="text-xs text-muted-foreground">用户点赞</p>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
          <CardDescription>常用的管理功能</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild className="h-20 flex-col">
              <a href="/admin/content">
                <FileText className="h-6 w-6 mb-2" />
                内容管理
              </a>
            </Button>

            <Button asChild variant="outline" className="h-20 flex-col">
              <a href="/snippets">
                <Code className="h-6 w-6 mb-2" />
                代码片段
              </a>
            </Button>

            <Button asChild variant="outline" className="h-20 flex-col">
              <a href="/tools">
                <Wrench className="h-6 w-6 mb-2" />
                工具管理
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 系统状态 */}
      <Card>
        <CardHeader>
          <CardTitle>系统状态</CardTitle>
          <CardDescription>当前系统运行状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>API服务</span>
              <Badge variant="default">正常运行</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>数据库连接</span>
              <Badge variant="default">已连接</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>缓存系统</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>最后更新</span>
              <span className="text-sm text-muted-foreground">{new Date().toLocaleString("zh-CN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
