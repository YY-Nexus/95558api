"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DynamicIcon } from "@/components/dynamic-icon"
import Link from "next/link"
import { apiCategories } from "@/data/api-data"

export default function ApiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API集成库</h1>
        <p className="text-muted-foreground">全面的API集成指南，帮助您快速接入各类服务和功能</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧API分类导航 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle>API分类</CardTitle>
              <CardDescription>按功能浏览API文档</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                {apiCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/api/${category.id}`}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <DynamicIcon name={category.icon} className="h-5 w-5 text-vibrant-cyan-500" />
                    <span>{category.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {category.apis.length}
                    </Badge>
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* 右侧API内容展示 */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="auth" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="auth">认证</TabsTrigger>
              <TabsTrigger value="payment">支付</TabsTrigger>
              <TabsTrigger value="storage">存储</TabsTrigger>
              <TabsTrigger value="notification">通知</TabsTrigger>
              <TabsTrigger value="map">地图</TabsTrigger>
            </TabsList>

            {/* 认证API */}
            <TabsContent value="auth" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">认证与授权</h2>
                <Button asChild variant="outline">
                  <Link href="/api/auth">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* GitHub OAuth */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="github" className="h-5 w-5" />
                        <CardTitle>GitHub OAuth</CardTitle>
                      </div>
                      <Badge>OAuth 2.0</Badge>
                    </div>
                    <CardDescription>使用GitHub账号登录您的应用</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要特点</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>支持标准OAuth 2.0流程</li>
                          <li>获取用户基本信息和邮箱</li>
                          <li>可选择请求仓库访问权限</li>
                          <li>支持状态验证防止CSRF攻击</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>创建GitHub OAuth应用</li>
                          <li>配置回调URL</li>
                          <li>实现授权请求</li>
                          <li>处理回调并获取令牌</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 1. 重定向用户到GitHub授权页面
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const redirectUrl = \`https://github.com/login/oauth/authorize?client_id=\${GITHUB_CLIENT_ID}&scope=user:email\`;

// 2. 处理回调并获取访问令牌
async function handleCallback(code) {
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  
  const { access_token } = await tokenResponse.json();
  return access_token;
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/auth/github">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* 微信登录 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="wechat" className="h-5 w-5 text-green-500" />
                        <CardTitle>微信登录</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        OAuth
                      </Badge>
                    </div>
                    <CardDescription>集成微信登录功能到您的应用</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要特点</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>支持网页和移动应用登录</li>
                          <li>获取用户基本信息和OpenID</li>
                          <li>支持静默授权和用户授权</li>
                          <li>可关联微信支付功能</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>注册微信开放平台账号</li>
                          <li>创建应用并获取AppID</li>
                          <li>配置回调域名</li>
                          <li>实现授权流程</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 1. 生成授权URL
const WECHAT_APP_ID = process.env.WECHAT_APP_ID;
const REDIRECT_URI = encodeURIComponent('https://your-app.com/api/auth/wechat/callback');
const authUrl = \`https://open.weixin.qq.com/connect/qrconnect?appid=\${WECHAT_APP_ID}&redirect_uri=\${REDIRECT_URI}&response_type=code&scope=snsapi_login\`;

// 2. 获取访问令牌
async function getAccessToken(code) {
  const tokenUrl = \`https://api.weixin.qq.com/sns/oauth2/access_token?appid=\${WECHAT_APP_ID}&secret=\${WECHAT_APP_SECRET}&code=\${code}&grant_type=authorization_code\`;
  
  const response = await fetch(tokenUrl);
  const data = await response.json();
  
  return {
    accessToken: data.access_token,
    openid: data.openid
  };
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/auth/wechat">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* JWT认证 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="key" className="h-5 w-5 text-yellow-500" />
                        <CardTitle>JWT认证</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Token
                      </Badge>
                    </div>
                    <CardDescription>基于JSON Web Token的认证系统</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要特点</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>无状态认证机制</li>
                          <li>支持跨域认证</li>
                          <li>可包含用户信息和权限</li>
                          <li>可设置过期时间</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>设置密钥和配置</li>
                          <li>实现令牌生成逻辑</li>
                          <li>实现令牌验证中间件</li>
                          <li>处理令牌刷新</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 生成JWT令牌
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return token;
}

// 验证JWT令牌
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, data: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/auth/jwt">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* 支付API */}
            <TabsContent value="payment" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">支付集成</h2>
                <Button asChild variant="outline">
                  <Link href="/api/payment">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* 支付宝 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="alipay" className="h-5 w-5 text-blue-500" />
                        <CardTitle>支付宝</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        支付
                      </Badge>
                    </div>
                    <CardDescription>集成支付宝支付功能</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">支持的支付方式</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>电脑网站支付</li>
                          <li>手机网站支付</li>
                          <li>APP支付</li>
                          <li>当面付（扫码支付）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>注册支付宝开放平台</li>
                          <li>创建应用并获取密钥</li>
                          <li>配置回调地址</li>
                          <li>实现支付和通知处理</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 创建支付宝支付订单
const AlipayFormData = require('alipay-sdk/lib/form').default;
const formData = new AlipayFormData();

formData.setMethod('get');
formData.addField('returnUrl', 'https://your-app.com/payment/return');
formData.addField('notifyUrl', 'https://your-app.com/api/payment/alipay/notify');
formData.addField('bizContent', {
  outTradeNo: '订单号',
  productCode: 'FAST_INSTANT_TRADE_PAY',
  totalAmount: '88.88',
  subject: '商品名称',
  body: '商品详情'
});

const result = await alipaySDK.exec(
  'alipay.trade.page.pay',
  {},
  { formData: formData }
);

// 返回支付链接
return result;`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/payment/alipay">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* 微信支付 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="wechat" className="h-5 w-5 text-green-500" />
                        <CardTitle>微信支付</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        支付
                      </Badge>
                    </div>
                    <CardDescription>集成微信支付功能</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">支持的支付方式</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>JSAPI支付（公众号支付）</li>
                          <li>Native支付（扫码支付）</li>
                          <li>APP支付</li>
                          <li>H5支付</li>
                          <li>小程序支付</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>注册微信支付商户号</li>
                          <li>配置API密钥和证书</li>
                          <li>设置支付回调地址</li>
                          <li>实现支付和通知处理</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 创建微信支付订单
const pay = require('wechatpay-node-v3');
const instance = new pay({
  appid: 'wx123456789',
  mchid: '1900000109',
  publicKey: fs.readFileSync('./apiclient_cert.pem'),
  privateKey: fs.readFileSync('./apiclient_key.pem'),
});

const params = {
  description: '商品描述',
  out_trade_no: '订单号',
  notify_url: 'https://your-app.com/api/payment/wechat/notify',
  amount: {
    total: 1,
    currency: 'CNY'
  },
  scene_info: {
    payer_client_ip: '127.0.0.1',
    h5_info: {
      type: 'Wap',
      app_name: '网页应用',
      app_url: 'https://your-app.com'
    }
  }
};

const result = await instance.transactions_h5(params);
return result.h5_url; // 返回支付链接`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/payment/wechat">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* 存储API */}
            <TabsContent value="storage" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">存储与数据库</h2>
                <Button asChild variant="outline">
                  <Link href="/api/storage">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* Vercel Blob */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="database" className="h-5 w-5 text-black" />
                        <CardTitle>Vercel Blob</CardTitle>
                      </div>
                      <Badge variant="outline">存储</Badge>
                    </div>
                    <CardDescription>使用Vercel Blob存储和管理文件</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要特点</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>全球分布式存储</li>
                          <li>自动CDN加速</li>
                          <li>支持图片优化</li>
                          <li>简单的API接口</li>
                          <li>安全的上传URL</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>安装@vercel/blob包</li>
                          <li>配置环境变量</li>
                          <li>实现上传和下载功能</li>
                          <li>管理文件生命周期</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 上传文件到Vercel Blob
import { put } from '@vercel/blob';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  
  if (!file) {
    return new Response('No file found', { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: 'public',
    contentType: file.type,
  });

  return Response.json({
    url: blob.url,
    size: blob.size,
  });
}

// 获取上传URL
import { getSignedUrl } from '@vercel/blob';

export async function GET() {
  const signedUrl = await getSignedUrl({
    pathname: 'avatar.png',
    contentType: 'image/png',
    access: 'public',
    expiresIn: 60, // 1分钟
  });

  return Response.json({ signedUrl });
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/storage/vercel-blob">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Supabase */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="database" className="h-5 w-5 text-green-500" />
                        <CardTitle>Supabase</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        数据库
                      </Badge>
                    </div>
                    <CardDescription>使用Supabase构建后端服务</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要特点</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>PostgreSQL数据库</li>
                          <li>实时订阅</li>
                          <li>身份验证</li>
                          <li>存储功能</li>
                          <li>边缘函数</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>创建Supabase项目</li>
                          <li>设计数据库表</li>
                          <li>配置身份验证</li>
                          <li>实现API调用</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 创建Supabase客户端
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 查询数据
async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

// 插入数据
async function createUser(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select();
    
  if (error) throw error;
  return data[0];
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/storage/supabase">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* 通知API */}
            <TabsContent value="notification" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">消息与通知</h2>
                <Button asChild variant="outline">
                  <Link href="/api/notification">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* 邮件发送 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="mail" className="h-5 w-5 text-blue-500" />
                        <CardTitle>邮件发送</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        通知
                      </Badge>
                    </div>
                    <CardDescription>集成邮件发送功能</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">支持的服务</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Resend</li>
                          <li>SendGrid</li>
                          <li>Mailchimp</li>
                          <li>Amazon SES</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>选择邮件服务提供商</li>
                          <li>创建API密钥</li>
                          <li>配置发件人信息</li>
                          <li>实现邮件发送功能</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码 (Resend)</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 使用Resend发送邮件
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(user) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@example.com',
      to: user.email,
      subject: '欢迎加入我们的平台',
      react: (
        <EmailTemplate 
          firstName={user.firstName}
          action={{
            text: '验证邮箱',
            link: \`https://example.com/verify?token=\${user.verificationToken}\`
          }}
        />
      ),
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/notification/email">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* 短信发送 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="message-square" className="h-5 w-5 text-green-500" />
                        <CardTitle>短信发送</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        通知
                      </Badge>
                    </div>
                    <CardDescription>集成短信发送功能</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">支持的服务</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>阿里云短信</li>
                          <li>腾讯云短信</li>
                          <li>Twilio</li>
                          <li>Vonage (Nexmo)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>选择短信服务提供商</li>
                          <li>创建API密钥</li>
                          <li>配置短信模板</li>
                          <li>实现短信发送功能</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码 (阿里云)</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 使用阿里云发送短信
const Core = require('@alicloud/pop-core');

const client = new Core({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

export async function sendVerificationCode(phone, code) {
  const params = {
    RegionId: "cn-hangzhou",
    PhoneNumbers: phone,
    SignName: "您的签名",
    TemplateCode: "SMS_123456789",
    TemplateParam: JSON.stringify({ code })
  };

  try {
    const result = await client.request('SendSms', params, { method: 'POST' });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/notification/sms">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* 地图API */}
            <TabsContent value="map" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">地图与位置</h2>
                <Button asChild variant="outline">
                  <Link href="/api/map">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* 高德地图 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="map" className="h-5 w-5 text-red-500" />
                        <CardTitle>高德地图</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        地图
                      </Badge>
                    </div>
                    <CardDescription>集成高德地图功能</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要功能</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>地图显示</li>
                          <li>地点搜索</li>
                          <li>路线规划</li>
                          <li>地理编码/逆地理编码</li>
                          <li>行政区划查询</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>注册高德开放平台</li>
                          <li>创建应用并获取Key</li>
                          <li>配置安全域名</li>
                          <li>集成地图SDK</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 前端集成高德地图
import { useEffect } from 'react';

export default function AMapComponent() {
  useEffect(() => {
    // 加载高德地图脚本
    const script = document.createElement('script');
    script.src = \`https://webapi.amap.com/maps?v=2.0&key=YOUR_AMAP_KEY\`;
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      // 创建地图实例
      const map = new window.AMap.Map('map-container', {
        zoom: 11,
        center: [116.397428, 39.90923],
      });
      
      // 添加标记
      const marker = new window.AMap.Marker({
        position: [116.397428, 39.90923],
        title: '北京市'
      });
      
      map.add(marker);
    };
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <div id="map-container" style={{ width: '100%', height: '400px' }}></div>
  );
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/map/amap">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* 腾讯地图 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name="map-pin" className="h-5 w-5 text-blue-500" />
                        <CardTitle>腾讯地图</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        地图
                      </Badge>
                    </div>
                    <CardDescription>集成腾讯地图功能</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">主要功能</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>地图显示</li>
                          <li>POI搜索</li>
                          <li>路线规划</li>
                          <li>地址解析</li>
                          <li>街景服务</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实现步骤</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>注册腾讯位置服务</li>
                          <li>创建应用并获取Key</li>
                          <li>配置安全域名</li>
                          <li>集成地图SDK</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">示例代码</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 前端集成腾讯地图
import { useEffect } from 'react';

export default function TMapComponent() {
  useEffect(() => {
    // 加载腾讯地图脚本
    const script = document.createElement('script');
    script.src = \`https://map.qq.com/api/gljs?v=1.exp&key=YOUR_TMAP_KEY\`;
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      // 创建地图实例
      const center = new window.TMap.LatLng(39.908802, 116.397502);
      const map = new window.TMap.Map('map-container', {
        center: center,
        zoom: 12,
        viewMode: '2D'
      });
      
      // 添加标记
      const marker = new window.TMap.MultiMarker({
        map: map,
        styles: {
          "marker": new window.TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 12.5, y: 35 },
            src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker.png'
          })
        },
        geometries: [{
          id: 'marker1',
          styleId: 'marker',
          position: center,
          properties: {
            title: '北京市'
          }
        }]
      });
    };
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <div id="map-container" style={{ width: '100%', height: '400px' }}></div>
  );
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button asChild variant="default">
                      <Link href="/api/map/tencent">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
