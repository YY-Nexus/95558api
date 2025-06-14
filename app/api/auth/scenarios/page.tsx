import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, ShoppingCart, Gamepad2, GraduationCap, Heart, Briefcase } from "lucide-react"
import Link from "next/link"

export default function AuthScenariosPage() {
  const scenarios = [
    {
      id: "enterprise",
      title: "企业级应用",
      icon: Building2,
      description: "大型企业内部系统的认证解决方案",
      requirements: ["高安全性", "SSO集成", "权限管理", "审计日志"],
      solutions: ["SAML 2.0", "LDAP集成", "RBAC权限", "双因子认证"],
      complexity: "高",
      examples: ["ERP系统", "OA办公", "财务系统", "HR管理"],
    },
    {
      id: "ecommerce",
      title: "电商平台",
      icon: ShoppingCart,
      description: "电商网站的用户认证和支付安全",
      requirements: ["快速注册", "社交登录", "支付安全", "用户体验"],
      solutions: ["OAuth 2.0", "手机验证", "生物识别", "风控系统"],
      complexity: "中",
      examples: ["购物网站", "移动商城", "B2B平台", "跨境电商"],
    },
    {
      id: "gaming",
      title: "游戏平台",
      icon: Gamepad2,
      description: "游戏和娱乐平台的用户管理",
      requirements: ["快速登录", "防作弊", "多平台", "实名认证"],
      solutions: ["游戏内登录", "设备指纹", "行为分析", "区块链验证"],
      complexity: "中",
      examples: ["手机游戏", "PC游戏", "主机游戏", "云游戏"],
    },
    {
      id: "education",
      title: "在线教育",
      icon: GraduationCap,
      description: "教育平台的学生和教师认证",
      requirements: ["学生验证", "家长监控", "考试安全", "隐私保护"],
      solutions: ["学号登录", "人脸识别", "监考系统", "权限分级"],
      complexity: "中",
      examples: ["在线课堂", "考试系统", "学习平台", "教务管理"],
    },
    {
      id: "healthcare",
      title: "医疗健康",
      icon: Heart,
      description: "医疗系统的患者和医生认证",
      requirements: ["隐私合规", "医生资质", "患者安全", "数据保护"],
      solutions: ["医师证验证", "患者实名", "加密传输", "访问控制"],
      complexity: "高",
      examples: ["电子病历", "远程诊疗", "健康管理", "医院系统"],
    },
    {
      id: "fintech",
      title: "金融科技",
      icon: Briefcase,
      description: "金融应用的高安全认证要求",
      requirements: ["监管合规", "反洗钱", "风险控制", "实名认证"],
      solutions: ["KYC验证", "生物识别", "设备绑定", "行为分析"],
      complexity: "高",
      examples: ["数字银行", "支付应用", "投资平台", "保险系统"],
    },
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "低":
        return "bg-green-100 text-green-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "高":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">📋 实际应用场景</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          了解不同行业和应用场景下的认证需求，选择最适合的解决方案
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">场景概览</TabsTrigger>
          <TabsTrigger value="comparison">方案对比</TabsTrigger>
          <TabsTrigger value="implementation">实施指南</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon
              return (
                <Card key={scenario.id} className="card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full p-3 bg-blue-accent-50 text-blue-accent-600">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge className={getComplexityColor(scenario.complexity)}>{scenario.complexity}复杂度</Badge>
                    </div>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">核心需求</h4>
                      <div className="flex flex-wrap gap-1">
                        {scenario.requirements.map((req) => (
                          <Badge key={req} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">推荐方案</h4>
                      <div className="flex flex-wrap gap-1">
                        {scenario.solutions.map((solution) => (
                          <Badge key={solution} variant="secondary" className="text-xs">
                            {solution}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">应用示例</h4>
                      <div className="text-xs text-muted-foreground">{scenario.examples.join(" • ")}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>认证方案对比表</CardTitle>
              <CardDescription>不同场景下认证方案的适用性对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-3 text-left">认证方式</th>
                      <th className="border border-gray-200 p-3 text-center">企业级</th>
                      <th className="border border-gray-200 p-3 text-center">电商</th>
                      <th className="border border-gray-200 p-3 text-center">游戏</th>
                      <th className="border border-gray-200 p-3 text-center">教育</th>
                      <th className="border border-gray-200 p-3 text-center">医疗</th>
                      <th className="border border-gray-200 p-3 text-center">金融</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "用户名密码", scores: ["⭐⭐", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐"] },
                      { name: "OAuth 2.0", scores: ["⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐"] },
                      {
                        name: "双因子认证",
                        scores: ["⭐⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
                      },
                      { name: "生物识别", scores: ["⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"] },
                      { name: "SAML/SSO", scores: ["⭐⭐⭐⭐⭐", "⭐", "⭐", "⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"] },
                      { name: "魔法链接", scores: ["⭐⭐", "⭐⭐⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐"] },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-25" : ""}>
                        <td className="border border-gray-200 p-3 font-medium">{row.name}</td>
                        {row.scores.map((score, i) => (
                          <td key={i} className="border border-gray-200 p-3 text-center text-sm">
                            {score}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">⭐ 评分说明：1星=不推荐，3星=适用，5星=强烈推荐</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>实施步骤指南</CardTitle>
                <CardDescription>按照以下步骤实施认证系统</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-medium">阶段一：需求分析</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>识别用户类型和使用场景</li>
                      <li>评估安全要求和合规需求</li>
                      <li>分析现有系统和技术栈</li>
                      <li>确定预算和时间限制</li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">阶段二：方案设计</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>选择合适的认证方式</li>
                      <li>设计用户体验流程</li>
                      <li>规划安全防护措施</li>
                      <li>制定数据保护策略</li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">阶段三：技术实现</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>搭建认证服务基础架构</li>
                      <li>集成第三方认证服务</li>
                      <li>实现前端认证界面</li>
                      <li>配置安全中间件</li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">阶段四：测试部署</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>进行安全测试和渗透测试</li>
                      <li>执行用户体验测试</li>
                      <li>部署到生产环境</li>
                      <li>监控和持续优化</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>常见挑战与解决方案</CardTitle>
                <CardDescription>实施过程中可能遇到的问题及应对策略</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      challenge: "用户体验与安全性平衡",
                      solution: "采用渐进式安全策略，根据风险等级调整认证要求",
                    },
                    {
                      challenge: "多系统集成复杂性",
                      solution: "使用标准协议(OAuth 2.0, SAML)，建立统一的身份管理平台",
                    },
                    {
                      challenge: "合规性要求",
                      solution: "提前了解相关法规，设计符合GDPR、等保等要求的系统",
                    },
                    {
                      challenge: "性能和可扩展性",
                      solution: "使用缓存、负载均衡，设计无状态的认证架构",
                    },
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-sm">{item.challenge}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.solution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/api/auth/best-practices">查看最佳实践 →</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/api/auth">返回认证API</Link>
        </Button>
      </div>
    </div>
  )
}
