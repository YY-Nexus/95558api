import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Smartphone, Mail, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TwoFactorAuthPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">双因子认证 (2FA)</h1>
        <p className="text-muted-foreground mt-2">增强账户安全性的双重验证机制</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>安全提升</AlertTitle>
        <AlertDescription>双因子认证可以将账户安全性提升99.9%，即使密码泄露也能保护账户安全。</AlertDescription>
      </Alert>

      <Tabs defaultValue="totp" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="totp">
            <Smartphone className="mr-2 h-4 w-4" />
            TOTP
          </TabsTrigger>
          <TabsTrigger value="sms">
            <Smartphone className="mr-2 h-4 w-4" />
            短信验证
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            邮件验证
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Key className="mr-2 h-4 w-4" />
            备用码
          </TabsTrigger>
        </TabsList>

        <TabsContent value="totp" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>TOTP (基于时间的一次性密码)</CardTitle>
                <CardDescription>使用Google Authenticator等应用生成验证码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">实现步骤</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>生成用户专属的密钥</li>
                  <li>生成二维码供用户扫描</li>
                  <li>用户使用认证器应用扫描</li>
                  <li>验证用户输入的6位数字码</li>
                  <li>启用2FA并保存备用码</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">支持的应用</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Google Authenticator</li>
                  <li>Microsoft Authenticator</li>
                  <li>Authy</li>
                  <li>1Password</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码实现</CardTitle>
                <CardDescription>TOTP双因子认证实现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// 安装依赖
npm install speakeasy qrcode

// lib/totp.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// 生成用户密钥
export function generateSecret(userEmail: string) {
  const secret = speakeasy.generateSecret({
    name: userEmail,
    issuer: '云枢³ API',
    length: 32
  });
  
  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url
  };
}

// 生成二维码
export async function generateQRCode(otpauthUrl: string) {
  try {
    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
    return qrCodeUrl;
  } catch (error) {
    throw new Error('生成二维码失败');
  }
}

// 验证TOTP码
export function verifyTOTP(token: string, secret: string) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2 // 允许前后2个时间窗口
  });
}

// API路由示例
// app/api/auth/2fa/setup/route.ts
export async function POST(request: Request) {
  const { userId } = await request.json();
  
  // 获取用户信息
  const user = await getUserById(userId);
  if (!user) {
    return Response.json({ error: '用户不存在' }, { status: 404 });
  }
  
  // 生成密钥和二维码
  const { secret, otpauthUrl } = generateSecret(user.email);
  const qrCode = await generateQRCode(otpauthUrl);
  
  // 临时保存密钥（用户确认后才正式启用）
  await saveTempSecret(userId, secret);
  
  return Response.json({
    qrCode,
    secret, // 用于手动输入
    backupCodes: generateBackupCodes()
  });
}

// 验证并启用2FA
// app/api/auth/2fa/verify/route.ts
export async function POST(request: Request) {
  const { userId, token } = await request.json();
  
  // 获取临时密钥
  const tempSecret = await getTempSecret(userId);
  if (!tempSecret) {
    return Response.json({ error: '请先设置2FA' }, { status: 400 });
  }
  
  // 验证TOTP码
  const isValid = verifyTOTP(token, tempSecret);
  if (!isValid) {
    return Response.json({ error: '验证码错误' }, { status: 400 });
  }
  
  // 启用2FA
  await enable2FA(userId, tempSecret);
  await deleteTempSecret(userId);
  
  return Response.json({ success: true });
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sms" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>短信验证码</CardTitle>
                <CardDescription>通过短信发送验证码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">实现流程</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>用户绑定手机号码</li>
                  <li>登录时发送短信验证码</li>
                  <li>用户输入收到的验证码</li>
                  <li>服务器验证码的有效性</li>
                  <li>验证通过后完成登录</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">注意事项</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>设置验证码过期时间(通常5分钟)</li>
                  <li>限制发送频率防止滥用</li>
                  <li>考虑国际短信支持</li>
                  <li>提供语音验证码备选</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码实现</CardTitle>
                <CardDescription>短信验证码实现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// 使用阿里云短信服务
npm install @alicloud/sms20170525

// lib/sms.ts
import SMS from '@alicloud/sms20170525';
import { Config } from '@alicloud/openapi-client';

const config = new Config({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  endpoint: 'dysmsapi.aliyuncs.com'
});

const client = new SMS(config);

// 生成6位验证码
export function generateSMSCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 发送短信验证码
export async function sendSMSCode(
  phoneNumber: string, 
  code: string
): Promise<boolean> {
  try {
    const request = {
      phoneNumbers: phoneNumber,
      signName: '云枢³',
      templateCode: 'SMS_123456789',
      templateParam: JSON.stringify({ code })
    };
    
    const response = await client.sendSms(request);
    return response.body?.code === 'OK';
  } catch (error) {
    console.error('短信发送失败:', error);
    return false;
  }
}

// 存储验证码（Redis示例）
export async function storeVerificationCode(
  phoneNumber: string, 
  code: string
): Promise<void> {
  const key = \`sms_code:\${phoneNumber}\`;
  await redis.setex(key, 300, code); // 5分钟过期
}

// 验证短信验证码
export async function verifySMSCode(
  phoneNumber: string, 
  inputCode: string
): Promise<boolean> {
  const key = \`sms_code:\${phoneNumber}\`;
  const storedCode = await redis.get(key);
  
  if (!storedCode || storedCode !== inputCode) {
    return false;
  }
  
  // 验证成功后删除验证码
  await redis.del(key);
  return true;
}

// API路由示例
// app/api/auth/sms/send/route.ts
export async function POST(request: Request) {
  const { phoneNumber } = await request.json();
  
  // 验证手机号格式
  if (!isValidPhoneNumber(phoneNumber)) {
    return Response.json({ error: '手机号格式错误' }, { status: 400 });
  }
  
  // 检查发送频率限制
  const rateLimitKey = \`sms_rate:\${phoneNumber}\`;
  const lastSent = await redis.get(rateLimitKey);
  
  if (lastSent) {
    return Response.json(
      { error: '请等待60秒后再次发送' }, 
      { status: 429 }
    );
  }
  
  // 生成并发送验证码
  const code = generateSMSCode();
  const sent = await sendSMSCode(phoneNumber, code);
  
  if (!sent) {
    return Response.json({ error: '短信发送失败' }, { status: 500 });
  }
  
  // 存储验证码和设置发送频率限制
  await storeVerificationCode(phoneNumber, code);
  await redis.setex(rateLimitKey, 60, Date.now().toString());
  
  return Response.json({ success: true });
}

// 验证短信验证码
// app/api/auth/sms/verify/route.ts
export async function POST(request: Request) {
  const { phoneNumber, code } = await request.json();
  
  const isValid = await verifySMSCode(phoneNumber, code);
  
  if (!isValid) {
    return Response.json({ error: '验证码错误或已过期' }, { status: 400 });
  }
  
  return Response.json({ success: true });
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>邮件验证码</CardTitle>
                <CardDescription>通过邮件发送验证码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">适用场景</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>用户没有手机号或手机不在身边</li>
                  <li>国际用户，短信成本较高</li>
                  <li>企业内部系统，邮件更方便</li>
                  <li>作为短信验证的备选方案</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">优势</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>成本低廉</li>
                  <li>支持富文本内容</li>
                  <li>可以包含更多安全信息</li>
                  <li>用户接受度高</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码实现</CardTitle>
                <CardDescription>邮件验证码实现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// 使用Resend发送邮件
npm install resend

// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 生成邮件验证码
export function generateEmailCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 发送邮件验证码
export async function sendEmailCode(
  email: string, 
  code: string
): Promise<boolean> {
  try {
    await resend.emails.send({
      from: 'noreply@yunshub.com',
      to: email,
      subject: '云枢³ 登录验证码',
      html: \`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">登录验证码</h2>
          <p>您的登录验证码是：</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            \${code}
          </div>
          <p style="color: #6b7280;">此验证码5分钟内有效，请勿泄露给他人。</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px;">
            如果您没有请求此验证码，请忽略此邮件。
          </p>
        </div>
      \`
    });
    
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error);
    return false;
  }
}

// API路由示例
// app/api/auth/email/send/route.ts
export async function POST(request: Request) {
  const { email } = await request.json();
  
  // 验证邮箱格式
  if (!isValidEmail(email)) {
    return Response.json({ error: '邮箱格式错误' }, { status: 400 });
  }
  
  // 检查发送频率限制
  const rateLimitKey = \`email_rate:\${email}\`;
  const lastSent = await redis.get(rateLimitKey);
  
  if (lastSent) {
    return Response.json(
      { error: '请等待60秒后再次发送' }, 
      { status: 429 }
    );
  }
  
  // 生成并发送验证码
  const code = generateEmailCode();
  const sent = await sendEmailCode(email, code);
  
  if (!sent) {
    return Response.json({ error: '邮件发送失败' }, { status: 500 });
  }
  
  // 存储验证码
  const key = \`email_code:\${email}\`;
  await redis.setex(key, 300, code); // 5分钟过期
  await redis.setex(rateLimitKey, 60, Date.now().toString());
  
  return Response.json({ success: true });
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>备用恢复码</CardTitle>
                <CardDescription>当主要2FA方式不可用时的备选方案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">重要性</h3>
                <p className="text-sm text-muted-foreground">
                  备用码是用户丢失手机或无法接收验证码时的最后防线，每个备用码只能使用一次。
                </p>

                <h3 className="text-lg font-medium mt-4">最佳实践</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>生成8-10个备用码</li>
                  <li>每个码8-12位字符</li>
                  <li>使用后立即失效</li>
                  <li>提醒用户安全保存</li>
                  <li>定期提醒更新备用码</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码实现</CardTitle>
                <CardDescription>备用恢复码实现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// lib/backup-codes.ts
import crypto from 'crypto';

// 生成备用恢复码
export function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  
  for (let i = 0; i < count; i++) {
    // 生成8位随机码
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    // 格式化为 XXXX-XXXX
    const formattedCode = \`\${code.slice(0, 4)}-\${code.slice(4)}\`;
    codes.push(formattedCode);
  }
  
  return codes;
}

// 哈希备用码存储
export function hashBackupCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}

// 验证备用码
export function verifyBackupCode(
  inputCode: string, 
  hashedCodes: string[]
): boolean {
  const inputHash = hashBackupCode(inputCode.replace('-', '').toUpperCase());
  return hashedCodes.includes(inputHash);
}

// 数据库模型示例
interface User2FA {
  id: string;
  userId: string;
  secret: string;
  backupCodes: string[]; // 存储哈希后的备用码
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API路由示例
// app/api/auth/backup-codes/generate/route.ts
export async function POST(request: Request) {
  const { userId } = await request.json();
  
  // 检查用户是否已启用2FA
  const user2FA = await get2FASettings(userId);
  if (!user2FA?.isEnabled) {
    return Response.json(
      { error: '请先启用双因子认证' }, 
      { status: 400 }
    );
  }
  
  // 生成新的备用码
  const backupCodes = generateBackupCodes();
  const hashedCodes = backupCodes.map(code => 
    hashBackupCode(code.replace('-', ''))
  );
  
  // 更新数据库
  await updateBackupCodes(userId, hashedCodes);
  
  // 记录操作日志
  await logSecurityEvent(userId, 'backup_codes_generated');
  
  return Response.json({
    backupCodes,
    message: '请将这些备用码保存在安全的地方，每个码只能使用一次'
  });
}

// 使用备用码登录
// app/api/auth/backup-codes/verify/route.ts
export async function POST(request: Request) {
  const { userId, backupCode } = await request.json();
  
  // 获取用户的备用码
  const user2FA = await get2FASettings(userId);
  if (!user2FA?.backupCodes?.length) {
    return Response.json(
      { error: '没有可用的备用码' }, 
      { status: 400 }
    );
  }
  
  // 验证备用码
  const codeHash = hashBackupCode(backupCode.replace('-', '').toUpperCase());
  const codeIndex = user2FA.backupCodes.indexOf(codeHash);
  
  if (codeIndex === -1) {
    return Response.json(
      { error: '备用码无效或已使用' }, 
      { status: 400 }
    );
  }
  
  // 移除已使用的备用码
  const updatedCodes = user2FA.backupCodes.filter((_, index) => 
    index !== codeIndex
  );
  await updateBackupCodes(userId, updatedCodes);
  
  // 记录使用日志
  await logSecurityEvent(userId, 'backup_code_used', {
    remainingCodes: updatedCodes.length
  });
  
  // 如果备用码不足，提醒用户生成新的
  const shouldGenerateNew = updatedCodes.length <= 2;
  
  return Response.json({
    success: true,
    remainingCodes: updatedCodes.length,
    shouldGenerateNew
  });
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>2FA安全最佳实践</CardTitle>
          <CardDescription>实施双因子认证的安全建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">实施建议</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>为管理员账户强制启用2FA</li>
                <li>提供多种2FA方式供用户选择</li>
                <li>实现渐进式2FA启用流程</li>
                <li>定期提醒用户更新备用码</li>
                <li>监控异常登录行为</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">用户体验</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>提供清晰的设置指南</li>
                <li>支持"记住此设备"功能</li>
                <li>优化移动端验证流程</li>
                <li>提供客服支持渠道</li>
                <li>实现优雅的降级方案</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/api/auth">返回认证API</Link>
        </Button>
        <Button asChild>
          <Link href="/api/auth/biometric">下一步: 生物识别</Link>
        </Button>
      </div>
    </div>
  )
}
