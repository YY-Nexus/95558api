import { Database, Key, Map, MessageSquare, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApiPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">API集成库</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用API集成代码和示例</p>
      </div>

      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="w-full justify-start mb-4 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="auth" className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700">
            <Key className="h-4 w-4 mr-2" />
            认证与授权
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            支付集成
          </TabsTrigger>
          <TabsTrigger
            value="storage"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700"
          >
            <Database className="h-4 w-4 mr-2" />
            存储与数据库
          </TabsTrigger>
          <TabsTrigger
            value="notification"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            消息与通知
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700">
            <Map className="h-4 w-4 mr-2" />
            地图与位置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>OAuth 2.0 集成</CardTitle>
                <CardDescription>使用OAuth 2.0授权流程进行用户认证</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-3 text-sm font-mono overflow-x-auto">
                  <pre>{`const clientId = 'YOUR_CLIENT_ID';
const redirectUri = encodeURIComponent('https://your-app.com/callback');
const scope = encodeURIComponent('profile email');
const authUrl = \`https://oauth-provider.com/authorize?client_id=\${clientId}&redirect_uri=\${redirectUri}&response_type=code&scope=\${scope}\`;

window.location.href = authUrl;`}</pre>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <Link href="/api/auth/oauth2" className="text-blue-accent-600 hover:underline text-sm">
                  查看详情
                </Link>
                <Button variant="ghost" size="sm">
                  复制代码
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>JWT 认证</CardTitle>
                <CardDescription>使用JSON Web Token进行API认证</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-3 text-sm font-mono overflow-x-auto">
                  <pre>{`// 后端: 生成JWT令牌
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// 前端: 使用JWT令牌
fetch('/api/protected', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
})`}</pre>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <Link href="/api/auth/jwt" className="text-blue-accent-600 hover:underline text-sm">
                  查看详情
                </Link>
                <Button variant="ghost" size="sm">
                  复制代码
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>基本认证</CardTitle>
                <CardDescription>使用HTTP基本认证进行API访问</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-3 text-sm font-mono overflow-x-auto">
                  <pre>{`// 创建基本认证头
const username = 'api_user';
const password = 'api_password';
const credentials = btoa(\`\${username}:\${password}\`);

fetch('/api/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`
  }
})`}</pre>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <Link href="/api/auth/basic" className="text-blue-accent-600 hover:underline text-sm">
                  查看详情
                </Link>
                <Button variant="ghost" size="sm">
                  复制代码
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>支付宝集成</CardTitle>
                <CardDescription>集成支付宝支付API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-3 text-sm font-mono overflow-x-auto">
                  <pre>{`// 服务端生成支付链接
const AlipaySDK = require('alipay-sdk');
const alipay = new AlipaySDK({
  appId: 'YOUR_APP_ID',
  privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
  gateway: 'https://openapi.alipay.com/gateway.do'
});

const result = await alipay.exec('alipay.trade.page.pay', {
  bizContent: {
    outTradeNo: '订单号',
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: '88.88',
    subject: '商品名称'
  }
});`}</pre>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <Link href="/api/payment/alipay" className="text-blue-accent-600 hover:underline text-sm">
                  查看详情
                </Link>
                <Button variant="ghost" size="sm">
                  复制代码
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 其他标签页内容类似 */}
      </Tabs>
    </div>
  )
}
