"use client"

import { Key, Mail, Cloud, Shield, CheckCircle, AlertTriangle, Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function EnvConfigGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          🔐 环境变量配置指南
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          详细解释三个核心环境变量的作用、配置方法和安全最佳实践
        </p>
      </div>

      {/* 环境变量概览 */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center">
            <div className="rounded-full p-4 bg-blue-100 text-blue-600 w-fit mx-auto">
              <Mail className="h-8 w-8" />
            </div>
            <CardTitle className="text-blue-800">RESEND_API_KEY</CardTitle>
            <CardDescription>邮件服务API密钥</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>用户邮箱验证</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>密码重置邮件</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>系统通知推送</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>安全异常提醒</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center">
            <div className="rounded-full p-4 bg-orange-100 text-orange-600 w-fit mx-auto">
              <Key className="h-8 w-8" />
            </div>
            <CardTitle className="text-orange-800">ALIYUN_ACCESS_KEY_ID</CardTitle>
            <CardDescription>阿里云访问密钥ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>OSS对象存储</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>CDN内容分发</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>短信验证服务</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>AI智能服务</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="text-center">
            <div className="rounded-full p-4 bg-purple-100 text-purple-600 w-fit mx-auto">
              <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="text-purple-800">ALIYUN_ACCESS_KEY_SECRET</CardTitle>
            <CardDescription>阿里云访问密钥</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>API签名验证</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>权限控制管理</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>安全传输保障</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>审计追踪记录</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细配置指南 */}
      <Tabs defaultValue="resend" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resend">Resend 邮件服务</TabsTrigger>
          <TabsTrigger value="aliyun-id">阿里云 Access Key ID</TabsTrigger>
          <TabsTrigger value="aliyun-secret">阿里云 Access Key Secret</TabsTrigger>
        </TabsList>

        <TabsContent value="resend" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  RESEND_API_KEY 配置
                </CardTitle>
                <CardDescription>Resend 邮件服务 API 密钥配置指南</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">🎯 主要用途</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span>用户注册邮箱验证</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <Key className="h-4 w-4 text-green-600" />
                      <span>密码重置邮件发送</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span>安全异常登录通知</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span>系统重要通知推送</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">🔧 获取步骤</h4>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">1</span>
                      <span>
                        访问{" "}
                        <a
                          href="https://resend.com"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Resend官网
                        </a>{" "}
                        注册账户
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">2</span>
                      <span>完成邮箱验证和域名配置</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">3</span>
                      <span>在控制台创建新的 API Key</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">4</span>
                      <span>复制生成的密钥到环境变量</span>
                    </li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">💡 配置示例</h4>
                  <div className="bg-black text-green-400 p-3 rounded text-sm font-mono">
                    <div className="flex items-center justify-between">
                      <span>RESEND_API_KEY=re_123456789abcdef_your_key</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard("RESEND_API_KEY=re_123456789abcdef_your_key", "resend")}
                      >
                        {copiedKey === "resend" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-green-600" />
                  邮件服务集成示例
                </CardTitle>
                <CardDescription>在应用中使用 Resend 发送邮件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">📧 验证邮件发送</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="text-xs overflow-x-auto">
                      {`import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(
  email: string, 
  token: string
) {
  const { data, error } = await resend.emails.send({
    from: 'noreply@yunshub.com',
    to: [email],
    subject: '验证您的邮箱地址',
    html: \`
      <h2>欢迎注册云枢³平台！</h2>
      <p>请点击下方链接验证您的邮箱：</p>
      <a href="\${process.env.NEXT_PUBLIC_APP_URL}/verify?token=\${token}">
        验证邮箱
      </a>
    \`
  })
  
  return { success: !error, data, error }
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">🔒 密码重置邮件</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="text-xs overflow-x-auto">
                      {`export async function sendPasswordResetEmail(
  email: string, 
  resetToken: string
) {
  const { data, error } = await resend.emails.send({
    from: 'security@yunshub.com',
    to: [email],
    subject: '重置您的密码',
    html: \`
      <h2>密码重置请求</h2>
      <p>我们收到了您的密码重置请求。</p>
      <a href="\${process.env.NEXT_PUBLIC_APP_URL}/reset?token=\${resetToken}">
        重置密码
      </a>
      <p>如果您没有请求重置密码，请忽略此邮件。</p>
    \`
  })
  
  return { success: !error, data, error }
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800">高可靠性</Badge>
                  <Badge className="bg-blue-100 text-blue-800">快速送达</Badge>
                  <Badge className="bg-purple-100 text-purple-800">详细统计</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aliyun-id" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-orange-600" />
                  ALIYUN_ACCESS_KEY_ID 配置
                </CardTitle>
                <CardDescription>阿里云访问密钥 ID 配置指南</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">🎯 主要用途</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <Cloud className="h-4 w-4 text-blue-600" />
                      <span>OSS 对象存储服务</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <Key className="h-4 w-4 text-green-600" />
                      <span>CDN 内容分发网络</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                      <Mail className="h-4 w-4 text-purple-600" />
                      <span>SMS 短信验证服务</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span>AI 人工智能服务</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">🔧 获取步骤</h4>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">1</span>
                      <span>
                        登录{" "}
                        <a
                          href="https://ecs.console.aliyun.com"
                          className="text-orange-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          阿里云控制台
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">2</span>
                      <span>进入 "访问控制" → "用户管理"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">3</span>
                      <span>创建子用户或使用主账户</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">4</span>
                      <span>生成 AccessKey 并记录 ID</span>
                    </li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">💡 配置示例</h4>
                  <div className="bg-black text-green-400 p-3 rounded text-sm font-mono">
                    <div className="flex items-center justify-between">
                      <span>ALIYUN_ACCESS_KEY_ID=LTAI5t6A7B8C9D0E1F2G3H4I</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard("ALIYUN_ACCESS_KEY_ID=LTAI5t6A7B8C9D0E1F2G3H4I", "aliyun-id")}
                      >
                        {copiedKey === "aliyun-id" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">安全提醒</p>
                      <p className="text-yellow-700">请为不同环境使用不同的密钥，并定期轮换更新。</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  阿里云服务集成示例
                </CardTitle>
                <CardDescription>在应用中使用阿里云各项服务</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">📁 OSS 文件上传</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="text-xs overflow-x-auto">
                      {`import OSS from 'ali-oss'

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID!,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET!,
  bucket: 'yunshub-storage'
})

export async function uploadFile(file: File, path: string) {
  try {
    const result = await client.put(path, file)
    return {
      success: true,
      url: result.url,
      name: result.name
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">📱 SMS 短信发送</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="text-xs overflow-x-auto">
                      {`import Core from '@alicloud/pop-core'

const client = new Core({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID!,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET!,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

export async function sendSMS(phone: string, code: string) {
  const params = {
    PhoneNumbers: phone,
    SignName: '云枢平台',
    TemplateCode: 'SMS_123456789',
    TemplateParam: JSON.stringify({ code })
  }
  
  const result = await client.request('SendSms', params, {
    method: 'POST'
  })
  
  return {
    success: result.Code === 'OK',
    message: result.Message
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge className="bg-blue-100 text-blue-800">高性能</Badge>
                  <Badge className="bg-green-100 text-green-800">全球覆盖</Badge>
                  <Badge className="bg-purple-100 text-purple-800">安全可靠</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aliyun-secret" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  ALIYUN_ACCESS_KEY_SECRET 配置
                </CardTitle>
                <CardDescription>阿里云访问密钥 Secret 安全配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">🎯 主要用途</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span>API 签名验证</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <Key className="h-4 w-4 text-blue-600" />
                      <span>权限控制管理</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>安全传输保障</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span>审计追踪记录</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">🔧 获取方式</h4>
                  <div className="text-sm space-y-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="font-medium text-blue-800">与 ACCESS_KEY_ID 配对生成</p>
                      <p className="text-blue-600">在创建 AccessKey 时同时生成，两者必须配对使用</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="font-medium text-yellow-800">仅显示一次</p>
                      <p className="text-yellow-600">Secret 只在创建时显示，请务必妥善保存</p>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <p className="font-medium text-red-800">遗失需重新生成</p>
                      <p className="text-red-600">如果遗失需要重新生成新的密钥对</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">💡 配置示例</h4>
                  <div className="bg-black text-green-400 p-3 rounded text-sm font-mono">
                    <div className="flex items-center justify-between">
                      <span>ALIYUN_ACCESS_KEY_SECRET=5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(
                            "ALIYUN_ACCESS_KEY_SECRET=5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C",
                            "aliyun-secret",
                          )
                        }
                      >
                        {copiedKey === "aliyun-secret" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  安全最佳实践
                </CardTitle>
                <CardDescription>环境变量安全管理建议</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">🔒 密钥安全管理</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">❌ 错误做法</p>
                        <code className="text-red-600">const apiKey = "re_123456789abcdef"</code>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">✅ 正确做法</p>
                        <code className="text-green-600">const apiKey = process.env.RESEND_API_KEY</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">🎯 权限最小化原则</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>为不同环境使用不同的密钥</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>定期轮换访问密钥</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>只授予必要的服务权限</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>监控密钥使用情况</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">🔐 环境隔离配置</h4>
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="text-xs overflow-x-auto">
                      {`# 开发环境 (.env.development)
RESEND_API_KEY=re_dev_key_here
ALIYUN_ACCESS_KEY_ID=dev_access_key_id
ALIYUN_ACCESS_KEY_SECRET=dev_access_key_secret

# 生产环境 (.env.production)
RESEND_API_KEY=re_prod_key_here
ALIYUN_ACCESS_KEY_ID=prod_access_key_id
ALIYUN_ACCESS_KEY_SECRET=prod_access_key_secret`}
                    </pre>
                  </div>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-red-800">重要提醒</p>
                      <p className="text-red-700">绝不要将密钥提交到代码仓库，使用 .gitignore 忽略 .env 文件</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 监控与告警 */}
      <Card>
        <CardHeader>
          <CardTitle>📊 服务监控与告警</CardTitle>
          <CardDescription>环境变量对应服务的监控和异常告警配置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-medium">📧 Resend 邮件监控</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm">邮件发送成功率</span>
                  <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">今日发送量</span>
                  <Badge className="bg-blue-100 text-blue-800">1,247</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span className="text-sm">平均响应时间</span>
                  <Badge className="bg-yellow-100 text-yellow-800">0.8s</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">☁️ 阿里云 OSS 监控</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">存储使用量</span>
                  <Badge className="bg-blue-100 text-blue-800">1.2TB</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm">请求成功率</span>
                  <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm">CDN 流量</span>
                  <Badge className="bg-purple-100 text-purple-800">500GB</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">📱 短信服务监控</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm">短信发送成功率</span>
                  <Badge className="bg-green-100 text-green-800">99.2%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">今日发送量</span>
                  <Badge className="bg-blue-100 text-blue-800">856</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="text-sm">平均到达时间</span>
                  <Badge className="bg-orange-100 text-orange-800">3.2s</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
