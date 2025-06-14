"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  Key,
  Eye,
  Server,
  Database,
  Network,
  Bug,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SecurityIssue {
  id: string
  category: "critical" | "high" | "medium" | "low" | "info"
  title: string
  description: string
  impact: string
  solution: string
  cwe?: string
  cvss?: number
}

interface AuditResult {
  category: string
  score: number
  issues: SecurityIssue[]
  recommendations: string[]
}

export function SecurityAuditor() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([])
  const [isAuditing, setIsAuditing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [overallScore, setOverallScore] = useState(0)
  const { toast } = useToast()

  // 安全审计类别
  const auditCategories = [
    { id: "authentication", name: "身份认证", icon: Key },
    { id: "authorization", name: "权限控制", icon: Lock },
    { id: "data-protection", name: "数据保护", icon: Database },
    { id: "network-security", name: "网络安全", icon: Network },
    { id: "api-security", name: "API安全", icon: Server },
    { id: "client-security", name: "客户端安全", icon: Eye },
  ]

  // 执行安全审计
  const runSecurityAudit = async () => {
    setIsAuditing(true)
    setProgress(0)
    setAuditResults([])

    const results: AuditResult[] = []

    for (let i = 0; i < auditCategories.length; i++) {
      const category = auditCategories[i]

      // 模拟审计过程
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = await auditCategory(category.id)
      results.push(result)
      setAuditResults([...results])
      setProgress(((i + 1) / auditCategories.length) * 100)
    }

    // 计算总体安全评分
    const totalScore = results.reduce((acc, result) => acc + result.score, 0) / results.length
    setOverallScore(totalScore)

    setIsAuditing(false)

    toast({
      title: "安全审计完成",
      description: `总体安全评分: ${Math.round(totalScore)}/100`,
      variant: totalScore >= 80 ? "default" : "destructive",
    })
  }

  // 审计单个类别
  const auditCategory = async (categoryId: string): Promise<AuditResult> => {
    // 模拟不同类别的安全问题
    const mockIssues: Record<string, SecurityIssue[]> = {
      authentication: [
        {
          id: "auth-1",
          category: "high",
          title: "密码策略不够强",
          description: "当前密码策略允许弱密码，容易被暴力破解",
          impact: "攻击者可能通过暴力破解获取用户账户",
          solution: "实施强密码策略：最少8位，包含大小写字母、数字和特殊字符",
          cwe: "CWE-521",
          cvss: 7.5,
        },
        {
          id: "auth-2",
          category: "medium",
          title: "缺少账户锁定机制",
          description: "多次登录失败后未锁定账户",
          impact: "增加暴力破解攻击的成功率",
          solution: "实施账户锁定策略，5次失败后锁定15分钟",
          cwe: "CWE-307",
          cvss: 5.3,
        },
      ],
      authorization: [
        {
          id: "authz-1",
          category: "critical",
          title: "权限提升漏洞",
          description: "普通用户可以访问管理员功能",
          impact: "攻击者可能获取系统管理权限",
          solution: "实施严格的基于角色的访问控制(RBAC)",
          cwe: "CWE-269",
          cvss: 9.1,
        },
      ],
      "data-protection": [
        {
          id: "data-1",
          category: "high",
          title: "敏感数据未加密",
          description: "数据库中的敏感信息以明文存储",
          impact: "数据泄露时敏感信息直接暴露",
          solution: "对敏感数据进行AES-256加密存储",
          cwe: "CWE-312",
          cvss: 8.2,
        },
      ],
      "network-security": [
        {
          id: "net-1",
          category: "medium",
          title: "缺少HTTPS强制跳转",
          description: "HTTP请求未自动跳转到HTTPS",
          impact: "数据传输可能被中间人攻击截获",
          solution: "配置HTTP到HTTPS的301重定向",
          cwe: "CWE-319",
          cvss: 6.5,
        },
      ],
      "api-security": [
        {
          id: "api-1",
          category: "high",
          title: "API速率限制缺失",
          description: "API接口未实施速率限制",
          impact: "容易遭受DDoS攻击和API滥用",
          solution: "实施基于IP和用户的速率限制",
          cwe: "CWE-770",
          cvss: 7.8,
        },
      ],
      "client-security": [
        {
          id: "client-1",
          category: "low",
          title: "缺少CSP头",
          description: "未设置内容安全策略头",
          impact: "增加XSS攻击风险",
          solution: "配置严格的Content-Security-Policy头",
          cwe: "CWE-79",
          cvss: 4.3,
        },
      ],
    }

    const issues = mockIssues[categoryId] || []
    const score = Math.max(
      0,
      100 -
        issues.reduce((acc, issue) => {
          const weights = { critical: 30, high: 20, medium: 10, low: 5, info: 1 }
          return acc + weights[issue.category]
        }, 0),
    )

    const recommendations = [
      "定期更新安全策略和配置",
      "实施多层安全防护机制",
      "建立安全事件响应流程",
      "定期进行安全培训和演练",
    ]

    return {
      category: auditCategories.find((c) => c.id === categoryId)?.name || categoryId,
      score,
      issues,
      recommendations,
    }
  }

  // 获取严重程度颜色
  const getSeverityColor = (category: string) => {
    switch (category) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      case "info":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取严重程度图标
  const getSeverityIcon = (category: string) => {
    switch (category) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  // 统计问题数量
  const issueStats = auditResults.reduce(
    (acc, result) => {
      result.issues.forEach((issue) => {
        acc[issue.category] = (acc[issue.category] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                安全审计中心
              </CardTitle>
              <CardDescription>全面扫描认证流程和系统安全漏洞，提供专业修复建议</CardDescription>
            </div>
            <Button onClick={runSecurityAudit} disabled={isAuditing} className="flex items-center gap-2">
              {isAuditing ? <Zap className="h-4 w-4 animate-pulse" /> : <Bug className="h-4 w-4" />}
              {isAuditing ? "审计中..." : "开始审计"}
            </Button>
          </div>
        </CardHeader>

        {isAuditing && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>安全扫描进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        )}
      </Card>

      {/* 安全评分概览 */}
      {auditResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 ${
                    overallScore >= 80 ? "text-green-600" : overallScore >= 60 ? "text-yellow-600" : "text-red-600"
                  }`}
                >
                  {Math.round(overallScore)}
                </div>
                <div className="text-sm text-muted-foreground">总体安全评分</div>
                <Progress value={overallScore} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{issueStats.critical || 0}</div>
                  <div className="text-sm text-muted-foreground">严重问题</div>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{issueStats.high || 0}</div>
                  <div className="text-sm text-muted-foreground">高危问题</div>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{issueStats.medium || 0}</div>
                  <div className="text-sm text-muted-foreground">中危问题</div>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 详细审计结果 */}
      {auditResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>安全审计详情</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">总览</TabsTrigger>
                <TabsTrigger value="issues">安全问题</TabsTrigger>
                <TabsTrigger value="recommendations">修复建议</TabsTrigger>
                <TabsTrigger value="compliance">合规检查</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {auditResults.map((result, index) => {
                  const categoryInfo = auditCategories.find((c) => c.name === result.category)
                  const IconComponent = categoryInfo?.icon || Shield

                  return (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5" />
                            <CardTitle className="text-lg">{result.category}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"
                              }
                            >
                              {result.score}/100
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Progress value={result.score} className="w-full" />
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">发现问题</div>
                              <div className="font-medium">{result.issues.length}个</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">严重问题</div>
                              <div className="font-medium text-red-600">
                                {result.issues.filter((i) => i.category === "critical").length}个
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">高危问题</div>
                              <div className="font-medium text-orange-600">
                                {result.issues.filter((i) => i.category === "high").length}个
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">安全评级</div>
                              <div className="font-medium">
                                {result.score >= 80 ? "优秀" : result.score >= 60 ? "良好" : "需改进"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="issues" className="space-y-4">
                {auditResults
                  .flatMap((result) => result.issues)
                  .map((issue, index) => (
                    <Alert
                      key={index}
                      className={`border-l-4 ${
                        issue.category === "critical"
                          ? "border-l-red-500"
                          : issue.category === "high"
                            ? "border-l-orange-500"
                            : issue.category === "medium"
                              ? "border-l-yellow-500"
                              : "border-l-blue-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(issue.category)}
                        <div className="flex-1">
                          <AlertTitle className="flex items-center gap-2">
                            {issue.title}
                            <Badge variant="outline" className="text-xs">
                              {issue.category.toUpperCase()}
                            </Badge>
                            {issue.cvss && (
                              <Badge variant="outline" className="text-xs">
                                CVSS: {issue.cvss}
                              </Badge>
                            )}
                          </AlertTitle>
                          <AlertDescription className="mt-2 space-y-2">
                            <div>
                              <strong>描述：</strong>
                              {issue.description}
                            </div>
                            <div>
                              <strong>影响：</strong>
                              {issue.impact}
                            </div>
                            <div>
                              <strong>解决方案：</strong>
                              {issue.solution}
                            </div>
                            {issue.cwe && (
                              <div className="text-xs text-muted-foreground">
                                <strong>CWE编号：</strong>
                                {issue.cwe}
                              </div>
                            )}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ))}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                {auditResults.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{result.category} - 安全建议</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>OWASP Top 10</CardTitle>
                      <CardDescription>Web应用安全风险</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "注入攻击", status: "通过" },
                          { name: "身份认证失效", status: "警告" },
                          { name: "敏感数据泄露", status: "失败" },
                          { name: "XML外部实体", status: "通过" },
                          { name: "访问控制失效", status: "失败" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <Badge
                              variant={
                                item.status === "通过"
                                  ? "default"
                                  : item.status === "警告"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>ISO 27001</CardTitle>
                      <CardDescription>信息安全管理体系标准</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "信息安全策略", status: "通过" },
                          { name: "风险管理", status: "警告" },
                          { name: "资产管理", status: "通过" },
                          { name: "访问控制", status: "失败" },
                          { name: "密码学", status: "通过" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <Badge
                              variant={
                                item.status === "通过"
                                  ? "default"
                                  : item.status === "警告"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
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
