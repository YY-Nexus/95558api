import { Key, Lock, Shield, UserCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthApiPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">认证与授权 API</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用认证与授权API集成代码和示例</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>OAuth 2.0</CardTitle>
              <CardDescription>OAuth 2.0授权流程</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              OAuth 2.0是一种授权框架，允许第三方应用获取对用户账户的有限访问权限，无需获取用户的密码。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/auth/oauth2" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>JWT认证</CardTitle>
              <CardDescription>JSON Web Token认证</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              JWT是一种开放标准，用于在各方之间安全地传输信息，可用于身份验证和信息交换。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/auth/jwt" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>基本认证</CardTitle>
              <CardDescription>HTTP基本认证</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              HTTP基本认证是一种简单的认证机制，通过HTTP头部传输用户名和密码进行身份验证。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/auth/basic" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>RBAC权限</CardTitle>
              <CardDescription>基于角色的访问控制</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              RBAC是一种根据用户在组织中的角色来管理对系统资源的访问权限的方法。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/auth/rbac" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
