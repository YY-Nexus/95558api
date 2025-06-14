"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Clock, Wifi } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  connectionType: string
  memoryUsage?: {
    used: number
    total: number
  }
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // 监听网络状态
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // 获取性能指标
    const getPerformanceMetrics = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType("paint")

        const fcp = paint.find((entry) => entry.name === "first-contentful-paint")
        const lcp = performance.getEntriesByType("largest-contentful-paint")[0]

        // 获取内存使用情况（如果支持）
        let memoryUsage
        if ("memory" in performance) {
          const memory = (performance as any).memory
          memoryUsage = {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          }
        }

        // 获取连接类型
        const connection =
          (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
        const connectionType = connection ? connection.effectiveType || connection.type : "unknown"

        setMetrics({
          loadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
          firstContentfulPaint: fcp ? Math.round(fcp.startTime) : 0,
          largestContentfulPaint: lcp ? Math.round(lcp.startTime) : 0,
          cumulativeLayoutShift: 0, // 需要通过PerformanceObserver获取
          firstInputDelay: 0, // 需要通过PerformanceObserver获取
          connectionType,
          memoryUsage,
        })
      }
    }

    // 延迟获取性能指标，确保页面完全加载
    const timer = setTimeout(getPerformanceMetrics, 1000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const getPerformanceScore = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return { score: "good", color: "bg-green-500" }
    if (value <= thresholds.poor) return { score: "needs-improvement", color: "bg-yellow-500" }
    return { score: "poor", color: "bg-red-500" }
  }

  const formatBytes = (bytes: number) => {
    return `${bytes}MB`
  }

  if (!metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            性能监控
          </CardTitle>
          <CardDescription>正在收集性能数据...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const fcpScore = getPerformanceScore(metrics.firstContentfulPaint, { good: 1800, poor: 3000 })
  const lcpScore = getPerformanceScore(metrics.largestContentfulPaint, { good: 2500, poor: 4000 })
  const loadScore = getPerformanceScore(metrics.loadTime, { good: 2000, poor: 4000 })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            性能监控
            <Badge variant={isOnline ? "default" : "destructive"} className="ml-auto">
              <Wifi className="h-3 w-3 mr-1" />
              {isOnline ? "在线" : "离线"}
            </Badge>
          </CardTitle>
          <CardDescription>实时页面性能指标</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 核心性能指标 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">首次内容绘制 (FCP)</span>
                <Badge variant="outline" className={fcpScore.color}>
                  {metrics.firstContentfulPaint}ms
                </Badge>
              </div>
              <Progress value={Math.min((metrics.firstContentfulPaint / 3000) * 100, 100)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">最大内容绘制 (LCP)</span>
                <Badge variant="outline" className={lcpScore.color}>
                  {metrics.largestContentfulPaint}ms
                </Badge>
              </div>
              <Progress value={Math.min((metrics.largestContentfulPaint / 4000) * 100, 100)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">页面加载时间</span>
                <Badge variant="outline" className={loadScore.color}>
                  {metrics.loadTime}ms
                </Badge>
              </div>
              <Progress value={Math.min((metrics.loadTime / 4000) * 100, 100)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">DOM内容加载</span>
                <Badge variant="outline">{metrics.domContentLoaded}ms</Badge>
              </div>
              <Progress value={Math.min((metrics.domContentLoaded / 2000) * 100, 100)} className="h-2" />
            </div>
          </div>

          {/* 系统信息 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                网络类型
              </span>
              <Badge variant="secondary">{metrics.connectionType}</Badge>
            </div>

            {metrics.memoryUsage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    内存使用
                  </span>
                  <Badge variant="secondary">
                    {formatBytes(metrics.memoryUsage.used)} / {formatBytes(metrics.memoryUsage.total)}
                  </Badge>
                </div>
                <Progress value={(metrics.memoryUsage.used / metrics.memoryUsage.total) * 100} className="h-2" />
              </div>
            )}
          </div>

          {/* 性能建议 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              性能建议
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {metrics.firstContentfulPaint > 3000 && <p>• 首次内容绘制时间较长，建议优化关键资源加载</p>}
              {metrics.largestContentfulPaint > 4000 && <p>• 最大内容绘制时间较长，建议优化图片和字体加载</p>}
              {metrics.loadTime > 4000 && <p>• 页面加载时间较长，建议启用缓存和压缩</p>}
              {metrics.memoryUsage && metrics.memoryUsage.used / metrics.memoryUsage.total > 0.8 && (
                <p>• 内存使用率较高，建议优化JavaScript代码</p>
              )}
              {fcpScore.score === "good" && lcpScore.score === "good" && loadScore.score === "good" && (
                <p className="text-green-600">• 页面性能表现良好！</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
