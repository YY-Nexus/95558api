import { MessageSquare, Bell, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotificationApiPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">消息与通知 API</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用消息与通知API集成代码和示例</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>WebSocket</CardTitle>
              <CardDescription>实时双向通信</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              WebSocket是一种在单个TCP连接上进行全双工通信的协议，可用于实时通知和消息推送。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/notification/websocket" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>推送通知</CardTitle>
              <CardDescription>Web Push API</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Web Push API允许网站向用户发送推送通知，即使用户没有打开网站也能收到通知。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/notification/web-push" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>邮件服务</CardTitle>
              <CardDescription>SMTP邮件发送</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              通过SMTP协议发送电子邮件通知，适用于重要通知、验证码和营销邮件等场景。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/notification/email" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>短信服务</CardTitle>
              <CardDescription>SMS短信发送</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              通过短信服务提供商发送短信通知，适用于验证码、重要提醒和营销信息等场景。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/notification/sms" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
