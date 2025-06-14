import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Github, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OAuth2Page() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OAuth 2.0 集成</h1>
        <p className="text-muted-foreground mt-2">OAuth 2.0授权流程集成指南和示例代码</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>注意</AlertTitle>
        <AlertDescription>在使用OAuth 2.0之前，您需要在相应的平台注册应用并获取客户端ID和密钥。</AlertDescription>
      </Alert>

      <Tabs defaultValue="github" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="github">
            <Github className="mr-2 h-4 w-4" />
            GitHub OAuth
          </TabsTrigger>
          <TabsTrigger value="wechat">
            <MessageSquare className="mr-2 h-4 w-4" />
            微信登录
          </TabsTrigger>
        </TabsList>
        <TabsContent value="github">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>GitHub OAuth 2.0 集成</CardTitle>
                <CardDescription>使用GitHub账号登录您的应用</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">步骤 1: 注册GitHub OAuth应用</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    前往{" "}
                    <Link
                      href="https://github.com/settings/applications/new"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      GitHub Developer Settings
                    </Link>
                  </li>
                  <li>填写应用名称、主页URL和授权回调URL</li>
                  <li>注册后获取Client ID和Client Secret</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">步骤 2: 配置环境变量</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  GITHUB_CLIENT_ID=your_client_id
                  <br />
                  GITHUB_CLIENT_SECRET=your_client_secret
                  <br />
                  NEXT_PUBLIC_APP_URL=https://your-app-url.com
                </div>

                <h3 className="text-lg font-medium mt-4">步骤 3: 实现授权流程</h3>
                <p>以下是GitHub OAuth流程的实现代码：</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码示例</CardTitle>
                <CardDescription>GitHub OAuth 2.0实现代码</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// 1. 授权请求 - app/api/auth/github/route.ts
export async function GET(request) {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const REDIRECT_URI = \`\${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback\`;
  
  // 生成随机state参数
  const state = Math.random().toString(36).substring(2);
  
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'user:email',
    state: state,
  });
  
  // 设置state到cookie用于验证
  const response = NextResponse.redirect(
    \`https://github.com/login/oauth/authorize?\${params}\`
  );
  response.cookies.set('oauth_state', state);
  
  return response;
}

// 2. 回调处理 - app/api/auth/github/callback/route.ts
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  // 验证state参数
  const storedState = request.cookies.get('oauth_state')?.value;
  if (state !== storedState) {
    return NextResponse.redirect('/auth?error=invalid_state');
  }
  
  // 交换访问令牌
  const tokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );
  
  const tokenData = await tokenResponse.json();
  
  // 获取用户信息
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: \`Bearer \${tokenData.access_token}\`,
    },
  });
  
  const userData = await userResponse.json();
  
  // 创建会话并重定向
  const session = createSession(userData);
  const response = NextResponse.redirect('/');
  response.cookies.set('session', session);
  
  return response;
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="wechat">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>微信登录集成</CardTitle>
                <CardDescription>使用微信账号登录您的应用</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">步骤 1: 注册微信开放平台应用</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    前往{" "}
                    <Link href="https://open.weixin.qq.com/" className="text-blue-600 hover:underline" target="_blank">
                      微信开放平台
                    </Link>
                  </li>
                  <li>创建网站应用并完成审核</li>
                  <li>获取AppID和AppSecret</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">步骤 2: 配置环境变量</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  WECHAT_APP_ID=your_app_id
                  <br />
                  WECHAT_APP_SECRET=your_app_secret
                  <br />
                  NEXT_PUBLIC_APP_URL=https://your-app-url.com
                </div>

                <h3 className="text-lg font-medium mt-4">步骤 3: 实现授权流程</h3>
                <p>以下是微信登录流程的实现代码：</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码示例</CardTitle>
                <CardDescription>微信登录实现代码</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// 1. 授权请求 - app/api/auth/wechat/route.ts
export async function GET(request) {
  const WECHAT_APP_ID = process.env.WECHAT_APP_ID;
  const REDIRECT_URI = encodeURIComponent(
    \`\${process.env.NEXT_PUBLIC_APP_URL}/api/auth/wechat/callback\`
  );
  
  // 生成随机state参数
  const state = Math.random().toString(36).substring(2);
  
  // 微信扫码登录URL
  const authUrl = \`https://open.weixin.qq.com/connect/qrconnect?appid=\${WECHAT_APP_ID}&redirect_uri=\${REDIRECT_URI}&response_type=code&scope=snsapi_login&state=\${state}#wechat_redirect\`;
  
  // 设置state到cookie用于验证
  const response = NextResponse.redirect(authUrl);
  response.cookies.set('oauth_state', state);
  
  return response;
}

// 2. 回调处理 - app/api/auth/wechat/callback/route.ts
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  // 验证state参数
  const storedState = request.cookies.get('oauth_state')?.value;
  if (state !== storedState) {
    return NextResponse.redirect('/auth?error=invalid_state');
  }
  
  // 获取访问令牌
  const tokenUrl = \`https://api.weixin.qq.com/sns/oauth2/access_token?appid=\${process.env.WECHAT_APP_ID}&secret=\${process.env.WECHAT_APP_SECRET}&code=\${code}&grant_type=authorization_code\`;
  
  const tokenResponse = await fetch(tokenUrl);
  const tokenData = await tokenResponse.json();
  
  if (tokenData.errcode) {
    return NextResponse.redirect('/auth?error=token_error');
  }
  
  // 获取用户信息
  const userUrl = \`https://api.weixin.qq.com/sns/userinfo?access_token=\${tokenData.access_token}&openid=\${tokenData.openid}&lang=zh_CN\`;
  
  const userResponse = await fetch(userUrl);
  const userData = await userResponse.json();
  
  // 创建会话并重定向
  const session = createSession(userData);
  const response = NextResponse.redirect('/');
  response.cookies.set('session', session);
  
  return response;
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>安全最佳实践</CardTitle>
          <CardDescription>实现OAuth 2.0时的安全建议</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>始终使用HTTPS保护所有OAuth请求和回调</li>
            <li>使用state参数防止CSRF攻击</li>
            <li>验证所有回调参数</li>
            <li>安全存储客户端密钥，不要在前端暴露</li>
            <li>实现令牌刷新机制</li>
            <li>限制授权范围(scope)，只请求必要的权限</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/api/auth">返回认证API</Link>
        </Button>
        <Button asChild>
          <Link href="/api/auth/jwt">下一步: JWT认证</Link>
        </Button>
      </div>
    </div>
  )
}
