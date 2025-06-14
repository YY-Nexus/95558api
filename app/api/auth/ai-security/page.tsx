import { Brain, Shield, Eye, TrendingUp, Users, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function AISecurityPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧠 AI智能认证体系
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          融合机器学习、行为分析和智能风控的下一代认证安全解决方案
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/ai-security/demo">🎮 智能演示</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/zero-trust">🛡️ 零信任架构</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/unified">📱 跨平台统一</Link>
          </Button>
        </div>
      </div>

      {/* AI核心能力 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 w-fit">
              <Brain className="h-6 w-6" />
            </div>
            <CardTitle className="text-blue-800">行为分析</CardTitle>
            <CardDescription>智能识别用户行为模式</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>准确率</span>
                <span className="font-medium">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-green-800">风险评估</CardTitle>
            <CardDescription>实时威胁检测与防护</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>检测率</span>
                <span className="font-medium">99.2%</span>
              </div>
              <Progress value={99.2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="pb-3">
            <div className="rounded-full p-3 bg-purple-100 text-purple-600 w-fit">
              <Eye className="h-6 w-6" />
            </div>
            <CardTitle className="text-purple-800">异常监控</CardTitle>
            <CardDescription>24/7智能监控预警</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>响应时间</span>
                <span className="font-medium">0.3s</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="pb-3">
            <div className="rounded-full p-3 bg-orange-100 text-orange-600 w-fit">
              <TrendingUp className="h-6 w-6" />
            </div>
            <CardTitle className="text-orange-800">自适应学习</CardTitle>
            <CardDescription>持续优化安全策略</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>学习效率</span>
                <span className="font-medium">94.5%</span>
              </div>
              <Progress value={94.5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI功能模块 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              智能行为分析引擎
            </CardTitle>
            <CardDescription>基于机器学习的用户行为建模与异常检测</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">行为特征提取</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 键盘敲击节奏分析</li>
                  <li>• 鼠标移动轨迹识别</li>
                  <li>• 设备指纹生成</li>
                  <li>• 网络行为模式</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">异常检测算法</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 孤立森林算法</li>
                  <li>• 自编码器网络</li>
                  <li>• 时序异常检测</li>
                  <li>• 集成学习模型</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link href="/api/auth/ai-security/behavior">查看详情</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/api/auth/ai-security/behavior/demo">在线演示</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              智能风险评估系统
            </CardTitle>
            <CardDescription>多维度风险评估与动态安全策略调整</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">风险因子</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 地理位置异常</li>
                  <li>• 设备信任度</li>
                  <li>• 时间模式分析</li>
                  <li>• 网络环境评估</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">动态策略</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 自适应认证强度</li>
                  <li>• 智能验证码</li>
                  <li>• 分级访问控制</li>
                  <li>• 实时策略更新</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link href="/api/auth/ai-security/risk">查看详情</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/api/auth/ai-security/risk/demo">在线演示</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 技术架构 */}
      <Card>
        <CardHeader>
          <CardTitle>🏗️ AI认证技术架构</CardTitle>
          <CardDescription>分层式智能认证系统架构设计</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-blue-50 text-blue-600 w-fit mx-auto">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-medium">用户层</h3>
              <p className="text-sm text-muted-foreground">多端用户交互界面</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">Web端</Badge>
                <Badge variant="secondary">移动端</Badge>
                <Badge variant="secondary">API接口</Badge>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-green-50 text-green-600 w-fit mx-auto">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="font-medium">AI引擎层</h3>
              <p className="text-sm text-muted-foreground">智能分析与决策</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">行为分析</Badge>
                <Badge variant="secondary">风险评估</Badge>
                <Badge variant="secondary">异常检测</Badge>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-purple-50 text-purple-600 w-fit mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-medium">安全层</h3>
              <p className="text-sm text-muted-foreground">多重安全防护</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">零信任</Badge>
                <Badge variant="secondary">加密传输</Badge>
                <Badge variant="secondary">访问控制</Badge>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-orange-50 text-orange-600 w-fit mx-auto">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-medium">基础设施层</h3>
              <p className="text-sm text-muted-foreground">云原生基础架构</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">微服务</Badge>
                <Badge variant="secondary">容器化</Badge>
                <Badge variant="secondary">弹性扩展</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实施路线图 */}
      <Card>
        <CardHeader>
          <CardTitle>🗺️ AI认证实施路线图</CardTitle>
          <CardDescription>分阶段实施智能认证系统升级</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: "第一阶段",
                title: "基础AI能力建设",
                duration: "4-6周",
                progress: 100,
                items: ["用户行为数据收集", "基础ML模型训练", "异常检测算法部署", "风险评分系统"],
                status: "已完成",
                color: "green",
              },
              {
                phase: "第二阶段",
                title: "智能风控集成",
                duration: "6-8周",
                progress: 75,
                items: ["实时风险评估", "动态认证策略", "智能验证码", "设备指纹识别"],
                status: "进行中",
                color: "blue",
              },
              {
                phase: "第三阶段",
                title: "零信任架构",
                duration: "8-10周",
                progress: 30,
                items: ["零信任网关", "微分段策略", "持续验证", "权限最小化"],
                status: "计划中",
                color: "purple",
              },
              {
                phase: "第四阶段",
                title: "跨平台统一",
                duration: "6-8周",
                progress: 10,
                items: ["统一认证中心", "多端SDK", "单点登录", "会话管理"],
                status: "规划中",
                color: "orange",
              },
            ].map((phase, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className={`rounded-full p-2 bg-${phase.color}-100 text-${phase.color}-600 mt-1`}>
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {phase.phase}: {phase.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">预计时间: {phase.duration}</p>
                      </div>
                      <Badge
                        className={
                          phase.color === "green"
                            ? "bg-green-100 text-green-800"
                            : phase.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : phase.color === "purple"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-orange-100 text-orange-800"
                        }
                      >
                        {phase.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>完成进度</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < 3 && <div className="absolute left-6 top-12 w-px h-8 bg-border"></div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
