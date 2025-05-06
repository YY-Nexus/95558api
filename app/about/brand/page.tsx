import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandLogo, BrandLogoEn, BrandLogoShort } from "@/components/brand-logo"

export default function BrandPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">品牌说明</h1>
        <p className="text-muted-foreground mt-2">了解启智云枢³的品牌含义与价值</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>品牌标识</CardTitle>
            <CardDescription>我们的品牌名称与标识</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 items-center p-6 bg-gray-50 rounded-lg">
              <BrandLogo textClassName="text-3xl" />
              <BrandLogoEn textClassName="text-xl" />
              <div className="mt-4 flex items-center gap-4">
                <BrandLogoShort textClassName="text-2xl" />
                <span className="text-muted-foreground">= 智能(AI) × 连接(Connect) × 安全(Secure)</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">品牌口号</h3>
              <p className="text-xl font-medium text-blue-accent-700">智联万物丨枢启未来</p>
              <p className="text-lg text-blue-accent-600 mt-1">Connect Intelligence, Hub the Future</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>品牌含义</CardTitle>
            <CardDescription>我们品牌背后的理念</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">启智云枢³</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>启智</strong>：激发智慧，启迪思维，代表我们致力于提供智能化的解决方案
                </li>
                <li>
                  <strong>云枢</strong>：云端的中心枢纽，连接各种资源和服务
                </li>
                <li>
                  <strong>³</strong>：代表我们的三大核心价值：智能(AI)、连接(Connect)和安全(Secure)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">IntelliCloudHub³</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Intelli</strong>：智能，代表我们的AI能力
                </li>
                <li>
                  <strong>Cloud</strong>：云端，代表我们的服务部署方式
                </li>
                <li>
                  <strong>Hub</strong>：枢纽，代表我们连接各种资源的能力
                </li>
                <li>
                  <strong>³</strong>：代表我们的三大核心价值
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">CH³</h3>
              <p>我们的简称，代表Cloud Hub的缩写，上标³强调我们的三大核心价值。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>品牌价值</CardTitle>
          <CardDescription>我们的核心价值观</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="p-4 bg-blue-accent-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-accent-700 mb-2">智能 (AI)</h3>
            <p>我们利用先进的人工智能技术，为用户提供智能化的知识管理和决策支持，让复杂问题变得简单。</p>
          </div>

          <div className="p-4 bg-teal-accent-50 rounded-lg">
            <h3 className="text-lg font-medium text-teal-accent-700 mb-2">连接 (Connect)</h3>
            <p>我们连接各种知识资源和工具，打破信息孤岛，让知识流动起来，创造更大的价值。</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="text-lg font-medium text-amber-700 mb-2">安全 (Secure)</h3>
            <p>我们重视数据安全和隐私保护，提供本地部署和离线使用能力，让用户安心使用。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
