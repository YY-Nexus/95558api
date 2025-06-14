import { Shield, Lock, Eye, Network, CheckCircle, AlertTriangle, Users, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ZeroTrustPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          🛡️ 零信任安全架构
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          "永不信任，始终验证" - 构建现代化的零信任安全防护体系
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/zero-trust/demo">🎮 架构演示</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/zero-trust/implementation">🔧 实施指南</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/zero-trust/policies">📋 策略配置</Link>
          </Button>
        </div>
      </div>

      {/* 零信任核心原则 */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <CardHeader className="text-center">
            <div className="rounded-full p-4 bg-red-100 text-red-600 w-fit mx-auto">
              <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="text-red-800">永不信任</CardTitle>
            <CardDescription>默认不信任任何用户、设备或网络</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>身份验证必需</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>设备信任验证</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>网络位置无关</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center">
            <div className="rounded-full p-4 bg-blue-100 text-blue-600 w-fit mx-auto">
              <Eye className="h-8 w-8" />
            </div>
            <CardTitle className="text-blue-800">始终验证</CardTitle>
            <CardDescription>每次访问都需要重新验证身份</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>持续身份验证</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>动态权限评估</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>实时风险监控</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center">
            <div className="rounded-full p-4 bg-green-100 text-green-600 w-fit mx-auto">
              <Lock className="h-8 w-8" />
            </div>
            <CardTitle className="text-green-800">最小权限</CardTitle>
            <CardDescription>仅授予完成任务所需的最小权限</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>精细化权限控制</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>时限性访问授权</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>动态权限调整</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 零信任架构组件 */}
      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="identity">身份管理</TabsTrigger>
          <TabsTrigger value="device">设备安全</TabsTrigger>
          <TabsTrigger value="network">网络安全</TabsTrigger>
          <TabsTrigger value="data">数据保护</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  身份验证与授权
                </CardTitle>
                <CardDescription>多因子身份验证和细粒度授权控制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">多因子认证 (MFA)</span>
                    <Badge className="bg-green-100 text-green-800">已启用</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">单点登录 (SSO)</span>
                    <Badge className="bg-green-100 text-green-800">已启用</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">特权访问管理 (PAM)</span>
                    <Badge className="bg-blue-100 text-blue-800">配置中</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">身份治理 (IGA)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">规划中</Badge>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/identity">配置身份管理</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  访问控制策略
                </CardTitle>
                <CardDescription>基于角色和属性的动态访问控制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">RBAC - 基于角色</h4>
                    <p className="text-sm text-muted-foreground">根据用户角色分配权限</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">ABAC - 基于属性</h4>
                    <p className="text-sm text-muted-foreground">基于多维属性动态授权</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">PBAC - 基于策略</h4>
                    <p className="text-sm text-muted-foreground">灵活的策略驱动访问控制</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/policies">管理访问策略</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="device" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-green-600" />
                  设备信任管理
                </CardTitle>
                <CardDescription>设备注册、认证和持续监控</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-sm text-green-700">受信任设备</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">23</div>
                    <div className="text-sm text-yellow-700">待审核设备</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">5</div>
                    <div className="text-sm text-red-700">风险设备</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">98.7%</div>
                    <div className="text-sm text-blue-700">合规率</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/devices">管理设备</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  设备合规检查
                </CardTitle>
                <CardDescription>自动化设备安全状态评估</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { name: "操作系统版本", status: "通过", color: "green" },
                    { name: "安全补丁状态", status: "通过", color: "green" },
                    { name: "防病毒软件", status: "��告", color: "yellow" },
                    { name: "磁盘加密", status: "失败", color: "red" },
                    { name: "防火墙状态", status: "通过", color: "green" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{item.name}</span>
                      <Badge
                        className={
                          item.color === "green"
                            ? "bg-green-100 text-green-800"
                            : item.color === "yellow"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/compliance">查看详细报告</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-indigo-600" />
                  网络微分段
                </CardTitle>
                <CardDescription>基于身份的网络访问控制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">生产环境</h4>
                      <Badge className="bg-red-100 text-red-800">严格</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">仅授权用户可访问生产系统</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">开发环境</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">中等</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">开发团队成员可访问</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">办公网络</h4>
                      <Badge className="bg-green-100 text-green-800">标准</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">员工日常办公访问</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/network">配置网络策略</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-cyan-600" />
                  流量监控分析
                </CardTitle>
                <CardDescription>实时网络流量监控和异常检测</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">2.3 TB</div>
                    <div className="text-xs text-blue-700">今日流量</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">99.9%</div>
                    <div className="text-xs text-green-700">正常流量</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">12</div>
                    <div className="text-xs text-yellow-700">异常事件</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">3</div>
                    <div className="text-xs text-red-700">安全威胁</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/monitoring">查看监控面板</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  数据分类保护
                </CardTitle>
                <CardDescription>基于数据敏感性的分级保护策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { level: "机密", count: "1,234", color: "red", description: "最高级别保护" },
                    { level: "敏感", count: "5,678", color: "orange", description: "严格访问控制" },
                    { level: "内部", count: "12,345", color: "yellow", description: "内部员工可访问" },
                    { level: "公开", count: "23,456", color: "green", description: "无访问限制" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                        <div>
                          <div className="font-medium">{item.level}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.count}</div>
                        <div className="text-xs text-muted-foreground">文件</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/data-classification">管理数据分类</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  数据防泄漏 (DLP)
                </CardTitle>
                <CardDescription>实时数据泄漏检测和防护</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">邮件监控</h4>
                      <Badge className="bg-green-100 text-green-800">活跃</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">监控敏感数据通过邮件外发</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">文件传输</h4>
                      <Badge className="bg-green-100 text-green-800">活跃</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">监控文件上传下载行为</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">网络传输</h4>
                      <Badge className="bg-green-100 text-green-800">活跃</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">检测网络数据异常传输</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/zero-trust/dlp">配置DLP策略</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 实施建议 */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 零信任实施建议</CardTitle>
          <CardDescription>分阶段实施零信任架构的最佳实践</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">第一阶段：基础建设</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>部署身份认证系统</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>启用多因子认证</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>建立设备清单</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>实施基础访问控制</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">第二阶段：深度防护</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>网络微分段实施</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>数据分类和保护</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>持续监控部署</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>自动化响应机制</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">第三阶段：智能优化</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>AI驱动的威胁检测</span>
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>行为分析和异常检测</span>
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>自适应安全策略</span>
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>持续优化和改进</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
