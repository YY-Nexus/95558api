import { Database, Key, Map, MessageSquare, CreditCard } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import Link from "next/link"

export default function ApiPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* 页面头部 */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <BrandLogo size="lg" showTagline={true} />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-vibrant-red-500 via-vibrant-cyan-500 to-vibrant-blue-500 bg-clip-text text-transparent">
            API集成库
          </h1>
          <p className="text-lg text-muted-foreground mt-2">言语云³ 常用API集成代码和示例</p>
        </div>
      </div>

      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-gradient-to-r from-vibrant-cyan-100 to-vibrant-blue-100 p-1 rounded-xl">
          <TabsTrigger
            value="auth"
            className="data-[state=active]:bg-white data-[state=active]:text-vibrant-blue-700 data-[state=active]:shadow-lg"
          >
            <Key className="h-4 w-4 mr-2" />
            认证与授权
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-white data-[state=active]:text-vibrant-green-700 data-[state=active]:shadow-lg"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            支付集成
          </TabsTrigger>
          <TabsTrigger
            value="storage"
            className="data-[state=active]:bg-white data-[state=active]:text-vibrant-purple-700 data-[state=active]:shadow-lg"
          >
            <Database className="h-4 w-4 mr-2" />
            存储与数据库
          </TabsTrigger>
          <TabsTrigger
            value="notification"
            className="data-[state=active]:bg-white data-[state=active]:text-vibrant-pink-700 data-[state=active]:shadow-lg"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            消息与通知
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-white data-[state=active]:text-vibrant-yellow-700 data-[state=active]:shadow-lg"
          >
            <Map className="h-4 w-4 mr-2" />
            地图与位置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="mt-0">
          <div className="space-y-6">
            {/* OAuth 2.0 集成卡片 - 横版布局 */}
            <Card className="card-hover overflow-hidden border-2 border-vibrant-cyan-200 bg-gradient-to-br from-white to-vibrant-cyan-50">
              <CardContent className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="lg:w-1/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-vibrant-cyan-100 rounded-lg">
                      <Key className="h-6 w-6 text-vibrant-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-vibrant-cyan-700">OAuth 2.0 集成</h3>
                  </div>
                  <p className="text-vibrant-cyan-600 leading-relaxed">
                    使用OAuth 2.0授权流程进行用户认证，支持多种第三方平台登录，确保用户数据安全。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-vibrant-cyan-100 text-vibrant-cyan-700 rounded-full text-xs font-medium">
                      安全认证
                    </span>
                    <span className="px-2 py-1 bg-vibrant-blue-100 text-vibrant-blue-700 rounded-full text-xs font-medium">
                      第三方登录
                    </span>
                    <span className="px-2 py-1 bg-vibrant-green-100 text-vibrant-green-700 rounded-full text-xs font-medium">
                      标准协议
                    </span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 text-sm font-mono overflow-x-auto border border-slate-200 shadow-inner">
                    <pre className="whitespace-pre-wrap break-words text-slate-700 leading-relaxed">{`const clientId = 'YOUR_CLIENT_ID';
const redirectUri = encodeURIComponent('https://your-app.com/callback');
const scope = encodeURIComponent('profile email');
const authUrl = \`https://oauth-provider.com/authorize?client_id=\${clientId}&redirect_uri=\${redirectUri}&response_type=code&scope=\${scope}\`;

// 重定向到授权页面
window.location.href = authUrl;

// 处理回调
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
if (code) {
  // 交换访问令牌
  const tokenResponse = await fetch('/api/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, clientId, redirectUri })
  });
}`}</pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gradient-to-r from-vibrant-cyan-50 to-vibrant-blue-50 flex justify-between items-center px-6 py-4">
                <Link
                  href="/api/auth/oauth2"
                  className="text-vibrant-cyan-600 hover:text-vibrant-cyan-700 font-medium hover:underline flex items-center gap-2"
                >
                  <span>查看详情</span>
                  <span className="text-xs">→</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-vibrant-cyan-300 text-vibrant-cyan-700 hover:bg-vibrant-cyan-100 transition-all duration-200"
                >
                  复制代码
                </Button>
              </CardFooter>
            </Card>

            {/* JWT 认证卡片 - 横版布局 */}
            <Card className="card-hover overflow-hidden border-2 border-vibrant-blue-200 bg-gradient-to-br from-white to-vibrant-blue-50">
              <CardContent className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="lg:w-1/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-vibrant-blue-100 rounded-lg">
                      <Database className="h-6 w-6 text-vibrant-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-vibrant-blue-700">JWT 认证</h3>
                  </div>
                  <p className="text-vibrant-blue-600 leading-relaxed">
                    使用JSON Web Token进行API认证，无状态认证方案，支持分布式系统。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-vibrant-blue-100 text-vibrant-blue-700 rounded-full text-xs font-medium">
                      无状态
                    </span>
                    <span className="px-2 py-1 bg-vibrant-purple-100 text-vibrant-purple-700 rounded-full text-xs font-medium">
                      分布式
                    </span>
                    <span className="px-2 py-1 bg-vibrant-cyan-100 text-vibrant-cyan-700 rounded-full text-xs font-medium">
                      安全令牌
                    </span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 text-sm font-mono overflow-x-auto border border-slate-200 shadow-inner">
                    <pre className="whitespace-pre-wrap break-words text-slate-700 leading-relaxed">{`// 后端: 生成JWT令牌
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { 
    userId: user.id,
    email: user.email,
    role: user.role 
  },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// 前端: 使用JWT令牌
const response = await fetch('/api/protected', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

// 验证令牌
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('用户信息:', decoded);`}</pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gradient-to-r from-vibrant-blue-50 to-vibrant-purple-50 flex justify-between items-center px-6 py-4">
                <Link
                  href="/api/auth/jwt"
                  className="text-vibrant-blue-600 hover:text-vibrant-blue-700 font-medium hover:underline flex items-center gap-2"
                >
                  <span>查看详情</span>
                  <span className="text-xs">→</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-vibrant-blue-300 text-vibrant-blue-700 hover:bg-vibrant-blue-100 transition-all duration-200"
                >
                  复制代码
                </Button>
              </CardFooter>
            </Card>

            {/* 基本认证卡片 - 横版布局 */}
            <Card className="card-hover overflow-hidden border-2 border-vibrant-green-200 bg-gradient-to-br from-white to-vibrant-green-50">
              <CardContent className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="lg:w-1/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-vibrant-green-100 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-vibrant-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-vibrant-green-700">基本认证</h3>
                  </div>
                  <p className="text-vibrant-green-600 leading-relaxed">
                    使用HTTP基本认证进行API访问，简单直接的认证方式，适用于内部系统。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-vibrant-green-100 text-vibrant-green-700 rounded-full text-xs font-medium">
                      简单易用
                    </span>
                    <span className="px-2 py-1 bg-vibrant-yellow-100 text-vibrant-yellow-700 rounded-full text-xs font-medium">
                      HTTP标准
                    </span>
                    <span className="px-2 py-1 bg-vibrant-red-100 text-vibrant-red-700 rounded-full text-xs font-medium">
                      内部系统
                    </span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 text-sm font-mono overflow-x-auto border border-slate-200 shadow-inner">
                    <pre className="whitespace-pre-wrap break-words text-slate-700 leading-relaxed">{`// 创建基本认证头
const username = 'api_user';
const password = 'api_password';
const credentials = btoa(\`\${username}:\${password}\`);

// 发送认证请求
const response = await fetch('/api/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
    'Content-Type': 'application/json'
  }
});

// 服务端验证
const authHeader = req.headers.authorization;
if (authHeader && authHeader.startsWith('Basic ')) {
  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString();
  const [username, password] = credentials.split(':');
  // 验证用户名和密码
}`}</pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gradient-to-r from-vibrant-green-50 to-vibrant-yellow-50 flex justify-between items-center px-6 py-4">
                <Link
                  href="/api/auth/basic"
                  className="text-vibrant-green-600 hover:text-vibrant-green-700 font-medium hover:underline flex items-center gap-2"
                >
                  <span>查看详情</span>
                  <span className="text-xs">→</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-vibrant-green-300 text-vibrant-green-700 hover:bg-vibrant-green-100 transition-all duration-200"
                >
                  复制代码
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="mt-0">
          <div className="space-y-6">
            <Card className="card-hover overflow-hidden border-2 border-vibrant-yellow-200 bg-gradient-to-br from-white to-vibrant-yellow-50">
              <CardContent className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="lg:w-1/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-vibrant-yellow-100 rounded-lg">
                      <CreditCard className="h-6 w-6 text-vibrant-yellow-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-vibrant-yellow-700">支付宝集成</h3>
                  </div>
                  <p className="text-vibrant-yellow-600 leading-relaxed">
                    集成支付宝支付API，支持网页支付、手机支付等多种支付方式。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-vibrant-yellow-100 text-vibrant-yellow-700 rounded-full text-xs font-medium">
                      在线支付
                    </span>
                    <span className="px-2 py-1 bg-vibrant-orange-100 text-vibrant-orange-700 rounded-full text-xs font-medium">
                      移动支付
                    </span>
                    <span className="px-2 py-1 bg-vibrant-red-100 text-vibrant-red-700 rounded-full text-xs font-medium">
                      安全可靠
                    </span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 text-sm font-mono overflow-x-auto border border-slate-200 shadow-inner">
                    <pre className="whitespace-pre-wrap break-words text-slate-700 leading-relaxed">{`// 服务端生成支付链接
const AlipaySDK = require('alipay-sdk');
const alipay = new AlipaySDK({
  appId: 'YOUR_APP_ID',
  privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
  gateway: 'https://openapi.alipay.com/gateway.do'
});

const result = await alipay.exec('alipay.trade.page.pay', {
  bizContent: {
    outTradeNo: '订单号_' + Date.now(),
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: '88.88',
    subject: '商品名称',
    body: '商品详细描述'
  }
});

// 前端跳转到支付页面
window.open(result);`}</pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gradient-to-r from-vibrant-yellow-50 to-vibrant-red-50 flex justify-between items-center px-6 py-4">
                <Link
                  href="/api/payment/alipay"
                  className="text-vibrant-yellow-600 hover:text-vibrant-yellow-700 font-medium hover:underline flex items-center gap-2"
                >
                  <span>查看详情</span>
                  <span className="text-xs">→</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-vibrant-yellow-300 text-vibrant-yellow-700 hover:bg-vibrant-yellow-100 transition-all duration-200"
                >
                  复制代码
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 其他标签页内容保持类似的横版布局结构 */}
      </Tabs>
    </div>
  )
}
