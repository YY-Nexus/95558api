"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, PieChart } from "lucide-react"

interface SystemMetric {
  name: string
  value: number
  unit: string
  change: number
  status: "healthy" | "warning" | "critical"
  history: number[]
}

interface SystemAlert {
  id: string
  type: "info" | "warning" | "error"
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

export function SystemDashboard() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 初始化系统指标
  useEffect(() => {
    const initializeMetrics = () => {
      setMetrics([
        {
          name: "CPU使用率",
          value: 45.2,
          unit: "%",
          change: -2.1,
          status: "healthy",
          history: [42, 44, 46, 43, 45, 47, 45],
        },
        {
          name: "内存使用率",
          value: 68.7,
          unit: "%",
          change: 1.3,
          status: "warning",
          history: [65, 66, 67, 68, 69, 68, 69],
        },
        {
          name: "磁盘使用率",
          value: 34.1,
          unit: "%",
          change: 0.8,
          status: "healthy",
          history: [32, 33, 34, 33, 34, 35, 34],
        },
        {
          name: "网络吞吐量",
          value: 156.8,
          unit: "MB/s",
          change: 12.4,
          status: "healthy",
          history: [140, 145, 150, 155, 160, 158, 157],
        },
        {
          name: "活跃用户",
          value: 1247,
          unit: "人",
          change: 89,
          status: "healthy",
          history: [1100, 1150, 1200, 1220, 1240, 1250, 1247],
        },
        {
          name: "API响应时间",
          value: 89.3,
          unit: "ms",
          change: -5.2,
          status: "healthy",
          history: [95, 92, 90, 88, 87, 89, 89],
        },
        {
          name: "错误率",
          value: 0.12,
          unit: "%",
          change: -0.03,
          status: "healthy",
          history: [0.15, 0.14, 0.13, 0.12, 0.11, 0.12, 0.12],
        },
        {
          name: "数据库连接",
          value: 78,
          unit: "个",
          change: 5,
          status: "warning",
          history: [70, 72, 75, 76, 78, 80, 78],
        },
      ])

      setAlerts([
        {
          id: "1",
          type: "warning",
          title: "内存使用率偏高",
          message: "系统内存使用率达到68.7%，建议检查内存泄漏",
          timestamp: "2024-01-15 14:30:25",
          resolved: false,
        },
        {
          id: "2",
          type: "info",
          title: "系统更新完成",
          message: "安全补丁已成功安装，系统重启完成",
          timestamp: "2024-01-15 13:45:12",
          resolved: true,
        },
        {
          id: "3",
          type: "warning",
          title: "数据库连接数增加",
          message: "数据库连接数达到78个，接近连接池上限",
          timestamp: "2024-01-15 12:20:08",
          resolved: false,
        },
        {
          id: "4",
          type: "error",
          title: "API限流触发",
          message: "用户API调用频率过高，触发限流机制",
          timestamp: "2024-01-15 11:15:33",
          resolved: true,
        },
      ])

      setIsLoading(false)
    }

    initializeMetrics()

    // 模拟实时数据更新
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 2,
          history: [...metric.history.slice(1), metric.value + (Math.random() - 0.5) * 2],
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  // 获取变化趋势图标
  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-3 w-3 text-green-500" />
    } else if (change < 0) {
      return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
    }
    return <div className="h-3 w-3" />
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 系统概览 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                系统监控面板
              </CardTitle>
              <CardDescription>实时监控系统运行状态和关键性能指标</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-muted-foreground">实时监控中</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
                {getStatusIcon(metric.status)}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value.toFixed(metric.name === "错误率" ? 2 : 1)}
                </div>
                <div className="text-sm text-muted-foreground">{metric.unit}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  {getTrendIcon(metric.change)}
                  <span className={metric.change > 0 ? "text-green-600" : "text-red-600"}>
                    {Math.abs(metric.change).toFixed(1)}
                    {metric.unit}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">vs 上小时</div>
              </div>
              {/* 迷你图表 */}
              <div className="mt-3 h-8 flex items-end justify-between gap-1">
                {metric.history.map((value, i) => (
                  <div
                    key={i}
                    className="bg-primary/20 rounded-t"
                    style={{
                      height: `${(value / Math.max(...metric.history)) * 100}%`,
                      width: `${100 / metric.history.length}%`,
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 详细分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 系统健康度 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              系统健康度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                <div className="text-sm text-muted-foreground">整体健康度</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">正常运行</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-16 h-2" />
                    <span className="text-sm text-green-600">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">需要关注</span>
                  <div className="flex items-center gap-2">
                    <Progress value={12} className="w-16 h-2" />
                    <span className="text-sm text-yellow-600">12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">严重问题</span>
                  <div className="flex items-center gap-2">
                    <Progress value={3} className="w-16 h-2" />
                    <span className="text-sm text-red-600">3%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 资源使用情况 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              资源使用情况
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU</span>
                  <span>45.2%</span>
                </div>
                <Progress value={45.2} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>内存</span>
                  <span>68.7%</span>
                </div>
                <Progress value={68.7} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>磁盘</span>
                  <span>34.1%</span>
                </div>
                <Progress value={34.1} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>网络</span>
                  <span>23.8%</span>
                </div>
                <Progress value={23.8} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 系统告警 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              系统告警
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.type === "error"
                      ? "border-l-red-500 bg-red-50"
                      : alert.type === "warning"
                        ? "border-l-yellow-500 bg-yellow-50"
                        : "border-l-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{alert.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                    </div>
                    <Badge variant={alert.resolved ? "outline" : "destructive"} className="text-xs">
                      {alert.resolved ? "已解决" : "待处理"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细图表 */}
      <Card>
        <CardHeader>
          <CardTitle>性能趋势分析</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">性能指标</TabsTrigger>
              <TabsTrigger value="resources">资源使用</TabsTrigger>
              <TabsTrigger value="users">用户活动</TabsTrigger>
              <TabsTrigger value="errors">错误分析</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">API响应时间</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-1">
                      {metrics
                        .find((m) => m.name === "API响应时间")
                        ?.history.map((value, index) => (
                          <div
                            key={index}
                            className="bg-blue-500 rounded-t"
                            style={{
                              height: `${(value / 100) * 100}%`,
                              width: `${100 / 7}%`,
                            }}
                            title={`${value.toFixed(1)}ms`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">过去7小时</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">网络吞吐量</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-1">
                      {metrics
                        .find((m) => m.name === "网络吞吐量")
                        ?.history.map((value, index) => (
                          <div
                            key={index}
                            className="bg-green-500 rounded-t"
                            style={{
                              height: `${(value / 200) * 100}%`,
                              width: `${100 / 7}%`,
                            }}
                            title={`${value.toFixed(1)}MB/s`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">过去7小时</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CPU使用率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-1">
                      {metrics
                        .find((m) => m.name === "CPU使用率")
                        ?.history.map((value, index) => (
                          <div
                            key={index}
                            className="bg-purple-500 rounded-t"
                            style={{
                              height: `${value}%`,
                              width: `${100 / 7}%`,
                            }}
                            title={`${value.toFixed(1)}%`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">过去7小时</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">内存使用率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-1">
                      {metrics
                        .find((m) => m.name === "内存使用率")
                        ?.history.map((value, index) => (
                          <div
                            key={index}
                            className="bg-orange-500 rounded-t"
                            style={{
                              height: `${value}%`,
                              width: `${100 / 7}%`,
                            }}
                            title={`${value.toFixed(1)}%`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">过去7小时</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">活跃用户数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-1">
                      {metrics
                        .find((m) => m.name === "活跃用户")
                        ?.history.map((value, index) => (
                          <div
                            key={index}
                            className="bg-teal-500 rounded-t"
                            style={{
                              height: `${(value / 1500) * 100}%`,
                              width: `${100 / 7}%`,
                            }}
                            title={`${Math.round(value)}人`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">过去7小时</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">用户分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">新用户</span>
                        <div className="flex items-center gap-2">
                          <Progress value={35} className="w-20 h-2" />
                          <span className="text-sm">35%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">活跃用户</span>
                        <div className="flex items-center gap-2">
                          <Progress value={45} className="w-20 h-2" />
                          <span className="text-sm">45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">回访用户</span>
                        <div className="flex items-center gap-2">
                          <Progress value={20} className="w-20 h-2" />
                          <span className="text-sm">20%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">错误率趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-1">
                      {metrics
                        .find((m) => m.name === "错误率")
                        ?.history.map((value, index) => (
                          <div
                            key={index}
                            className="bg-red-500 rounded-t"
                            style={{
                              height: `${(value / 0.2) * 100}%`,
                              width: `${100 / 7}%`,
                            }}
                            title={`${value.toFixed(2)}%`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">过去7小时</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">错误类型分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">4xx错误</span>
                        <div className="flex items-center gap-2">
                          <Progress value={60} className="w-20 h-2" />
                          <span className="text-sm">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">5xx错误</span>
                        <div className="flex items-center gap-2">
                          <Progress value={25} className="w-20 h-2" />
                          <span className="text-sm">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">网络错误</span>
                        <div className="flex items-center gap-2">
                          <Progress value={15} className="w-20 h-2" />
                          <span className="text-sm">15%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
