# 🔐 环境变量配置指南

## 📧 RESEND_API_KEY - 邮件服务配置

### 作用说明
`RESEND_API_KEY` 是 Resend 邮件服务的 API 密钥，用于发送各种系统邮件：

#### 🎯 **核心功能**
- **用户注册验证邮件** - 发送邮箱验证链接
- **密码重置邮件** - 发送密码重置链接  
- **登录安全通知** - 异常登录提醒
- **系统通知邮件** - 重要系统消息推送
- **营销邮件** - 产品更新、活动通知

#### 🔧 **获取方式**
1. 访问 [Resend官网](https://resend.com)
2. 注册账户并完成邮箱验证
3. 在控制台创建 API Key
4. 复制生成的密钥到环境变量

#### 💡 **配置示例**
\`\`\`bash
RESEND_API_KEY=re_123456789abcdef_your_actual_key_here
\`\`\`

#### 🚀 **使用场景**
- 用户注册流程中的邮箱验证
- 忘记密码时的重置邮件
- 账户安全异常时的通知邮件
- 系统维护通知和产品更新

---

## ☁️ ALIYUN_ACCESS_KEY_ID - 阿里云访问密钥ID

### 作用说明
`ALIYUN_ACCESS_KEY_ID` 是阿里云服务的访问密钥标识符，用于身份认证：

#### 🎯 **核心功能**
- **对象存储 OSS** - 文件上传下载管理
- **内容分发 CDN** - 静态资源加速分发
- **短信服务 SMS** - 验证码和通知短信
- **人工智能服务** - 图像识别、语音处理
- **云数据库服务** - 数据库连接和管理

#### 🔧 **获取方式**
1. 登录 [阿里云控制台](https://ecs.console.aliyun.com)
2. 进入 "访问控制" → "用户管理"
3. 创建子用户或使用主账户
4. 生成 AccessKey 并记录 ID

#### 💡 **配置示例**
\`\`\`bash
ALIYUN_ACCESS_KEY_ID=LTAI5t6A7B8C9D0E1F2G3H4I
\`\`\`

#### 🚀 **使用场景**
- 用户头像、文档等文件上传到OSS
- 静态资源通过CDN加速访问
- 发送手机验证码和通知短信
- AI功能如图片识别、内容审核

---

## 🔑 ALIYUN_ACCESS_KEY_SECRET - 阿里云访问密钥

### 作用说明
`ALIYUN_ACCESS_KEY_SECRET` 是与 ACCESS_KEY_ID 配对的密钥，用于API调用签名：

#### 🎯 **核心功能**
- **API签名验证** - 确保请求来源合法
- **权限控制** - 控制可访问的服务范围
- **安全传输** - 保证数据传输安全性
- **审计追踪** - 记录API调用日志

#### 🔧 **获取方式**
1. 与 ACCESS_KEY_ID 同时生成
2. 只在创建时显示一次，需妥善保存
3. 如遗失需重新生成新的密钥对

#### 💡 **配置示例**
\`\`\`bash
ALIYUN_ACCESS_KEY_SECRET=5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C
\`\`\`

#### 🚀 **使用场景**
- 与 ACCESS_KEY_ID 配合完成身份验证
- 生成API请求签名
- 访问阿里云各项服务
- 确保云服务调用的安全性

---

## 🛡️ 安全配置建议

### 🔒 **密钥安全管理**
\`\`\`bash
# ❌ 错误做法 - 不要在代码中硬编码
const apiKey = "re_123456789abcdef"

# ✅ 正确做法 - 使用环境变量
const apiKey = process.env.RESEND_API_KEY
\`\`\`

### 🎯 **权限最小化原则**
- 为不同环境使用不同的密钥
- 定期轮换访问密钥
- 只授予必要的服务权限
- 监控密钥使用情况

### 🔐 **环境隔离**
\`\`\`bash
# 开发环境
RESEND_API_KEY=re_dev_key_here
ALIYUN_ACCESS_KEY_ID=dev_access_key_id
ALIYUN_ACCESS_KEY_SECRET=dev_access_key_secret

# 生产环境  
RESEND_API_KEY=re_prod_key_here
ALIYUN_ACCESS_KEY_ID=prod_access_key_id
ALIYUN_ACCESS_KEY_SECRET=prod_access_key_secret
\`\`\`

---

## 🚀 集成示例代码

### 📧 **Resend 邮件发送**
\`\`\`typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@yunshub.com',
      to: [email],
      subject: '验证您的邮箱地址',
      html: `
        <h2>欢迎注册云枢³平台！</h2>
        <p>请点击下方链接验证您的邮箱：</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}">
          验证邮箱
        </a>
      `
    })
    
    if (error) {
      console.error('邮件发送失败:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('邮件服务异常:', error)
    return { success: false, error }
  }
}
\`\`\`

### ☁️ **阿里云 OSS 文件上传**
\`\`\`typescript
import OSS from 'ali-oss'

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
    console.error('文件上传失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
\`\`\`

### 📱 **阿里云短信服务**
\`\`\`typescript
import Core from '@alicloud/pop-core'

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
  
  try {
    const result = await client.request('SendSms', params, {
      method: 'POST'
    })
    
    return {
      success: result.Code === 'OK',
      message: result.Message,
      requestId: result.RequestId
    }
  } catch (error) {
    console.error('短信发送失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
\`\`\`

---

## 📊 服务监控与告警

### 🔍 **使用量监控**
\`\`\`typescript
// 邮件发送量统计
export async function getEmailStats() {
  // 通过 Resend API 获取发送统计
  const stats = await resend.emails.list()
  return {
    sent: stats.data?.length || 0,
    delivered: stats.data?.filter(email => email.status === 'delivered').length || 0,
    failed: stats.data?.filter(email => email.status === 'failed').length || 0
  }
}

// 阿里云服务用量监控
export async function getCloudUsage() {
  // 通过阿里云监控API获取用量数据
  return {
    ossStorage: '1.2TB',
    cdnTraffic: '500GB',
    smsCount: 1250
  }
}
\`\`\`

### ⚠️ **异常告警配置**
\`\`\`typescript
export async function setupAlerts() {
  // 邮件发送失败率告警
  if (emailFailureRate > 0.05) {
    await sendAlert('邮件发送失败率过高')
  }
  
  // 阿里云服务异常告警
  if (ossErrorRate > 0.02) {
    await sendAlert('OSS服务异常')
  }
  
  // API调用频率告警
  if (apiCallRate > 1000) {
    await sendAlert('API调用频率异常')
  }
}
