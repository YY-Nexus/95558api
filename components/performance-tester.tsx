"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Clock, TrendingUp, Server, Database, Network, Activity, BarChart3, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  status: "excellent" | "good" | "warning" | "critical"
  threshold: number
}

interface LoadTestResult {
  timestamp: number
  responseTime: number
  throughput: number
  errorRate: number
  activeUsers: number
}

export function PerformanceTester() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [testResults, setTestResults] = useState<LoadTestResult[]>([])
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceMetric[]>([])
  const [testConfig, setTestConfig] = useState({
    maxUsers: 1000,
    duration: 300, // 5分钟
    rampUpTime: 60, // 1分钟
  })
  const { toast } = useToast()

  // 初始化性能指标
  useEffect(() => {
    setCurrentMetrics([
      { name: "响应时间", value: 0, unit: "ms", status: "excellent", threshold: 200 },
      { name: "吞吐量", value: 0, unit: "req/s", status: "excellent", threshold: 100 },
      { name: "错误率", value: 0, unit: "%", status: "excellent", threshold: 1 },
      { name: "CPU使用率", value: 0, unit: "%", status: "excellent", threshold: 80 },
      { name: "内存使用率", value: 0, unit: "%", status: "excellent", threshold: 85 },
      { name: "并发用户数", value: 0, unit: "users", status: "excellent", threshold: 500 },
    ])
  }, [])

  // 运行性能测试
  const runPerformanceTest = async () => {
    setIsRunning(true)
    setProgress(0)
    setTestResults([])

    const startTime = Date.now()
    const testDuration = testConfig.duration * 1000 // 转换为毫秒
    const interval = 1000 // 每秒更新一次

    const testInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progressPercent = (elapsed / testDuration) * 100

      if (progressPercent >= 100) {
        clearInterval(testInterval)
        setIsRunning(false)
        setProgress(100)

        toast({
          title: "性能测试完成",
          description: "所有测试指标已收集完成",
        })
        return
      }

      setProgress(progressPercent)

      // 模拟性能数据
      const currentUsers = Math.min(
        testConfig.maxUsers,
        Math.floor((elapsed / (testConfig.rampUpTime * 1000)) * testConfig.maxUsers),
      )

      // 模拟随着用户增加性能下降
      const loadFactor = currentUsers / testConfig.maxUsers
      const baseResponseTime = 50 + loadFactor * 300
      const baseThroughput = 200 - loadFactor * 100
      const baseErrorRate = loadFactor * 5

      const newResult: LoadTestResult = {
        timestamp: Date.now(),
        responseTime: baseResponseTime + (Math.random() * 100 - 50),
        throughput: baseThroughput + (Math.random() * 50 - 25),
        errorRate: Math.max(0, baseErrorRate + (Math.random() * 2 - 1)),
        activeUsers: currentUsers,
      }

      setTestResults((prev) => [...prev.slice(-59), newResult]) // 保留最近60个数据点

      // 更新当前指标
      setCurrentMetrics((prev) =>
        prev.map((metric) => {
          let newValue = metric.value
          let status: "excellent" | "good" | "warning" | "critical" = "excellent"

          switch (metric.name) {
            case "响应时间":
              newValue = newResult.responseTime
              status =
                newValue <= 100 ? "excellent" : newValue <= 200 ? "good" : newValue <= 500 ? "warning" : "critical"
              break
            case "吞吐量":
              newValue = newResult.throughput
              status =
                newValue >= 150 ? "excellent" : newValue >= 100 ? "good" : newValue >= 50 ? "warning" : "critical"
              break
            case "错误率":
              newValue = newResult.errorRate
              status = newValue <= 1 ? "excellent" : newValue <= 3 ? "good" : newValue <= 5 ? "warning" : "critical"
              break
            case "CPU使用率":
              newValue = 20 + loadFactor * 60 + (Math.random() * 20 - 10)
              status = newValue <= 50 ? "excellent" : newValue <= 70 ? "good" : newValue <= 85 ? "warning" : "critical"
              break
            case "内存使用率":
              newValue = 30 + loadFactor * 40 + (Math.random() * 15 - 7.5)
              status = newValue <= 60 ? "excellent" : newValue <= 75 ? "good" : newValue <= 90 ? "warning" : "critical"
              break
            case "并发用户数":
              newValue = currentUsers
              status =
                newValue <= 200 ? "excellent" : newValue <= 500 ? "good" : newValue <= 800 ? "warning" : "critical"
              break
          }

          return { ...metric, value: Math.max(0, newValue), status }
        }),
      )
    }, interval)
  }

  // 停止测试
  const stopTest = () => {
    setIsRunning(false)
    setProgress(0)
    toast({
      title: "测试已停止",
      description: "性能测试已手动停止",
    })
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // 获取状态标签
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excellent":
        return "优秀"
      case "good":
        return "良好"
      case "warning":
        return "警告"
      case "critical":
        return "严重"
      default:
        return "未知"
    }
  }

  // 计算平均值
  const getAverageMetric = (metric: string) => {
    if (testResults.length === 0) return 0

    const values = testResults.map((result) => {
      switch (metric) {
        case "responseTime":
          return result.responseTime
        case "throughput":
          return result.throughput
        case "errorRate":
          return result.errorRate
        default:
          return 0
      }
    })

    return values.reduce((acc, val) => acc + val, 0) / values.length
  }

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                性能测试中心
              </CardTitle>
              <CardDescription>大规模并发场景下的系统稳定性和性能指标验证</CardDescription>
            </div>
            <div className="flex gap-2">
              {isRunning ? (
                <Button variant="destructive" onClick={stopTest}>
                  停止测试
                </Button>
              ) : (
                <Button onClick={runPerformanceTest} className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  开始测试
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {isRunning && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>测试进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">最大用户数</div>
                  <div className="font-medium">{testConfig.maxUsers}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">测试时长</div>
                  <div className="font-medium">{testConfig.duration}秒</div>
                </div>
                <div>
                  <div className="text-muted-foreground">爬坡时间</div>
                  <div className="font-medium">{testConfig.rampUpTime}秒</div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* 实时指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">{metric.name}</div>
                  <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(metric.name === "错误率" ? 2 : 0)}
                    <span className="text-sm font-normal ml-1">{metric.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      metric.status === "excellent"
                        ? "default"
                        : metric.status === "good"
                          ? "secondary"
                          : metric.status === "warning"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {getStatusLabel(metric.status)}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    阈值: {metric.threshold}
                    {metric.unit}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 详细分析 */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>性能分析报告</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="realtime" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="realtime">实时监控</TabsTrigger>
                <TabsTrigger value="summary">测试摘要</TabsTrigger>
                <TabsTrigger value="bottlenecks">性能瓶颈</TabsTrigger>
                <TabsTrigger value="recommendations">优化建议</TabsTrigger>
              </TabsList>

              <TabsContent value="realtime" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        响应时间趋势
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 flex items-end justify-between gap-1">
                        {testResults.slice(-20).map((result, index) => (
                          <div
                            key={index}
                            className="bg-blue-500 rounded-t"
                            style={{
                              height: `${Math.min(100, (result.responseTime / 500) * 100)}%`,
                              width: `${100 / 20}%`,
                            }}
                            title={`${result.responseTime.toFixed(0)}ms`}
                          />
                        ))}
                      </div>
                      <div className="text-center text-sm text-muted-foreground mt-2">最近20个数据点</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        吞吐量趋势
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 flex items-end justify-between gap-1">
                        {testResults.slice(-20).map((result, index) => (
                          <div
                            key={index}
                            className="bg-green-500 rounded-t"
                            style={{
                              height: `${Math.min(100, (result.throughput / 200) * 100)}%`,
                              width: `${100 / 20}%`,
                            }}
                            title={`${result.throughput.toFixed(0)} req/s`}
                          />
                        ))}
                      </div>
                      <div className="text-center text-sm text-muted-foreground mt-2">最近20个数据点</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">响应时间统计</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>平均值</span>
                          <span className="font-medium">{getAverageMetric("responseTime").toFixed(0)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>最小值</span>
                          <span className="font-medium">
                            {testResults.length > 0
                              ? Math.min(...testResults.map((r) => r.responseTime)).toFixed(0)
                              : 0}
                            ms
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>最大值</span>
                          <span className="font-medium">
                            {testResults.length > 0
                              ? Math.max(...testResults.map((r) => r.responseTime)).toFixed(0)
                              : 0}
                            ms
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">吞吐量统计</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>平均值</span>
                          <span className="font-medium">{getAverageMetric("throughput").toFixed(0)} req/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>最小值</span>
                          <span className="font-medium">
                            {testResults.length > 0 ? Math.min(...testResults.map((r) => r.throughput)).toFixed(0) : 0}{" "}
                            req/s
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>最大值</span>
                          <span className="font-medium">
                            {testResults.length > 0 ? Math.max(...testResults.map((r) => r.throughput)).toFixed(0) : 0}{" "}
                            req/s
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">错误率统计</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>平均值</span>
                          <span className="font-medium">{getAverageMetric("errorRate").toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>最小值</span>
                          <span className="font-medium">
                            {testResults.length > 0 ? Math.min(...testResults.map((r) => r.errorRate)).toFixed(2) : 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>最大值</span>
                          <span className="font-medium">
                            {testResults.length > 0 ? Math.max(...testResults.map((r) => r.errorRate)).toFixed(2) : 0}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bottlenecks" className="space-y-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        识别的性能瓶颈
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                          <div>
                            <div className="font-medium">数据库连接池耗尽</div>
                            <div className="text-sm text-muted-foreground">
                              在高并发情况下，数据库连接池达到上限，导致响应时间急剧增加
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                          <div>
                            <div className="font-medium">内存使用率过高</div>
                            <div className="text-sm text-muted-foreground">
                              内存使用率超过85%，可能导致垃圾回收频繁，影响性能
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                          <div>
                            <div className="font-medium">API限流触发</div>
                            <div className="text-sm text-muted-foreground">部分API接口触发限流机制，导致请求被拒绝</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        服务器优化
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500 mt-2"></div>
                          增加服务器实例数量，实现水平扩展
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500 mt-2"></div>
                          优化负载均衡策略，均匀分配请求
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500 mt-2"></div>
                          启用HTTP/2和gzip压缩
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500 mt-2"></div>
                          配置CDN加速静态资源
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        数据库优化
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-500 mt-2"></div>
                          增加数据库连接池大小
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-500 mt-2"></div>
                          实施读写分离和主从复制
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-500 mt-2"></div>
                          优化慢查询和添加索引
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-500 mt-2"></div>
                          启用Redis缓存热点数据
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Network className="h-5 w-5" />
                        网络优化
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                          优化API接口响应体大小
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                          实施请求合并和批处理
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                          启用Keep-Alive连接复用
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500 mt-2"></div>
                          配置适当的超时和重试机制
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        监控告警
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                          设置关键指标监控告警
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                          建立性能基线和趋势分析
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                          实施自动扩缩容机制
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-orange-500 mt-2"></div>
                          定期进行性能压测
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
