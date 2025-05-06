import { CreditCard, Wallet, QrCode, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentApiPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">支付集成 API</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用支付API集成代码和示例</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>支付宝</CardTitle>
              <CardDescription>支付宝支付API集成</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              支付宝是中国领先的第三方支付平台，提供多种支付方式和金融服务。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/payment/alipay" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>微信支付</CardTitle>
              <CardDescription>微信支付API集成</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              微信支付是中国领先的移动支付解决方案，支持扫码支付、APP支付等多种支付方式。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/payment/wechat" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Stripe</CardTitle>
              <CardDescription>Stripe支付API集成</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Stripe是一个全球性的支付处理平台，支持信用卡支付、订阅管理等多种支付功能。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/payment/stripe" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>PayPal</CardTitle>
              <CardDescription>PayPal支付API集成</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              PayPal是全球知名的在线支付系统，支持跨境支付、电子钱包等多种支付服务。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/payment/paypal" className="w-full">
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
