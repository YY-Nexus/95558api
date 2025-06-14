"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Shield,
  Network,
  Server,
  GitBranch,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Settings,
  Activity,
} from "lucide-react"
import { dbManager } from "@/lib/database-config"
import { rbacManager } from "@/lib/rbac-system"
import { apiGateway } from "@/lib/api-gateway"
import { serviceDiscovery } from "@/lib/microservice-config"
import { cicdManager } from "@/lib/cicd-pipeline"

export default function InfrastructurePage() {
  const [activeTab, setActiveTab] = useState("database")
  const [systemStatus, setSystemStatus] = useState({
    database: "healthy",
    rbac: "healthy",
    gateway: "healthy",
    services: "healthy",
    cicd: "healthy",
  })

  useEffect(() => {
    // 模拟系统状态检查
    const checkSystemStatus = () => {
      setSystemStatus({
        database: Math.random() > 0.1 ? "healthy" : "warning",
        rbac: Math.random() > 0.05 ? "healthy" : "error",
        gateway: Math.random() > 0.1 ? "healthy" : "warning",
        services: Math.random() > 0.15 ? "healthy" : "warning",
        cicd: Math.random() > 0.1 ? "healthy" : "warning",
      })
    }

    checkSystemStatus()
    const interval = setInterval(checkSystemStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">基础设施管理</h1>
          <p className="text-muted-foreground mt-2">企业级架构组件的统一管理和监控平台</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            系统运行中
          </Badge>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span className="font-medium">数据库</span>
              </div>
              {getStatusIcon(systemStatus.database)}
            </div>
            <p className={`text-sm mt-1 ${getStatusColor(systemStatus.database)}`}>
              {systemStatus.database === "healthy" ? "运行正常" : "需要关注"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">权限系统</span>
              </div>
              {getStatusIcon(systemStatus.rbac)}
            </div>
            <p className={`text-sm mt-1 ${getStatusColor(systemStatus.rbac)}`}>
              {systemStatus.rbac === "healthy" ? "运行正常" : "需要关注"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                <span className="font-medium">API网关</span>
              </div>
              {getStatusIcon(systemStatus.gateway)}
            </div>
            <p className={`text-sm mt-1 ${getStatusColor(systemStatus.gateway)}`}>
              {systemStatus.gateway === "healthy" ? "运行正常" : "需要关注"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <span className="font-medium">微服务</span>
              </div>
              {getStatusIcon(systemStatus.services)}
            </div>
            <p className={`text-sm mt-1 ${getStatusColor(systemStatus.services)}`}>
              {systemStatus.services === "healthy" ? "运行正常" : "需要关注"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                <span className="font-medium">CI/CD</span>
              </div>
              {getStatusIcon(systemStatus.cicd)}
            </div>
            <p className={`text-sm mt-1 ${getStatusColor(systemStatus.cicd)}`}>
              {systemStatus.cicd === "healthy" ? "运行正常" : "需要关注"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 详细管理界面 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            数据库
          </TabsTrigger>
          <TabsTrigger value="rbac" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            权限系统
          </TabsTrigger>
          <TabsTrigger value="gateway" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            API网关
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            微服务
          </TabsTrigger>
          <TabsTrigger value="cicd" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            CI/CD
          </TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="space-y-4">
          <DatabaseManagement />
        </TabsContent>

        <TabsContent value="rbac" className="space-y-4">
          <RBACManagement />
        </TabsContent>

        <TabsContent value="gateway" className="space-y-4">
          <GatewayManagement />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServicesManagement />
        </TabsContent>

        <TabsContent value="cicd" className="space-y-4">
          <CICDManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 数据库管理组件
function DatabaseManagement() {
  const [connections, setConnections] = useState<any[]>([])

  useEffect(() => {
    const status = dbManager.getConnectionStatus()
    setConnections(status)
  }, [])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            数据库连接管理
          </CardTitle>
          <CardDescription>管理多数据库连接，包括PostgreSQL、MySQL、MongoDB、Redis和NDS存储库</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {connections.map((conn, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{conn.name}</h4>
                    <Badge variant={conn.connected ? "default" : "secondary"}>
                      {conn.connected ? "已连接" : "未连接"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {conn.config?.type} - {conn.config?.host}:{conn.config?.port}
                  </p>
                  {conn.name === "nds" && (
                    <div className="text-xs text-muted-foreground">集群模式 | 分片: 16 | 复制: 异步</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// RBAC管理组件
function RBACManagement() {
  const [users] = useState(rbacManager.getAllUsers())
  const [roles] = useState(rbacManager.getAllRoles())
  const [permissions] = useState(rbacManager.getAllPermissions())

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              用户管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              角色管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.slice(0, 5).map((role) => (
                <div key={role.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-muted-foreground">级别: {role.level}</p>
                  </div>
                  <Badge variant={role.isSystem ? "default" : "outline"}>{role.isSystem ? "系统" : "自定义"}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              权限管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {permissions.slice(0, 5).map((permission) => (
                <div key={permission.id} className="space-y-1">
                  <p className="font-medium text-sm">{permission.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {permission.resource}.{permission.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// API网关管理组件
function GatewayManagement() {
  const [routes] = useState(apiGateway.getRoutes())

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            API路由管理
          </CardTitle>
          <CardDescription>管理API路由、限流策略和缓存配置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => {
              const stats = apiGateway.getRouteStats(route.id)
              return (
                <div key={route.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{route.path}</h4>
                      <p className="text-sm text-muted-foreground">
                        {route.method} | {route.target}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{stats.requestsPerMinute}/min</Badge>
                      <Badge variant={stats.errorRate < 5 ? "default" : "destructive"}>
                        {stats.errorRate.toFixed(1)}% 错误率
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">总请求</p>
                      <p className="font-medium">{stats.totalRequests}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">平均响应时间</p>
                      <p className="font-medium">{stats.avgResponseTime.toFixed(0)}ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">限流配置</p>
                      <p className="font-medium">
                        {route.rateLimit
                          ? `${route.rateLimit.maxRequests}/${route.rateLimit.windowMs / 1000}s`
                          : "无限制"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 微服务管理组件
function ServicesManagement() {
  const [services] = useState(serviceDiscovery.getAllServices())

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            微服务集群
          </CardTitle>
          <CardDescription>监控和管理微服务实例的健康状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {services.map((service) => {
              const status = serviceDiscovery.getServiceStatus(service.name)
              const dependencies = serviceDiscovery.checkDependencies(service.name)

              return (
                <div key={service.name} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        v{service.version} | {service.protocol}://{service.host}:{service.port}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={status.healthyCount > 0 ? "default" : "destructive"}>
                        {status.healthyCount}/{status.totalCount} 健康
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">资源配置</p>
                      <p className="font-medium">
                        {service.resources.cpu} / {service.resources.memory}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">扩缩容</p>
                      <p className="font-medium">
                        {service.scaling.min}-{service.scaling.max} 实例
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">依赖服务</p>
                      <p className="font-medium">{dependencies.dependencies.length} 个</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">健康检查</p>
                      <p className="font-medium">{service.healthCheck.interval / 1000}s 间隔</p>
                    </div>
                  </div>

                  {dependencies.dependencies.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">服务依赖:</p>
                      <div className="flex flex-wrap gap-2">
                        {dependencies.dependencies.map((dep) => (
                          <Badge key={dep.name} variant={dep.status === "available" ? "default" : "destructive"}>
                            {dep.name} ({dep.healthyInstances})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// CI/CD管理组件
function CICDManagement() {
  const [pipelines] = useState(cicdManager.getAllPipelines())
  const [runHistory] = useState(cicdManager.getRunHistory())

  const triggerPipeline = async (pipelineId: string) => {
    try {
      const runId = await cicdManager.triggerPipeline(pipelineId, {
        type: "manual",
        user: "admin",
        branch: "main",
      })
      console.log(`流水线已触发: ${runId}`)
    } catch (error) {
      console.error("触发流水线失败:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            CI/CD流水线
          </CardTitle>
          <CardDescription>管理持续集成和部署流水线</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelines.map((pipeline) => {
              const stats = cicdManager.getPipelineStats(pipeline.id)

              return (
                <div key={pipeline.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{pipeline.name}</h4>
                      <p className="text-sm text-muted-foreground">{pipeline.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => triggerPipeline(pipeline.id)}>
                        <Play className="h-4 w-4 mr-1" />
                        运行
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">触发条件</p>
                      <p className="font-medium">{pipeline.trigger.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">成功率</p>
                      <p className="font-medium">{stats.successRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">平均耗时</p>
                      <p className="font-medium">{stats.avgDuration}秒</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">总运行次数</p>
                      <p className="font-medium">{stats.totalRuns}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">流水线阶段:</p>
                    <div className="flex flex-wrap gap-2">
                      {pipeline.stages.map((stage, index) => (
                        <Badge key={index} variant="outline">
                          {stage.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {stats.recentRuns.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">最近运行:</p>
                      <div className="space-y-1">
                        {stats.recentRuns.slice(0, 3).map((run) => (
                          <div key={run.id} className="flex items-center justify-between text-sm">
                            <span>#{run.id.slice(-8)}</span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  run.status === "success"
                                    ? "default"
                                    : run.status === "failed"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {run.status}
                              </Badge>
                              <span className="text-muted-foreground">{run.startTime.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
