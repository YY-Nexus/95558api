import { Key, Lock, Shield, UserCheck, Smartphone, Fingerprint, QrCode, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AuthApiPage() {
  const authMethods = [
    {
      id: "oauth2",
      title: "OAuth 2.0",
      description: "第三方授权登录，支持GitHub、微信、Google等",
      icon: Key,
      path: "/api/auth/oauth2",
      tags: ["第三方登录", "授权"],
      difficulty: "中级",
      popularity: "高",
    },
    {
      id: "jwt",
      title: "JWT认证",
      description: "基于令牌的无状态认证系统",
      icon: Lock,
      path: "/api/auth/jwt",
      tags: ["令牌", "无状态"],
      difficulty: "中级",
      popularity: "高",
    },
    {
      id: "basic",
      title: "基本认证",
      description: "HTTP基本认证，简单快速的认证方式",
      icon: UserCheck,
      path: "/api/auth/basic",
      tags: ["HTTP", "简单"],
      difficulty: "初级",
      popularity: "中",
    },
    {
      id: "rbac",
      title: "RBAC权限",
      description: "基于角色的访问控制系统",
      icon: Shield,
      path: "/api/auth/rbac",
      tags: ["权限", "角色"],
      difficulty: "高级",
      popularity: "高",
    },
    {
      id: "2fa",
      title: "双因子认证",
      description: "增强安全性的双重验证机制",
      icon: Smartphone,
      path: "/api/auth/2fa",
      tags: ["安全", "双重验证"],
      difficulty: "高级",
      popularity: "中",
    },
    {
      id: "biometric",
      title: "生物识别",
      description: "指纹、面部识别等生物特征认证",
      icon: Fingerprint,
      path: "/api/auth/biometric",
      tags: ["生物识别", "现代"],
      difficulty: "高级",
      popularity: "低",
    },
    {
      id: "qr-login",
      title: "扫码登录",
      description: "二维码扫描登录，适用于移动端",
      icon: QrCode,
      path: "/api/auth/qr-login",
      tags: ["二维码", "移动端"],
      difficulty: "中级",
      popularity: "中",
    },
    {
      id: "magic-link",
      title: "魔法链接",
      description: "无密码邮件链接登录",
      icon: Mail,
      path: "/api/auth/magic-link",
      tags: ["无密码", "邮件"],
      difficulty: "中级",
      popularity: "中",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "初级":
        return "bg-green-100 text-green-800"
      case "中级":
        return "bg-yellow-100 text-yellow-800"
      case "高级":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "高":
        return "bg-blue-100 text-blue-800"
      case "中":
        return "bg-purple-100 text-purple-800"
      case "低":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-blue-accent-800">认��与授权 API</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          启智云枢³ 提供全面的认证解决方案，从基础的用户名密码到先进的生物识别，满足各种安全需求
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild>
            <Link href="/api/auth/demo">🎮 交互式演示</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/api/auth/scenarios">📋 应用场景</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/api/auth/best-practices">⭐ 最佳实践</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {authMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <Card key={method.id} className="card-hover group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="rounded-full p-3 bg-blue-accent-50 text-blue-accent-600 group-hover:bg-blue-accent-100 transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex gap-1">
                    <Badge className={getDifficultyColor(method.difficulty)}>{method.difficulty}</Badge>
                    <Badge className={getPopularityColor(method.popularity)}>{method.popularity}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{method.title}</CardTitle>
                <CardDescription className="text-sm">{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-1">
                  {method.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Link href={method.path} className="w-full">
                  <Button className="w-full" variant="outline" size="sm">
                    查看详情 →
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">🚀 快速开始</CardTitle>
            <CardDescription>5分钟内集成认证系统</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">
              选择适合您项目的认证方式，跟随我们的分步指南，快速集成到您的应用中。
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/api/auth/quick-start">开始集成</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">🛡️ 安全指南</CardTitle>
            <CardDescription>保护您的应用安全</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">了解认证安全的最佳实践，防范常见攻击，确保用户数据安全。</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/api/auth/security">安全指南</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">🎯 选择指南</CardTitle>
            <CardDescription>找到最适合的认证方案</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">不确定选择哪种认证方式？我们的选择指南帮您找到最适合的解决方案。</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/api/auth/selector">选择指南</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
