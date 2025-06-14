import { Zap, Wifi, Smartphone, Car, Home, Factory, Globe, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function EdgeAuthPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          ⚡ 边缘计算认证
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          5G时代的超低延迟认证解决方案 - 构建万物互联的边缘安全体系
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/edge/demo">🎮 边缘演示</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/edge/5g">📡 5G集成</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/edge/iot">🌐 IoT认证</Link>
          </Button>
        </div>
      </div>

      {/* 边缘认证核心优势 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-cyan-100 text-cyan-600 w-fit mx-auto">
              <Zap className="h-6 w-6" />
            </div>
            <CardTitle className="text-cyan-800">超低延迟</CardTitle>
            <CardDescription>毫秒级认证响应</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>认证延迟</span>
                <span className="font-medium text-cyan-600">&lt;5ms</span>
              </div>
              <Progress value={95} className="h-2" />
              <div className="text-xs text-cyan-600 mt-2">比云端认证快20倍</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit mx-auto">
              <Wifi className="h-6 w-6" />
            </div>
            <CardTitle className="text-green-800">离线可用</CardTitle>
            <CardDescription>断网情况下仍可认证</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>离线可用性</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
              <div className="text-xs text-green-600 mt-2">本地缓存认证策略</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-purple-100 text-purple-600 w-fit mx-auto">
              <Globe className="h-6 w-6" />
            </div>
            <CardTitle className="text-purple-800">海量并发</CardTitle>
            <CardDescription>支持百万级设备接入</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>并发处理</span>
                <span className="font-medium text-purple-600">1M+</span>
              </div>
              <Progress value={88} className="h-2" />
              <div className="text-xs text-purple-600 mt-2">分布式边缘节点</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-orange-100 text-orange-600 w-fit mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-orange-800">智能安全</CardTitle>
            <CardDescription>AI驱动的威胁检测</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>检测准确率</span>
                <span className="font-medium text-orange-600">99.7%</span>
              </div>
              <Progress value={99.7} className="h-2" />
              <div className="text-xs text-orange-600 mt-2">边缘AI安全引擎</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 应用场景展示 */}
      <Tabs defaultValue="5g" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="5g">5G网络</TabsTrigger>
          <TabsTrigger value="iot">物联网</TabsTrigger>
          <TabsTrigger value="autonomous">自动驾驶</TabsTrigger>
          <TabsTrigger value="industrial">工业4.0</TabsTrigger>
        </TabsList>

        <TabsContent value="5g" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-blue-600" />
                  5G网络切片认证
                </CardTitle>
                <CardDescription>基于网络切片的差异化认证服务</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      slice: "eMBB切片",
                      scenario: "增强移动宽带",
                      latency: "10ms",
                      security: "标准",
                      usage: "视频通话、AR/VR",
                      color: "blue",
                    },
                    {
                      slice: "URLLC切片",
                      scenario: "超可靠低延迟",
                      latency: "1ms",
                      security: "高级",
                      usage: "自动驾驶、工业控制",
                      color: "green",
                    },
                    {
                      slice: "mMTC切片",
                      scenario: "海量机器通信",
                      latency: "100ms",
                      security: "轻量",
                      usage: "物联网、传感器",
                      color: "purple",
                    },
                  ].map((slice, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{slice.slice}</h4>
                        <Badge
                          className={
                            slice.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : slice.color === "green"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                          }
                        >
                          {slice.scenario}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">延迟:</span>
                          <div className="font-medium">{slice.latency}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">安全:</span>
                          <div className="font-medium">{slice.security}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">应用:</span>
                          <div className="font-medium text-xs">{slice.usage}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">5G认证流程优化</h4>
                  <div className="space-y-2 text-sm text-blue-600">
                    <div>• 预认证机制 - 减少切换延迟</div>
                    <div>• 边缘缓存 - 本地认证决策</div>
                    <div>• 智能路由 - 最优节点选择</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/edge/5g/slicing">网络切片详解</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-600" />
                  MEC边缘计算集成
                </CardTitle>
                <CardDescription>多接入边缘计算的认证服务部署</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <h4 className="font-medium text-cyan-800 mb-2">边缘认证节点</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-cyan-600">2,847</div>
                        <div className="text-xs text-cyan-700">活跃节点</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-green-600">99.8%</div>
                        <div className="text-xs text-green-700">可用性</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">性能指标</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>平均延迟</span>
                        <span className="font-medium">3.2ms</span>
                      </div>
                      <Progress value={85} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>吞吐量</span>
                        <span className="font-medium">50K TPS</span>
                      </div>
                      <Progress value={92} className="h-1" />
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">智能调度</h4>
                    <div className="space-y-1 text-sm text-purple-600">
                      <div>• 负载均衡算法</div>
                      <div>• 地理位置优化</div>
                      <div>• 动态资源分配</div>
                      <div>• 故障自动切换</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/edge/mec">MEC部署指南</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="iot" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-green-600" />
                  智能家居认证
                </CardTitle>
                <CardDescription>家庭物联网设备的安全认证管理</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-green-700">已连接设备</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">99.5%</div>
                    <div className="text-sm text-blue-700">认证成功率</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { category: "安防设备", count: 24, security: "高", examples: "摄像头、门锁、传感器" },
                    { category: "家电设备", count: 45, security: "中", examples: "空调、冰箱、洗衣机" },
                    { category: "娱乐设备", count: 32, security: "中", examples: "电视、音响、游戏机" },
                    { category: "照明设备", count: 55, security: "低", examples: "智能灯泡、开关、调光器" },
                  ].map((category, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{category.category}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{category.count}台</span>
                          <Badge
                            className={
                              category.security === "高"
                                ? "bg-red-100 text-red-800"
                                : category.security === "中"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {category.security}安全
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{category.examples}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/edge/iot/smart-home">智能家居方案</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  轻量级认证协议
                </CardTitle>
                <CardDescription>适用于资源受限设备的认证方案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      protocol: "CoAP-DTLS",
                      overhead: "512B",
                      latency: "15ms",
                      security: "AES-128",
                      usage: "传感器网络",
                      color: "blue",
                    },
                    {
                      protocol: "MQTT-TLS",
                      overhead: "1KB",
                      latency: "25ms",
                      security: "TLS 1.3",
                      usage: "智能家居",
                      color: "green",
                    },
                    {
                      protocol: "LoRaWAN",
                      overhead: "32B",
                      latency: "1000ms",
                      security: "AES-128",
                      usage: "远程监控",
                      color: "purple",
                    },
                    {
                      protocol: "NB-IoT",
                      overhead: "128B",
                      latency: "100ms",
                      security: "LTE安全",
                      usage: "城市物联网",
                      color: "orange",
                    },
                  ].map((protocol, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{protocol.protocol}</h4>
                        <Badge
                          className={
                            protocol.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : protocol.color === "green"
                                ? "bg-green-100 text-green-800"
                                : protocol.color === "purple"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-orange-100 text-orange-800"
                          }
                        >
                          {protocol.usage}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">开销:</span>
                          <div className="font-medium">{protocol.overhead}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">延迟:</span>
                          <div className="font-medium">{protocol.latency}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">加密:</span>
                          <div className="font-medium">{protocol.security}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">协议选择建议</h4>
                  <div className="space-y-1 text-sm text-purple-600">
                    <div>• 低功耗场景 → LoRaWAN</div>
                    <div>• 实时控制 → CoAP-DTLS</div>
                    <div>• 家庭网络 → MQTT-TLS</div>
                    <div>• 广域覆盖 → NB-IoT</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/edge/iot/protocols">协议对比分析</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="autonomous" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  车联网V2X认证
                </CardTitle>
                <CardDescription>车辆到一切通信的安全认证体系</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">V2V - 车车通信</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">认证延迟:</span>
                        <div className="font-medium text-blue-600">&lt;2ms</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">通信范围:</span>
                        <div className="font-medium text-blue-600">300m</div>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">碰撞预警、协同驾驶、车队管理</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">V2I - 车路通信</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">认证延迟:</span>
                        <div className="font-medium text-green-600">&lt;5ms</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">覆盖范围:</span>
                        <div className="font-medium text-green-600">1km</div>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">交通信号、路况信息、智能导航</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">V2P - 车人通信</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">认证延迟:</span>
                        <div className="font-medium text-purple-600">&lt;3ms</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">检测精度:</span>
                        <div className="font-medium text-purple-600">99.9%</div>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">行人检测、安全预警、紧急制动</p>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">安全认证机制</h4>
                  <div className="space-y-1 text-sm text-orange-600">
                    <div>• PKI证书体系 - 车辆身份认证</div>
                    <div>• 消息签名验证 - 数据完整性</div>
                    <div>• 时间戳机制 - 防重放攻击</div>
                    <div>• 地理位置验证 - 防位置欺骗</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/edge/v2x">V2X认证详解</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  自动驾驶安全
                </CardTitle>
                <CardDescription>L4/L5级自动驾驶的安全认证要求</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      level: "L2 - 部分自动化",
                      requirements: "基础认证",
                      latency: "50ms",
                      security: "标准",
                      features: "车道保持、自适应巡航",
                      color: "green",
                    },
                    {
                      level: "L3 - 条件自动化",
                      requirements: "增强认证",
                      latency: "20ms",
                      security: "高级",
                      features: "交通拥堵辅助、高速公路",
                      color: "blue",
                    },
                    {
                      level: "L4 - 高度自动化",
                      requirements: "严格认证",
                      latency: "5ms",
                      security: "严格",
                      features: "特定区域完全自动",
                      color: "orange",
                    },
                    {
                      level: "L5 - 完全自动化",
                      requirements: "极致认证",
                      latency: "1ms",
                      security: "极致",
                      features: "任何场景完全自动",
                      color: "red",
                    },
                  ].map((level, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{level.level}</h4>
                        <Badge
                          className={
                            level.color === "green"
                              ? "bg-green-100 text-green-800"
                              : level.color === "blue"
                                ? "bg-blue-100 text-blue-800"
                                : level.color === "orange"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                          {level.requirements}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-muted-foreground">延迟要求:</span>
                          <div className="font-medium">{level.latency}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">安全等级:</span>
                          <div className="font-medium">{level.security}</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{level.features}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">关键安全要求</h4>
                  <div className="space-y-1 text-sm text-red-600">
                    <div>• 功能安全 - ISO 26262 ASIL D</div>
                    <div>• 网络安全 - ISO/SAE 21434</div>
                    <div>• 实时性保证 - 确定性延迟</div>
                    <div>• 冗余备份 - 多重安全机制</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/edge/autonomous">自动驾驶安全标准</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="industrial" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="h-5 w-5 text-indigo-600" />
                  工业4.0认证
                </CardTitle>
                <CardDescription>智能制造环境的边缘认证解决方案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-2">生产线设备认证</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-indigo-600">1,247</div>
                        <div className="text-xs text-indigo-700">工业设备</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-green-600">99.99%</div>
                        <div className="text-xs text-green-700">可靠性</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-blue-600">&lt;1ms</div>
                        <div className="text-xs text-blue-700">响应时间</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">TSN时间敏感网络</h4>
                    <div className="space-y-1 text-sm text-green-600">
                      <div>• 确定性延迟保证</div>
                      <div>• 流量整形与调度</div>
                      <div>• 时钟同步机制</div>
                      <div>• 冗余路径保护</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">OPC UA安全</h4>
                    <div className="space-y-1 text-sm text-purple-600">
                      <div>• 端到端加密传输</div>
                      <div>• 数字证书认证</div>
                      <div>• 访问权限控制</div>
                      <div>• 审计日志记录</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/edge/industrial/manufacturing">智能制造方案</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  边缘安全防护
                </CardTitle>
                <CardDescription>工业边缘环境的多层安全防护体系</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      layer: "设备层安全",
                      protection: "硬件安全模块",
                      coverage: "100%",
                      threats: "物理攻击、固件篡改",
                      color: "red",
                    },
                    {
                      layer: "网络层安全",
                      protection: "微分段隔离",
                      coverage: "99.9%",
                      threats: "网络入侵、横向移动",
                      color: "orange",
                    },
                    {
                      layer: "应用层安全",
                      protection: "零信任架构",
                      coverage: "99.8%",
                      threats: "恶意软件、权限滥用",
                      color: "yellow",
                    },
                    {
                      layer: "数据层安全",
                      protection: "端到端加密",
                      coverage: "100%",
                      threats: "数据泄露、篡改",
                      color: "green",
                    },
                  ].map((layer, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{layer.layer}</h4>
                        <Badge
                          className={
                            layer.color === "red"
                              ? "bg-red-100 text-red-800"
                              : layer.color === "orange"
                                ? "bg-orange-100 text-orange-800"
                                : layer.color === "yellow"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }
                        >
                          {layer.coverage}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-muted-foreground">防护机制:</span>
                          <span className="font-medium ml-1">{layer.protection}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">威胁类型:</span>
                          <span className="ml-1">{layer.threats}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">威胁检测与响应</h4>
                  <div className="space-y-1 text-sm text-orange-600">
                    <div>• AI异常行为检测</div>
                    <div>• 实时威胁情报</div>
                    <div>• 自动化响应机制</div>
                    <div>• 取证分析能力</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/edge/industrial/security">工业安全防护</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 边缘认证技术架构 */}
      <Card>
        <CardHeader>
          <CardTitle>🏗️ 边缘认证技术架构</CardTitle>
          <CardDescription>分布式边缘计算环境的认证系统架构设计</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-cyan-50 text-cyan-600 w-fit mx-auto">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="font-medium">终端设备层</h3>
              <p className="text-sm text-muted-foreground">海量IoT设备接入</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">轻量认证</Badge>
                <Badge variant="secondary">设备指纹</Badge>
                <Badge variant="secondary">本地缓存</Badge>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-blue-50 text-blue-600 w-fit mx-auto">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-medium">边缘计算层</h3>
              <p className="text-sm text-muted-foreground">就近认证处理</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">MEC节点</Badge>
                <Badge variant="secondary">智能路由</Badge>
                <Badge variant="secondary">负载均衡</Badge>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-green-50 text-green-600 w-fit mx-auto">
                <Wifi className="h-8 w-8" />
              </div>
              <h3 className="font-medium">网络传输层</h3>
              <p className="text-sm text-muted-foreground">5G/WiFi6网络</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">网络切片</Badge>
                <Badge variant="secondary">QoS保证</Badge>
                <Badge variant="secondary">安全隧道</Badge>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="rounded-full p-4 bg-purple-50 text-purple-600 w-fit mx-auto">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-medium">云端管理层</h3>
              <p className="text-sm text-muted-foreground">统一策略管理</p>
              <div className="space-y-1 text-xs">
                <Badge variant="secondary">策略下发</Badge>
                <Badge variant="secondary">监控告警</Badge>
                <Badge variant="secondary">数据分析</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
