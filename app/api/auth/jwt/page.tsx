import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JwtPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">JWT认证</h1>
        <p className="text-muted-foreground mt-2">JSON Web Token认证实现指南和示例代码</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>注意</AlertTitle>
        <AlertDescription>JWT密钥应妥善保管，不要在客户端代码中暴露。建议使用环境变量存储密钥。</AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>JWT认证概述</CardTitle>
            <CardDescription>JSON Web Token的工作原理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              JWT(JSON Web Token)是一种开放标准(RFC
              7519)，它定义了一种紧凑且自包含的方式，用于在各方之间安全地传输信息作为JSON对象。
            </p>

            <h3 className="text-lg font-medium">JWT的结构</h3>
            <p>JWT由三部分组成，以点(.)分隔：</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Header</strong> - 包含令牌类型和使用的签名算法
              </li>
              <li>
                <strong>Payload</strong> - 包含声明(claims)，即实体(用户)和其他数据的声明
              </li>
              <li>
                <strong>Signature</strong> - 用于验证消息在传输过程中没有被更改
              </li>
            </ol>

            <h3 className="text-lg font-medium mt-4">JWT的优势</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>无状态，服务器不需要存储会话信息</li>
              <li>可以在不同域之间使用</li>
              <li>支持移动应用程序</li>
              <li>性能好，减少数据库查询</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现步骤</CardTitle>
            <CardDescription>在Next.js中实现JWT认证</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">步骤 1: 安装依赖</h3>
            <div className="bg-muted p-3 rounded-md font-mono text-sm">npm install jsonwebtoken</div>

            <h3 className="text-lg font-medium mt-4">步骤 2: 配置环境变量</h3>
            <div className="bg-muted p-3 rounded-md font-mono text-sm">JWT_SECRET=your_jwt_secret_key</div>

            <h3 className="text-lg font-medium mt-4">步骤 3: 创建JWT工具函数</h3>
            <p>创建一个工具文件来处理JWT的签发和验证：</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>代码示例</CardTitle>
          <CardDescription>JWT认证实现代码</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
            <pre>{`// lib/jwt.ts
import jwt from 'jsonwebtoken';

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET!;

// 签发JWT
export function signJwt(payload: object, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
    ...options,
  });
}

// 验证JWT
export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    return null;
  }
}

// 登录API示例
// app/api/auth/login/route.ts
export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // 验证用户凭据
  const user = await validateUser(email, password);
  
  if (!user) {
    return new Response(
      JSON.stringify({ error: '无效的凭据' }),
      { status: 401 }
    );
  }
  
  // 创建JWT
  const token = signJwt({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  
  // 设置cookie
  const response = new Response(JSON.stringify({ success: true }));
  response.headers.set(
    'Set-Cookie',
    \`token=\${token}; Path=/; HttpOnly; SameSite=Strict\`
  );
  
  return response;
}

// 中间件示例
// middleware.ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const payload = verifyJwt(token);
  
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};`}</pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>JWT安全最佳实践</CardTitle>
          <CardDescription>保护JWT免受常见攻击</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>使用强密钥并定期轮换</li>
            <li>设置合理的过期时间</li>
            <li>使用HTTPS传输JWT</li>
            <li>存储在HttpOnly cookie中，防止XSS攻击</li>
            <li>实现令牌撤销机制</li>
            <li>不要在JWT中存储敏感信息</li>
            <li>使用适当的签名算法(如HS256或RS256)</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/api/auth/oauth2">返回OAuth 2.0</Link>
        </Button>
        <Button asChild>
          <Link href="/api/auth/basic">下一步: 基本认证</Link>
        </Button>
      </div>
    </div>
  )
}
