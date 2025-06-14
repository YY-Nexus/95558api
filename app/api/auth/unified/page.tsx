"use client"

import { Smartphone, Monitor, Server, Cloud, Zap, Shield, Users, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function UnifiedAuthPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          📱 跨平台统一认证
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          一套认证体系，多端无缝体验 - 构建现代化的统一身份认证平台
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/unified/demo">🎮 体验演示</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/unified/sdk">📦 SDK集成</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/unified/architecture">🏗️ 架构设计</Link>
          </Button>
        </div>
      </div>

      {/* 平台支持概览 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 w-fit mx-auto">
              <Monitor className="h-6 w-6" />
            </div>
            <CardTitle className="text-blue-800">Web应用</CardTitle>
            <CardDescription>现代化Web认证体验</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>集成度</span>
                <span className="font-medium">98%</span>
              </div>
              <Progress value={98} className="h-2" />
              <div className="flex flex-wrap gap-1 mt-3">
                <Badge variant="secondary" className="text-xs">
                  React
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Vue
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Angular
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit mx-auto">
              <Smartphone className="h-6 w-6" />
            </div>
            <CardTitle className="text-green-800">移动应用</CardTitle>
            <CardDescription>原生移动端认证</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>集成度</span>
                <span className="font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
              <div className="flex flex-wrap gap-1 mt-3">
                <Badge variant="secondary" className="text-xs">
                  iOS
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Android
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Flutter
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-purple-100 text-purple-600 w-fit mx-auto">
              <Server className="h-6 w-6" />
            </div>
            <CardTitle className="text-purple-800">API服务</CardTitle>
            <CardDescription>RESTful API认证</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>集成度</span>
                <span className="font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="flex flex-wrap gap-1 mt-3">
                <Badge variant="secondary" className="text-xs">
                  REST
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  GraphQL
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  gRPC
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-orange-100 text-orange-600 w-fit mx-auto">
              <Cloud className="h-6 w-6" />
            </div>
            <CardTitle className="text-orange-800">微服务</CardTitle>
            <CardDescription>分布式服务认证</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>集成度</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex flex-wrap gap-1 mt-3">
                <Badge variant="secondary" className="text-xs">
                  Docker
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  K8s
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Istio
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 统一认证架构 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            统一认证架构图
          </CardTitle>
          <CardDescription>多端统一的身份认证和授权体系</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* 客户端层 */}
            <div className="space-y-4">
              <h3 className="font-medium text-center">客户端层</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Web应用</span>
                  </div>
                  <div className="text-xs text-blue-600 space-y-1">
                    <div>• React/Vue/Angular SDK</div>
                    <div>• 浏览器指纹识别</div>
                    <div>• WebAuthn支持</div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">移动应用</span>
                  </div>
                  <div className="text-xs text-green-600 space-y-1">
                    <div>• iOS/Android SDK</div>
                    <div>• 生物识别认证</div>
                    <div>• 设备绑定验证</div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800">API客户端</span>
                  </div>
                  <div className="text-xs text-purple-600 space-y-1">
                    <div>• REST/GraphQL SDK</div>
                    <div>• API密钥管理</div>
                    <div>• 速率限制控制</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 网关层 */}
            <div className="space-y-4">
              <h3 className="font-medium text-center">认证网关层</h3>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-indigo-600" />
                    <span className="font-medium text-indigo-800">统一网关</span>
                  </div>
                  <div className="text-xs text-indigo-600 space-y-1">
                    <div>• 请求路由分发</div>
                    <div>• 协议转换适配</div>
                    <div>• 负载均衡</div>
                  </div>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-cyan-600" />
                    <span className="font-medium text-cyan-800">认证中心</span>
                  </div>
                  <div className="text-xs text-cyan-600 space-y-1">
                    <div>• 多因子认证</div>
                    <div>• 令牌生成验证</div>
                    <div>• 会话管理</div>
                  </div>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-teal-600" />
                    <span className="font-medium text-teal-800">授权中心</span>
                  </div>
                  <div className="text-xs text-teal-600 space-y-1">
                    <div>• 权限策略引擎</div>
                    <div>• 角色管理</div>
                    <div>• 访问控制</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 服务层 */}
            <div className="space-y-4">
              <h3 className="font-medium text-center">后端服务层</h3>
              <div className="space-y-3">
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="h-4 w-4 text-rose-600" />
                    <span className="font-medium text-rose-800">用户服务</span>
                  </div>
                  <div className="text-xs text-rose-600 space-y-1">
                    <div>• 用户信息管理</div>
                    <div>• 账户生命周期</div>
                    <div>• 个人资料维护</div>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-amber-800">安全服务</span>
                  </div>
                  <div className="text-xs text-amber-600 space-y-1">
                    <div>• 风险评估</div>
                    <div>• 异常检测</div>
                    <div>• 安全审计</div>
                  </div>
                </div>
                <div className="p-3 bg-lime-50 rounded-lg border border-lime-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="h-4 w-4 text-lime-600" />
                    <span className="font-medium text-lime-800">业务服务</span>
                  </div>
                  <div className="text-xs text-lime-600 space-y-1">
                    <div>• 业务逻辑处理</div>
                    <div>• 数据访问控制</div>
                    <div>• 服务间通信</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SDK集成指南 */}
      <Tabs defaultValue="web" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="web">Web SDK</TabsTrigger>
          <TabsTrigger value="mobile">移动端 SDK</TabsTrigger>
          <TabsTrigger value="api">API SDK</TabsTrigger>
          <TabsTrigger value="microservice">微服务 SDK</TabsTrigger>
        </TabsList>

        <TabsContent value="web" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  React SDK 集成
                </CardTitle>
                <CardDescription>在React应用中快速集成统一认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">安装依赖</h4>
                  <code className="text-sm bg-black text-green-400 p-2 rounded block">
                    npm install @yunshub/auth-react
                  </code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">基础配置</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import { AuthProvider } from '@yunshub/auth-react'

function App() {
  return (
    <AuthProvider
      domain="auth.yunshub.com"
      clientId="your-client-id"
      redirectUri={window.location.origin}
    >
      <YourApp />
    </AuthProvider>
  )
}`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">使用认证</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import { useAuth } from '@yunshub/auth-react'

function LoginButton() {
  const { login, logout, user, isAuthenticated } = useAuth()
  
  return isAuthenticated ? (
    <button onClick={logout}>退出登录</button>
  ) : (
    <button onClick={login}>登录</button>
  )
}`}
                  </pre>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/unified/sdk/react">查看完整文档</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-green-600" />
                  Vue SDK 集成
                </CardTitle>
                <CardDescription>在Vue应用中快速集成统一认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">安装依赖</h4>
                  <code className="text-sm bg-black text-green-400 p-2 rounded block">
                    npm install @yunshub/auth-vue
                  </code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">插件注册</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import { createApp } from 'vue'
import { createAuthPlugin } from '@yunshub/auth-vue'

const app = createApp(App)

app.use(createAuthPlugin({
  domain: 'auth.yunshub.com',
  clientId: 'your-client-id',
  redirectUri: window.location.origin
}))

app.mount('#app')`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">组件中使用</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`<template>
  <div>
    <button v-if="!isAuthenticated" @click="login">
      登录
    </button>
    <button v-else @click="logout">
      退出登录 ({{ user.name }})
    </button>
  </div>
</template>

<script setup>
import { useAuth } from '@yunshub/auth-vue'

const { login, logout, user, isAuthenticated } = useAuth()
</script>`}
                  </pre>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/unified/sdk/vue">查看完整文档</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  iOS SDK 集成
                </CardTitle>
                <CardDescription>在iOS应用中集成统一认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">CocoaPods 安装</h4>
                  <code className="text-sm bg-black text-green-400 p-2 rounded block">pod 'YunshubAuth', '~> 2.0'</code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Swift 配置</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import YunshubAuth

class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, 
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        YunshubAuth.configure(
            domain: "auth.yunshub.com",
            clientId: "your-ios-client-id"
        )
        
        return true
    }
}`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">登录实现</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import YunshubAuth

class LoginViewController: UIViewController {
    @IBAction func loginTapped(_ sender: UIButton) {
        YunshubAuth.shared.login(from: self) { result in
            switch result {
            case .success(let user):
                print("登录成功: \(user.name)")
            case .failure(let error):
                print("登录失败: \(error)")
            }
        }
    }
}`}
                  </pre>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/unified/sdk/ios">查看完整文档</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  Android SDK 集成
                </CardTitle>
                <CardDescription>在Android应用中集成统一认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Gradle 依赖</h4>
                  <pre className="text-xs bg-black text-green-400 p-2 rounded">
                    {`dependencies {
    implementation 'com.yunshub:auth-android:2.0.0'
}`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Application 配置</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import com.yunshub.auth.YunshubAuth;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        YunshubAuth.configure(this, 
            "auth.yunshub.com", 
            "your-android-client-id"
        );
    }
}`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Activity 中使用</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`import com.yunshub.auth.YunshubAuth;

public class MainActivity extends AppCompatActivity {
    private void login() {
        YunshubAuth.getInstance()
            .login(this)
            .subscribe(
                user -> {
                    Log.d("Auth", "登录成功: " + user.getName());
                },
                error -> {
                    Log.e("Auth", "登录失败", error);
                }
            );
    }
}`}
                  </pre>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/unified/sdk/android">查看完整文档</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-purple-600" />
                  Node.js SDK 集成
                </CardTitle>
                <CardDescription>在Node.js后端服务中集成认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">NPM 安装</h4>
                  <code className="text-sm bg-black text-green-400 p-2 rounded block">
                    npm install @yunshub/auth-node
                  </code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Express 中间件</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`const express = require('express')
const { authMiddleware } = require('@yunshub/auth-node')

const app = express()

// 配置认证中间件
app.use(authMiddleware({
  domain: 'auth.yunshub.com',
  audience: 'your-api-identifier',
  algorithms: ['RS256']
}))

// 受保护的路由
app.get('/api/protected', (req, res) => {
  res.json({ 
    message: '认证成功',
    user: req.user 
  })
})`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">令牌验证</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`const { verifyToken } = require('@yunshub/auth-node')

async function validateRequest(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const user = await verifyToken(token)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: '认证失败' })
  }
}`}
                  </pre>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/unified/sdk/nodejs">查看完整文档</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-orange-600" />
                  Python SDK 集成
                </CardTitle>
                <CardDescription>在Python后端服务中集成认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Pip 安装</h4>
                  <code className="text-sm bg-black text-green-400 p-2 rounded block">pip install yunshub-auth</code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Flask 集成</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`from flask import Flask, request, jsonify
from yunshub_auth import YunshubAuth, require_auth

app = Flask(__name__)

# 配置认证
auth = YunshubAuth(
    domain='auth.yunshub.com',
    audience='your-api-identifier'
)

@app.route('/api/protected')
@require_auth
def protected():
    user = request.current_user
    return jsonify({
        'message': '认证成功',
        'user': user
    })`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Django 集成</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`from django.http import JsonResponse
from yunshub_auth.django import auth_required

@auth_required
def protected_view(request):
    return JsonResponse({
        'message': '认证成功',
        'user': request.user.to_dict()
    })`}
                  </pre>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/unified/sdk/python">查看完整文档</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="microservice" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-indigo-600" />
                  Kubernetes 集成
                </CardTitle>
                <CardDescription>在K8s环境中部署统一认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Helm Chart 安装</h4>
                  <pre className="text-xs bg-black text-green-400 p-2 rounded">
                    {`helm repo add yunshub https://charts.yunshub.com
helm install auth yunshub/unified-auth`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">ConfigMap 配置</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`apiVersion: v1
kind: ConfigMap
metadata:
  name: auth-config
data:
  AUTH_DOMAIN: "auth.yunshub.com"
  AUTH_AUDIENCE: "k8s-cluster"
  AUTH_ALGORITHMS: "RS256"
  REDIS_URL: "redis://redis:6379"
  DB_URL: "postgresql://user:pass@db:5432/auth"`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Ingress 配置</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: auth-ingress
  annotations:
    nginx.ingress.kubernetes.io/auth-url: "http://auth-service/verify"
    nginx.ingress.kubernetes.io/auth-signin: "https://auth.yunshub.com/login"
spec:
  rules:
  - host: api.yunshub.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80`}
                  </pre>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/unified/k8s">查看部署指南</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-teal-600" />
                  Service Mesh 集成
                </CardTitle>
                <CardDescription>在Istio服务网格中集成认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">RequestAuthentication</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-auth
spec:
  jwtRules:
  - issuer: "https://auth.yunshub.com"
    jwksUri: "https://auth.yunshub.com/.well-known/jwks.json"
    audiences:
    - "api.yunshub.com"`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">AuthorizationPolicy</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: require-jwt
spec:
  rules:
  - from:
    - source:
        requestPrincipals: ["https://auth.yunshub.com/*"]
  - to:
    - operation:
        methods: ["GET", "POST"]`}
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">EnvoyFilter 配置</h4>
                  <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto">
                    {`apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: jwt-auth-filter
spec:
  configPatches:
  - applyTo: HTTP_FILTER
    match:
      context: SIDECAR_INBOUND
      listener:
        filterChain:
          filter:
            name: "envoy.filters.network.http_connection_manager"
    patch:
      operation: INSERT_BEFORE
      value:
        name: envoy.filters.http.jwt_authn
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.http.jwt_authn.v3.JwtAuthentication`}
                  </pre>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/unified/istio">查看Istio配置</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 统一认证优势 */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 统一认证核心优势</CardTitle>
          <CardDescription>为什么选择跨平台统一认证解决方案</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <div className="rounded-full p-3 bg-blue-100 text-blue-600 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-medium">统一用户体验</h3>
              <p className="text-sm text-muted-foreground">
                用户在不同平台和设备上享受一致的认证体验，减少学习成本，提升用户满意度。
              </p>
              <ul className="text-xs space-y-1">
                <li>• 一次登录，多端通用</li>
                <li>• 统一的界面设计语言</li>
                <li>• 无缝的跨设备切换</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-medium">增强安全性</h3>
              <p className="text-sm text-muted-foreground">
                集中化的安全策略管理，统一的威胁检测和响应，全面提升系统安全防护能力。
              </p>
              <ul className="text-xs space-y-1">
                <li>• 统一的安全策略执行</li>
                <li>• 集中化的威胁监控</li>
                <li>• 快速的安全响应</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-full p-3 bg-purple-100 text-purple-600 w-fit">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-medium">开发效率</h3>
              <p className="text-sm text-muted-foreground">
                标准化的SDK和API，简化集成流程，让开发团队专注于业务逻辑而非认证实现。
              </p>
              <ul className="text-xs space-y-1">
                <li>• 快速集成部署</li>
                <li>• 丰富的SDK支持</li>
                <li>• 完善的开发文档</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-full p-3 bg-orange-100 text-orange-600 w-fit">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="font-medium">运维简化</h3>
              <p className="text-sm text-muted-foreground">
                集中化的用户管理，统一的监控和日志，大幅降低系统运维复杂度和成本。
              </p>
              <ul className="text-xs space-y-1">
                <li>• 集中化用户管理</li>
                <li>• 统一监控告警</li>
                <li>• 简化故障排查</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-full p-3 bg-cyan-100 text-cyan-600 w-fit">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-medium">可扩展性</h3>
              <p className="text-sm text-muted-foreground">
                云原生架构设计，支持水平扩展，轻松应对业务增长和用户规模扩大的需求。
              </p>
              <ul className="text-xs space-y-1">
                <li>• 弹性伸缩能力</li>
                <li>• 多区域部署</li>
                <li>• 高可用保障</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-full p-3 bg-rose-100 text-rose-600 w-fit">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="font-medium">合规支持</h3>
              <p className="text-sm text-muted-foreground">
                内置GDPR、CCPA等法规支持，帮助企业满足各种合规要求，降低法律风险。
              </p>
              <ul className="text-xs space-y-1">
                <li>• GDPR合规支持</li>
                <li>• 数据本地化</li>
                <li>• 审计日志完整</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
