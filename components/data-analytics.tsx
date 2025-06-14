"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Download,
  Filter,
} from "lucide-react"

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{ path: string; views: number; change: number }>
  deviceTypes: Array<{ type: string; percentage: number; count: number }>
  trafficSources: Array<{ source: string; percentage: number; visitors: number }>
  userBehavior: Array<{ action: string; count: number; percentage: number }>
}

export function DataAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(true)

  // 初始化分析数据
  useEffect(() => {
    const loadAnalyticsData = () => {
      setIsLoading(true)

      // 模拟API调用延迟
      setTimeout(() => {
        setAnalyticsData({
          pageViews: 45678,
          uniqueVisitors: 12345,
          bounceRate: 34.5,
          avgSessionDuration: 245,
          topPages: [
            { path: "/", views: 15234, change: 12.5 },
            { path: "/api", views: 8765, change: -3.2 },
            { path: "/snippets", views: 6543, change: 8.7 },
            { path: "/tools", views: 4321, change: 15.3 },
            { path: "/community", views: 3456, change: 22.1 },
          ],
          deviceTypes: [
            { type: "Desktop", percentage: 65.4, count: 8070 },
            { type: "Mobile", percentage: 28.3, count: 3494 },
            { type: "Tablet", percentage: 6.3, count: 778 },
          ],
          trafficSources: [
            { source: "Direct", percentage: 42.1, visitors: 5198 },
            { source: "Search", percentage: 31.5, visitors: 3889 },
            { source: "Social", percentage: 16.8, visitors: 2074 },
            { source: "Referral", percentage: 9.6, visitors: 1185 },
          ],
          userBehavior: [
            { action: "页面浏览", count: 45678, percentage: 100 },
            { action: "搜索使用", count: 8234, percentage: 18.0 },
            { action: "代码复制", count: 6789, percentage: 14.9 },
            { action: "收藏内容", count: 3456, percentage: 7.6 },
            { action: "分享内容", count: 1234, percentage: 2.7 },
          ],
        })
        setIsLoading(false)
      }, 1000)
    }

    loadAnalyticsData()
  }, [timeRange])

  // 获取设备图标
  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  // 导出报告
  const exportReport = () => {
    const reportData = {
      timeRange,
      generatedAt: new Date().toISOString(),
      data: analyticsData,
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-report-${timeRange}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading || !analyticsData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                数据分析中心
              </CardTitle>
              <CardDescription>深度分析用户行为、流量来源和内容表现</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">今天</SelectItem>
                  <SelectItem value="7d">过去7天</SelectItem>
                  <SelectItem value="30d">过去30天</SelectItem>
                  <SelectItem value="90d">过去90天</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                导出报告
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.pageViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">页面浏览量</div>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-muted-foreground">vs 上期</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{analyticsData.uniqueVisitors.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">独立访客</div>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+8.3%</span>
              <span className="text-muted-foreground">vs 上期</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{analyticsData.bounceRate}%</div>
                <div className="text-sm text-muted-foreground">跳出率</div>
              </div>
              <MousePointer className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
              <span className="text-red-600">-2.1%</span>
              <span className="text-muted-foreground">vs 上期</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.floor(analyticsData.avgSessionDuration / 60)}:
                  {(analyticsData.avgSessionDuration % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-muted-foreground">平均会话时长</div>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+15.7%</span>
              <span className="text-muted-foreground">vs 上期</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细分析 */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="pages" className="w-full">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="pages">页面分析</TabsTrigger>
              <TabsTrigger value="devices">设备分析</TabsTrigger>
              <TabsTrigger value="traffic">流量来源</TabsTrigger>
              <TabsTrigger value="behavior">用户行为</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="pages" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">热门页面</h3>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    筛选
                  </Button>
                </div>
                <div className="space-y-3">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{page.path}</div>
                        <div className="text-sm text-muted-foreground">{page.views.toLocaleString()} 次浏览</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {page.change > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                            )}
                            <span className={page.change > 0 ? "text-green-600" : "text-red-600"}>
                              {Math.abs(page.change)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(page.views / Math.max(...analyticsData.topPages.map((p) => p.views))) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="devices" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">设备类型分布</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analyticsData.deviceTypes.map((device, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(device.type)}
                            <span className="font-medium">{device.type}</span>
                          </div>
                          <Badge variant="outline">{device.percentage}%</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>访客数量</span>
                            <span>{device.count.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${device.percentage}%` }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="traffic" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">流量来源分析</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {analyticsData.trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{source.source}</div>
                            <div className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} 访客</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{source.percentage}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${source.percentage}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      {/* 这里可以添加饼图组件 */}
                      <div className="absolute inset-0 rounded-full border-8 border-blue-200"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">100%</div>
                          <div className="text-sm text-muted-foreground">总流量</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="behavior" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">用户行为分析</h3>
                </div>
                <div className="space-y-3">
                  {analyticsData.userBehavior.map((behavior, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{behavior.action}</div>
                        <div className="text-sm text-muted-foreground">{behavior.count.toLocaleString()} 次操作</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{behavior.percentage}%</Badge>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${behavior.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
