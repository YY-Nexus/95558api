"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  Search,
  Star,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Code,
  Zap,
  Shield,
} from "lucide-react"

interface DocSection {
  id: string
  title: string
  description: string
  category: string
  content: string
  tags: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  lastUpdated: string
}

export function HelpDocs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("docs")

  // 文档数据
  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "快速开始",
      description: "了解如何使用「云枢³」系统的基本功能",
      category: "基础",
      content: `# 快速开始指南

欢迎使用「云枢³」智能生产力导航体系！本指南将帮助您快速上手。

## 系统概览

「云枢³」采用双环驱动架构：
- **内环**：12大主生产部门
- **外环**：12大智能赋能网络

## 基本操作

1. **导航使用**：点击左侧导航栏访问不同模块
2. **搜索功能**：使用顶部搜索框快速查找内容
3. **个人设置**：在设置页面自定义您的使用体验

## 核心功能

- 🔍 **智能搜索**：支持全文搜索和标签筛选
- 📱 **响应式设计**：完美适配各种设备
- 🎨 **主题切换**：支持浅色/深色模式
- ♿ **无障碍访问**：符合WCAG标准

开始探索吧！`,
      tags: ["入门", "基础", "导航"],
      difficulty: "beginner",
      lastUpdated: "2024-01-15",
    },
    {
      id: "api-integration",
      title: "API集成指南",
      description: "学习如何集成和使用各种API服务",
      category: "开发",
      content: `# API集成指南

本指南介绍如何在「云枢³」系统中集成各种API服务。

## 认证与授权

### GitHub OAuth
// 配置GitHub OAuth
const githubConfig = {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/auth/github/callback'
}

### 微信登录
// 微信登录配置
const wechatConfig = {
  appId: process.env.WECHAT_APP_ID,
  appSecret: process.env.WECHAT_APP_SECRET
}

## 支付集成

支持多种支付方式：
- 支付宝
- 微信支付
- 银联支付

## 存储服务

- 阿里云OSS
- 腾讯云COS
- AWS S3

详细配置请参考相应的API文档。`,
      tags: ["API", "集成", "开发"],
      difficulty: "intermediate",
      lastUpdated: "2024-01-14",
    },
    {
      id: "security-best-practices",
      title: "安全最佳实践",
      description: "了解系统安全配置和最佳实践",
      category: "安全",
      content: `# 安全最佳实践

确保您的「云枢³」系统安全运行的重要指南。

## 认证安全

### 密码策略
- 最少8位字符
- 包含大小写字母、数字和特殊字符
- 定期更换密码

### 多因素认证
启用2FA提升账户安全：
1. 下载认证器应用
2. 扫描二维码
3. 输入验证码完成绑定

## API安全

### 速率限制
// 实施API速率限制
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 最多100次请求
}

### 数据加密
- 传输加密：使用HTTPS
- 存储加密：敏感数据AES-256加密

## 安全监控

定期检查：
- 登录日志
- API调用记录
- 异常访问模式

保持系统和依赖项的最新版本。`,
      tags: ["安全", "认证", "加密"],
      difficulty: "advanced",
      lastUpdated: "2024-01-13",
    },
    {
      id: "performance-optimization",
      title: "性能优化指南",
      description: "提升系统性能的技巧和方法",
      category: "性能",
      content: `# 性能优化指南

优化「云枢³」系统性能的实用技巧。

## 前端优化

### 代码分割
// 使用动态导入实现代码分割
const LazyComponent = lazy(() => import('./LazyComponent'))

### 图片优化
- 使用WebP格式
- 实施懒加载
- 响应式图片

### 缓存策略
- 浏览器缓存
- CDN缓存
- Service Worker

## 后端优化

### 数据库优化
- 添加适当索引
- 查询优化
- 连接池配置

### 缓存层
- Redis缓存热点数据
- 查询结果缓存
- 页面缓存

## 监控指标

关键性能指标：
- 首屏加载时间 < 2秒
- API响应时间 < 200ms
- 错误率 < 1%

定期进行性能测试和优化。`,
      tags: ["性能", "优化", "监控"],
      difficulty: "intermediate",
      lastUpdated: "2024-01-12",
    },
    {
      id: "community-guidelines",
      title: "社区参与指南",
      description: "了解如何参与开发者社区",
      category: "社区",
      content: `# 社区参与指南

欢迎加入「云枢³」开发者社区！

## 贡献方式

### 代码贡献
1. Fork项目仓库
2. 创建功能分支
3. 提交Pull Request
4. 代码审查

### 文档贡献
- 改进现有文档
- 添加新的教程
- 翻译文档

### 社区活动
- 参加技术分享会
- 组织线下聚会
- 在线问答

## 行为准则

我们致力于创建一个包容、友好的社区环境：
- 尊重他人观点
- 提供建设性反馈
- 帮助新成员

## 奖励机制

### 贡献积分
- 提交PR：100积分
- 审查代码：50积分
- 回答问题：25积分

### 成就徽章
- 🌟 首次贡献者
- 👁️ 代码审查专家
- 📚 文档贡献者
- 🎓 社区导师

## 联系方式

- GitHub Issues
- 社区论坛
- 微信群

期待您的参与！`,
      tags: ["社区", "贡献", "协作"],
      difficulty: "beginner",
      lastUpdated: "2024-01-11",
    },
  ]

  // FAQ数据
  const faqData = [
    {
      question: "如何重置密码？",
      answer: '在登录页面点击"忘记密码"，输入您的邮箱地址，系统会发送重置链接到您的邮箱。',
      category: "账户",
    },
    {
      question: "支持哪些浏览器？",
      answer: "支持Chrome 90+、Firefox 88+、Safari 14+、Edge 90+等现代浏览器。",
      category: "技术",
    },
    {
      question: "如何启用暗色模式？",
      answer: '在设置页面的"外观"选项中，选择"暗色"主题或"自动"跟随系统设置。',
      category: "设置",
    },
    {
      question: "API调用频率限制是多少？",
      answer: "默认限制为每15分钟100次请求。企业用户可以申请更高的限额。",
      category: "API",
    },
    {
      question: "如何报告安全漏洞？",
      answer: "请发送邮件至security@example.com，我们会在24小时内回复。",
      category: "安全",
    },
  ]

  // 筛选文档
  const filteredDocs = docSections.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 获取难度颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取难度标签
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "初级"
      case "intermediate":
        return "中级"
      case "advanced":
        return "高级"
      default:
        return "未知"
    }
  }

  return (
    <div className="space-y-6">
      {/* 帮助中心头部 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                帮助文档中心
              </CardTitle>
              <CardDescription>完整的使用指南、API文档和常见问题解答</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {docSections.length} 篇文档
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索文档、API或问题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "基础", "开发", "安全", "性能", "社区"].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "全部" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 主要内容 */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="docs">文档</TabsTrigger>
              <TabsTrigger value="faq">常见问题</TabsTrigger>
              <TabsTrigger value="tutorials">教程</TabsTrigger>
              <TabsTrigger value="api">API参考</TabsTrigger>
            </TabsList>

            <div className="p-6">
              {/* 文档列表 */}
              <TabsContent value="docs" className="mt-0 space-y-4">
                {filteredDocs.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">未找到相关文档</h3>
                    <p className="text-muted-foreground">尝试调整搜索关键词或筛选条件</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocs.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-1">{doc.title}</CardTitle>
                              <CardDescription className="text-sm">{doc.description}</CardDescription>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={getDifficultyColor(doc.difficulty)}>
                              {getDifficultyLabel(doc.difficulty)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{doc.lastUpdated}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {doc.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{doc.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* 常见问题 */}
              <TabsContent value="faq" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["账户", "技术", "设置", "API", "安全"].map((category) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        {category}问题
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {faqData
                          .filter((faq) => faq.category === category)
                          .map((faq, index) => (
                            <AccordionItem key={index} value={`${category}-${index}`}>
                              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                              <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* 教程 */}
              <TabsContent value="tutorials" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        入门教程
                      </CardTitle>
                      <CardDescription>适合新手的基础教程</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {["5分钟快速上手", "创建第一个项目", "基本功能介绍", "界面导航指南"].map((tutorial, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <span>{tutorial}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        开发教程
                      </CardTitle>
                      <CardDescription>深入的开发指南</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {["API集成实战", "自定义组件开发", "插件系统使用", "高级配置技巧"].map((tutorial, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <span>{tutorial}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        性能优化
                      </CardTitle>
                      <CardDescription>提升系统性能</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {["前端性能优化", "数据库查询优化", "缓存策略配置", "监控和调试"].map((tutorial, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <span>{tutorial}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        安全指南
                      </CardTitle>
                      <CardDescription>保障系统安全</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {["认证安全配置", "数据加密实践", "安全审计流程", "漏洞修复指南"].map((tutorial, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <span>{tutorial}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* API参考 */}
              <TabsContent value="api" className="mt-0 space-y-4">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">API参考文档</h3>
                    <p className="text-muted-foreground">完整的API接口文档和示例代码</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "认证API", endpoint: "/api/auth", methods: ["POST", "GET", "DELETE"] },
                      { name: "用户API", endpoint: "/api/users", methods: ["GET", "PUT", "DELETE"] },
                      { name: "内容API", endpoint: "/api/content", methods: ["GET", "POST", "PUT", "DELETE"] },
                      { name: "搜索API", endpoint: "/api/search", methods: ["GET", "POST"] },
                      { name: "统计API", endpoint: "/api/analytics", methods: ["GET"] },
                      { name: "系统API", endpoint: "/api/system", methods: ["GET"] },
                    ].map((api, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{api.name}</CardTitle>
                          <CardDescription className="font-mono text-sm">{api.endpoint}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {api.methods.map((method) => (
                              <Badge
                                key={method}
                                variant={
                                  method === "GET"
                                    ? "default"
                                    : method === "POST"
                                      ? "secondary"
                                      : method === "PUT"
                                        ? "outline"
                                        : "destructive"
                                }
                                className="text-xs"
                              >
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
