"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { QrCode, Smartphone, Mail, Key, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AuthDemoPage() {
  const [activeDemo, setActiveDemo] = useState("oauth")
  const [demoState, setDemoState] = useState<Record<string, any>>({})

  const updateDemoState = (key: string, value: any) => {
    setDemoState((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">🎮 认证系统交互式演示</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          通过实际操作体验各种认证方式的工作流程，了解用户体验和技术实现
        </p>
      </div>

      <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
          <TabsTrigger value="jwt">JWT认证</TabsTrigger>
          <TabsTrigger value="2fa">双因子认证</TabsTrigger>
          <TabsTrigger value="magic">魔法链接</TabsTrigger>
        </TabsList>

        <TabsContent value="oauth" className="mt-6">
          <OAuthDemo demoState={demoState} updateDemoState={updateDemoState} />
        </TabsContent>

        <TabsContent value="jwt" className="mt-6">
          <JWTDemo demoState={demoState} updateDemoState={updateDemoState} />
        </TabsContent>

        <TabsContent value="2fa" className="mt-6">
          <TwoFactorDemo demoState={demoState} updateDemoState={updateDemoState} />
        </TabsContent>

        <TabsContent value="magic" className="mt-6">
          <MagicLinkDemo demoState={demoState} updateDemoState={updateDemoState} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>💡 演示说明</CardTitle>
          <CardDescription>这些演示展示了认证流程的关键步骤</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">演示特点</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>模拟真实的用户交互流程</li>
                <li>展示关键的技术实现点</li>
                <li>包含错误处理和边界情况</li>
                <li>提供代码示例和最佳实践</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">学习目标</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>理解不同认证方式的工作原理</li>
                <li>体验用户在认证过程中的感受</li>
                <li>学习如何处理认证中的异常情况</li>
                <li>掌握认证系统的安全要点</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/api/auth/scenarios">查看实际应用场景 →</Link>
        </Button>
      </div>
    </div>
  )
}

function OAuthDemo({ demoState, updateDemoState }: any) {
  const [step, setStep] = useState(1)
  const [provider, setProvider] = useState("github")

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            OAuth 2.0 授权流程演示
          </CardTitle>
          <CardDescription>体验第三方登录的完整流程 - 步骤 {step}/5</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 1: 选择登录方式</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {["github", "google", "wechat"].map((p) => (
                  <Button
                    key={p}
                    variant={provider === p ? "default" : "outline"}
                    onClick={() => setProvider(p)}
                    className="h-12"
                  >
                    {p === "github" && "GitHub"}
                    {p === "google" && "Google"}
                    {p === "wechat" && "微信"}
                  </Button>
                ))}
              </div>
              <Alert>
                <AlertDescription>
                  用户点击"{provider === "github" ? "GitHub" : provider === "google" ? "Google" : "微信"}
                  "登录按钮，开始OAuth授权流程
                </AlertDescription>
              </Alert>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 2: 重定向到授权服务器</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-mono">
                  正在重定向到{" "}
                  {provider === "github"
                    ? "github.com"
                    : provider === "google"
                      ? "accounts.google.com"
                      : "open.weixin.qq.com"}
                  ...
                </p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                </div>
              </div>
              <Alert>
                <AlertDescription>
                  应用生成授权URL并重定向用户到
                  {provider === "github" ? "GitHub" : provider === "google" ? "Google" : "微信"}授权页面
                </AlertDescription>
              </Alert>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 3: 用户授权</h3>
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="text-center space-y-3">
                  <h4 className="font-medium">授权确认</h4>
                  <p className="text-sm text-muted-foreground">
                    云枢³ 想要访问您的{provider === "github" ? "GitHub" : provider === "google" ? "Google" : "微信"}
                    账户信息
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={nextStep}>
                      授权
                    </Button>
                    <Button size="sm" variant="outline">
                      取消
                    </Button>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertDescription>
                  用户在{provider === "github" ? "GitHub" : provider === "google" ? "Google" : "微信"}
                  页面确认授权，同意应用访问其账户信息
                </AlertDescription>
              </Alert>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 4: 获取授权码</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-mono">授权码: abc123def456...</p>
                <p className="text-sm text-muted-foreground mt-2">正在交换访问令牌...</p>
              </div>
              <Alert>
                <AlertDescription>授权服务器返回授权码，应用后端使用此码交换访问令牌</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 5: 登录成功</h3>
              <div className="border rounded-md p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">登录成功！</span>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    <strong>用户名:</strong> demo_user
                  </p>
                  <p>
                    <strong>邮箱:</strong> demo@example.com
                  </p>
                  <p>
                    <strong>头像:</strong> https://avatar.example.com/demo
                  </p>
                </div>
              </div>
              <Alert>
                <AlertDescription>应用获取用户信息，创建本地会话，用户成功登录</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              上一步
            </Button>
            <Badge variant="secondary">{step}/5</Badge>
            <Button onClick={nextStep} disabled={step === 5}>
              {step === 5 ? "完成" : "下一步"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function JWTDemo({ demoState, updateDemoState }: any) {
  const [step, setStep] = useState(1)
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [token, setToken] = useState("")

  const nextStep = () => {
    if (step === 1 && credentials.email && credentials.password) {
      setStep(2)
      // 模拟生成JWT
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      )
    } else if (step < 4) {
      setStep((prev) => prev + 1)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            JWT认证流程演示
          </CardTitle>
          <CardDescription>体验基于令牌的认证机制 - 步骤 {step}/4</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 1: 用户登录</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@example.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="输入密码"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>
              <Alert>
                <AlertDescription>用户输入邮箱和密码进行登录验证</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 2: 生成JWT令牌</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">生成的JWT令牌:</p>
                <div className="bg-white p-3 rounded border font-mono text-xs break-all">{token}</div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="text-center p-3 bg-red-50 rounded">
                  <p className="font-medium text-red-800">Header</p>
                  <p className="text-xs text-red-600">算法和类型</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="font-medium text-blue-800">Payload</p>
                  <p className="text-xs text-blue-600">用户信息</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <p className="font-medium text-green-800">Signature</p>
                  <p className="text-xs text-green-600">签名验证</p>
                </div>
              </div>
              <Alert>
                <AlertDescription>服务器验证凭据后，生成包含用户信息的JWT令牌</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 3: 令牌存储</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="border rounded p-3">
                  <h4 className="font-medium mb-2">HttpOnly Cookie</h4>
                  <p className="text-sm text-muted-foreground">安全存储，防止XSS攻击</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">推荐</Badge>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-medium mb-2">LocalStorage</h4>
                  <p className="text-sm text-muted-foreground">客户端存储，需要防护XSS</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">谨慎</Badge>
                </div>
              </div>
              <Alert>
                <AlertDescription>选择合适的存储方式，平衡安全性和可用性</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 4: 令牌验证</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">API请求示例:</p>
                <div className="bg-white p-3 rounded border font-mono text-xs">
                  <div>GET /api/user/profile</div>
                  <div className="text-blue-600">Authorization: Bearer {token.slice(0, 20)}...</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800">令牌验证成功，返回用户数据</span>
              </div>
              <Alert>
                <AlertDescription>每次API请求都会验证JWT令牌的有效性和完整性</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep((prev) => Math.max(prev - 1, 1))} disabled={step === 1}>
              上一步
            </Button>
            <Badge variant="secondary">{step}/4</Badge>
            <Button
              onClick={nextStep}
              disabled={step === 4 || (step === 1 && (!credentials.email || !credentials.password))}
            >
              {step === 4 ? "完成" : "下一步"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TwoFactorDemo({ demoState, updateDemoState }: any) {
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState("totp")
  const [code, setCode] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            双因子认证演示
          </CardTitle>
          <CardDescription>体验增强的安全认证流程 - 步骤 {step}/4</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 1: 选择2FA方式</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <Button
                  variant={method === "totp" ? "default" : "outline"}
                  onClick={() => setMethod("totp")}
                  className="h-16 flex-col"
                >
                  <Smartphone className="h-6 w-6 mb-1" />
                  <span>认证器应用</span>
                </Button>
                <Button
                  variant={method === "sms" ? "default" : "outline"}
                  onClick={() => setMethod("sms")}
                  className="h-16 flex-col"
                >
                  <Mail className="h-6 w-6 mb-1" />
                  <span>短信验证</span>
                </Button>
                <Button
                  variant={method === "email" ? "default" : "outline"}
                  onClick={() => setMethod("email")}
                  className="h-16 flex-col"
                >
                  <Mail className="h-6 w-6 mb-1" />
                  <span>邮件验证</span>
                </Button>
              </div>
              <Alert>
                <AlertDescription>选择您偏好的双因子认证方式</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 2: 设置2FA</h3>
              {method === "totp" && (
                <div className="text-center space-y-3">
                  <div className="inline-block p-4 bg-white border rounded">
                    <QrCode className="h-32 w-32 mx-auto" />
                  </div>
                  <p className="text-sm">使用认证器应用扫描二维码</p>
                </div>
              )}
              {method === "sms" && (
                <div className="space-y-3">
                  <Label htmlFor="phone">手机号码</Label>
                  <Input id="phone" placeholder="+86 138 0013 8000" />
                  <Button className="w-full">发送验证码</Button>
                </div>
              )}
              {method === "email" && (
                <div className="space-y-3">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input id="email" placeholder="demo@example.com" />
                  <Button className="w-full">发送验证码</Button>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 3: 验证设置</h3>
              <div className="space-y-3">
                <Label htmlFor="code">验证码</Label>
                <Input
                  id="code"
                  placeholder="输入6位验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Alert>
                <AlertDescription>
                  输入从{method === "totp" ? "认证器应用" : method === "sms" ? "短信" : "邮件"}中获取的验证码
                </AlertDescription>
              </Alert>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 4: 2FA启用成功</h3>
              <div className="border rounded-md p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">双因子认证已启用</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>备用恢复码:</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <div className="bg-white p-2 rounded border">A1B2-C3D4</div>
                    <div className="bg-white p-2 rounded border">E5F6-G7H8</div>
                    <div className="bg-white p-2 rounded border">I9J0-K1L2</div>
                    <div className="bg-white p-2 rounded border">M3N4-O5P6</div>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertDescription>请将备用恢复码保存在安全的地方，每个码只能使用一次</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep((prev) => Math.max(prev - 1, 1))} disabled={step === 1}>
              上一步
            </Button>
            <Badge variant="secondary">{step}/4</Badge>
            <Button onClick={() => setStep((prev) => Math.min(prev + 1, 4))} disabled={step === 4}>
              {step === 4 ? "完成" : "下一步"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MagicLinkDemo({ demoState, updateDemoState }: any) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            魔法链接登录演示
          </CardTitle>
          <CardDescription>体验无密码的邮件链接登录 - 步骤 {step}/3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 1: 输入邮箱</h3>
              <div className="space-y-3">
                <Label htmlFor="magic-email">邮箱地址</Label>
                <Input
                  id="magic-email"
                  type="email"
                  placeholder="demo@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button className="w-full" onClick={() => email && setStep(2)} disabled={!email}>
                  发送魔法链接
                </Button>
              </div>
              <Alert>
                <AlertDescription>输入您的邮箱地址，我们将发送一个安全的登录链接</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 2: 检查邮件</h3>
              <div className="text-center space-y-4">
                <div className="inline-block p-6 bg-blue-50 rounded-full">
                  <Mail className="h-12 w-12 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">邮件已发送！</p>
                  <p className="text-sm text-muted-foreground">我们已向 {email} 发送了登录链接</p>
                </div>
                <div className="bg-muted p-4 rounded-md text-left">
                  <p className="text-sm font-medium mb-2">邮件内容预览:</p>
                  <div className="bg-white p-3 rounded border text-xs">
                    <div className="font-medium">云枢³ 登录链接</div>
                    <div className="mt-2">点击下方链接登录您的账户：</div>
                    <div className="mt-1 text-blue-600 underline">https://yunshub.com/auth/magic?token=abc123...</div>
                    <div className="mt-2 text-gray-500">此链接10分钟内有效</div>
                  </div>
                </div>
                <Button onClick={() => setStep(3)}>模拟点击邮件链接</Button>
              </div>
              <Alert>
                <AlertDescription>检查您的邮箱（包括垃圾邮件文件夹），点击登录链接</AlertDescription>
              </Alert>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">步骤 3: 登录成功</h3>
              <div className="border rounded-md p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">魔法链接登录成功！</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>用户:</strong> {email}
                  </p>
                  <p>
                    <strong>登录时间:</strong> {new Date().toLocaleString()}
                  </p>
                  <p>
                    <strong>会话有效期:</strong> 7天
                  </p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="font-medium text-blue-800">安全性</p>
                  <p className="text-xs text-blue-600">链接一次性使用</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <p className="font-medium text-green-800">便利性</p>
                  <p className="text-xs text-green-600">无需记住密码</p>
                </div>
              </div>
              <Alert>
                <AlertDescription>魔法链接验证成功，用户已安全登录系统</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep((prev) => Math.max(prev - 1, 1))} disabled={step === 1}>
              上一步
            </Button>
            <Badge variant="secondary">{step}/3</Badge>
            <Button onClick={() => setStep((prev) => Math.min(prev + 1, 3))} disabled={step === 3}>
              {step === 3 ? "完成" : "下一步"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
