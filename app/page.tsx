import { BrandLogo } from "@/components/brand-logo"
import { FeatureCard } from "@/components/feature-card"
import { TagCloud } from "@/components/tag-cloud"
import { OrganizedTags } from "@/components/organized-tags"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Code, Terminal, Search, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="py-20 text-center space-y-8">
        <div className="flex justify-center mb-8">
          <BrandLogo size="xl" showTagline={true} />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-vibrant-red-500 via-vibrant-cyan-500 to-vibrant-blue-500 bg-clip-text text-transparent leading-tight">
            智能生产力导航体系
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            24大核心模块，双环驱动架构，为酒店娱乐服务业提供全方位的智能化解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-vibrant-red-500 to-vibrant-cyan-500 hover:from-vibrant-red-600 hover:to-vibrant-cyan-600 text-white px-8 py-3 text-lg"
            >
              开始探索
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-vibrant-blue-300 text-vibrant-blue-700 hover:bg-vibrant-blue-50 px-8 py-3 text-lg"
            >
              了解更多
            </Button>
          </div>
        </div>
      </section>

      {/* 核心功能区域 */}
      <section className="py-16 bg-gradient-to-br from-white/80 to-vibrant-cyan-50/80 backdrop-blur-sm">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-vibrant-blue-700 mb-4">核心功能模块</h2>
            <p className="text-lg text-muted-foreground">全面覆盖开发、运维、管理各个环节</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Database className="h-8 w-8" />}
              title="API集成库"
              description="涵盖认证、支付、存储、通知等常用API集成方案"
              href="/api"
              gradient="from-vibrant-cyan-500 to-vibrant-blue-500"
            />
            <FeatureCard
              icon={<Code className="h-8 w-8" />}
              title="代码片段库"
              description="JavaScript、React、CSS、HTML等实用代码片段"
              href="/snippets"
              gradient="from-vibrant-green-500 to-vibrant-cyan-500"
            />
            <FeatureCard
              icon={<Terminal className="h-8 w-8" />}
              title="开发工具集"
              description="终端命令、VS Code技巧、Git工具等开发利器"
              href="/tools"
              gradient="from-vibrant-purple-500 to-vibrant-pink-500"
            />
            <FeatureCard
              icon={<Search className="h-8 w-8" />}
              title="智能搜索"
              description="全文搜索、智能建议、历史记录，快速定位所需内容"
              href="/search"
              gradient="from-vibrant-yellow-500 to-vibrant-red-500"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="性能优化"
              description="代码分割、懒加载、缓存策略等性能优化方案"
              href="/tools"
              gradient="from-vibrant-red-500 to-vibrant-pink-500"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="安全防护"
              description="认证授权、数据加密、安全审计等安全解决方案"
              href="/api/auth"
              gradient="from-vibrant-blue-500 to-vibrant-purple-500"
            />
          </div>
        </div>
      </section>

      {/* 技术标签云 */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-vibrant-green-700 mb-4">技术生态</h2>
            <p className="text-lg text-muted-foreground">覆盖现代Web开发技术栈</p>
          </div>
          <TagCloud />
        </div>
      </section>

      {/* 组织化标签 */}
      <section className="py-16 bg-gradient-to-br from-vibrant-blue-50/80 to-white/80 backdrop-blur-sm">
        <div className="container">
          <OrganizedTags />
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center card-hover border-vibrant-red-200 bg-gradient-to-br from-white to-vibrant-red-50">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-vibrant-red-600">200+</CardTitle>
                <CardDescription className="text-vibrant-red-500">API集成方案</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center card-hover border-vibrant-cyan-200 bg-gradient-to-br from-white to-vibrant-cyan-50">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-vibrant-cyan-600">500+</CardTitle>
                <CardDescription className="text-vibrant-cyan-500">代码片段</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center card-hover border-vibrant-green-200 bg-gradient-to-br from-white to-vibrant-green-50">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-vibrant-green-600">100+</CardTitle>
                <CardDescription className="text-vibrant-green-500">开发工具</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center card-hover border-vibrant-purple-200 bg-gradient-to-br from-white to-vibrant-purple-50">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-vibrant-purple-600">24</CardTitle>
                <CardDescription className="text-vibrant-purple-500">核心模块</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
