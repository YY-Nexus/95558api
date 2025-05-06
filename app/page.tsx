import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="blur-container p-8 mb-8 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-sky-green">启智「云枢³」API</h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">
            智能生产力导航体系 - 酒店娱乐服务业优化升级的24核智能导航架构设计
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="tech-button text-lg px-6 py-6">开始探索</Button>
            <Button variant="outline" className="text-lg px-6 py-6 nav-button-3d">
              了解更多
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>内环：服务生产核心</CardTitle>
              <CardDescription>12大主生产部门</CardDescription>
            </CardHeader>
            <CardContent>
              <p>从空间炼金场到数据精炼厂，构建完整服务生产链</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>外环：智能赋能网络</CardTitle>
              <CardDescription>12大支持体系</CardDescription>
            </CardHeader>
            <CardContent>
              <p>从神经中继站到量子纠缠场，打造全方位赋能支持</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>生产力跃迁设计</CardTitle>
              <CardDescription>螺旋式效能增长模型</CardDescription>
            </CardHeader>
            <CardContent>
              <p>通过AI教练提升人工技能指数，持续压缩流程中的能量损耗</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
