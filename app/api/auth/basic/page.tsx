import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BasicAuthPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HTTP基本认证</h1>
        <p className="text-muted-foreground mt-2">HTTP基本认证实现指南和示例代码</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>安全警告</AlertTitle>
        <AlertDescription>
          基本认证应始终与HTTPS一起使用，否则凭据将以明文形式传输。不建议在生产环境中单独使用基本认证。
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>基本认证概述</CardTitle>
            <CardDescription>HTTP基本认证的工作原理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>HTTP基本认证是一种简单的认证机制，客户端通过HTTP头部发送用户名和密码进行身份验证。</p>

            <h3 className="text-lg font-medium">认证流程</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>客户端请求受保护的资源</li>
              <li>服务器返回401状态码和WWW-Authenticate头</li>
              <li>客户端发送包含Authorization头的请求，格式为"Basic base64(username:password)"</li>
              <li>服务器验证凭据并返回请求的资源或401错误</li>
            </ol>

            <h3 className="text-lg font-medium mt-4">基本认证的局限性</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>凭据在每个请求中发送</li>
              <li>没有内置的令牌过期机制</li>
              <li>不支持单点登录</li>
              <li>需要HTTPS保护传输安全</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现步骤</CardTitle>
            <CardDescription>在Next.js中实现基本认证</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">步骤 1: 创建认证中间件</h3>
            <p>在Next.js中，您可以创建一个中间件来处理基本认证：</p>

            <h3 className="text-lg font-medium mt-4">步骤 2: 验证凭据</h3>
            <p>解析Authorization头并验证用户名和密码：</p>

            <h3 className="text-lg font-medium mt-4">步骤 3: 保护路由</h3>
            <p>配置中间件以保护特定路由：</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>代码示例</CardTitle>
          <CardDescription>基本认证实现代码</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
            <pre>{`// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 受保护的路径
const PROTECTED_PATHS = ['/api/admin', '/api/private'];

// 基本认证中间件
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 检查是否是受保护的路径
  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname.startsWith(path)
  );
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  // 获取Authorization头
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // 没有提供凭据，返回401和WWW-Authenticate头
    return new NextResponse(null, {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"',
      },
    });
  }
  
  // 解码凭据
  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');
    
    // 验证凭据（在实际应用中，应该查询数据库或其他存储）
    if (username === 'admin' && password === 'password') {
      // 凭据有效，继续请求
      return NextResponse.next();
    }
  } catch (error) {
    console.error('Basic auth error:', error);
  }
  
  // 凭据无效，返回401
  return new NextResponse(null, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Area"',
    },
  });
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/private/:path*'],
};

// 客户端使用示例
async function fetchProtectedResource() {
  const username = 'admin';
  const password = 'password';
  const credentials = btoa(\`\${username}:\${password}\`);
  
  const response = await fetch('/api/admin/resource', {
    headers: {
      'Authorization': \`Basic \${credentials}\`,
    },
  });
  
  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    console.error('认证失败');
  } else {
    console.error('请求失败:', response.status);
  }
}`}</pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>安全最佳实践</CardTitle>
          <CardDescription>使用基本认证的安全建议</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>始终与HTTPS一起使用</li>
            <li>使用强密码并定期更改</li>
            <li>限制失败尝试次数，防止暴力攻击</li>
            <li>考虑与其他认证方法结合使用</li>
            <li>对敏感API使用更强大的认证机制</li>
            <li>实现IP限制或地理位置检查</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/api/auth/jwt">返回JWT认证</Link>
        </Button>
        <Button asChild>
          <Link href="/api/auth/rbac">下一步: RBAC权限</Link>
        </Button>
      </div>
    </div>
  )
}
