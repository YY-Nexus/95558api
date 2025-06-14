import { Atom, Shield, Zap, Lock, Eye, Cpu, Network, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function QuantumAuthPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          ⚛️ 量子安全认证
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          基于量子力学原理的下一代加密技术 - 构建绝对安全的认证防护体系
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/quantum/demo">🎮 量子演示</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/quantum/qkd">🔗 量子密钥分发</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/quantum/pqc">🛡️ 后量子密码</Link>
          </Button>
        </div>
      </div>

      {/* 量子安全核心技术 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-violet-100 text-violet-600 w-fit mx-auto">
              <Atom className="h-6 w-6" />
            </div>
            <CardTitle className="text-violet-800">量子密钥分发</CardTitle>
            <CardDescription>QKD - 绝对安全的密钥传输</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>安全等级</span>
                <span className="font-medium text-violet-600">绝对安全</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-violet-600 mt-2">基于量子不可克隆定理</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 w-fit mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-blue-800">后量子密码</CardTitle>
            <CardDescription>PQC - 抗量子计算攻击</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>抗攻击能力</span>
                <span className="font-medium text-blue-600">2^256</span>
              </div>
              <Progress value={95} className="h-2" />
              <div className="text-xs text-blue-600 mt-2">NIST标准化算法</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit mx-auto">
              <Zap className="h-6 w-6" />
            </div>
            <CardTitle className="text-green-800">量子随机数</CardTitle>
            <CardDescription>QRNG - 真随机数生成</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>随机性</span>
                <span className="font-medium text-green-600">真随机</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-green-600 mt-2">量子物理熵源</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-orange-100 text-orange-600 w-fit mx-auto">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-orange-800">量子签名</CardTitle>
            <CardDescription>QDS - 不可伪造数字签名</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>防伪造性</span>
                <span className="font-medium text-orange-600">绝对</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-orange-600 mt-2">量子不可克隆性</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 量子技术详解 */}
      <Tabs defaultValue="qkd" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="qkd">量子密钥分发</TabsTrigger>
          <TabsTrigger value="pqc">后量子密码</TabsTrigger>
          <TabsTrigger value="qrng">量子随机数</TabsTrigger>
          <TabsTrigger value="implementation">技术实现</TabsTrigger>
        </TabsList>

        <TabsContent value="qkd" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Atom className="h-5 w-5 text-violet-600" />
                  量子密钥分发原理
                </CardTitle>
                <CardDescription>基于量子力学基本原理的绝对安全密钥传输</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                    <h4 className="font-medium text-violet-800 mb-2">海森堡不确定性原理</h4>
                    <p className="text-sm text-violet-600">
                      任何测量行为都会改变量子态，使窃听者无法获取完整信息而不被发现
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">量子不可克隆定理</h4>
                    <p className="text-sm text-blue-600">未知量子态无法被完美复制，确保密钥传输过程的唯一性</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">量子纠缠特性</h4>
                    <p className="text-sm text-green-600">纠缠粒子间的瞬时关联性，实现远距离安全密钥分发</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/quantum/qkd/theory">深入了解QKD理论</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-indigo-600" />
                  QKD协议实现
                </CardTitle>
                <CardDescription>主流量子密钥分发协议对比分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      name: "BB84协议",
                      security: "信息论安全",
                      efficiency: "25%",
                      distance: "200km",
                      status: "商用",
                      color: "green",
                    },
                    {
                      name: "E91协议",
                      security: "基于纠缠",
                      efficiency: "50%",
                      distance: "100km",
                      status: "实验",
                      color: "blue",
                    },
                    {
                      name: "SARG04协议",
                      security: "抗PNS攻击",
                      efficiency: "12.5%",
                      distance: "150km",
                      status: "研发",
                      color: "yellow",
                    },
                    {
                      name: "MDI-QKD协议",
                      security: "测量设备无关",
                      efficiency: "10%",
                      distance: "400km",
                      status: "测试",
                      color: "purple",
                    },
                  ].map((protocol, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{protocol.name}</h4>
                        <Badge
                          className={
                            protocol.color === "green"
                              ? "bg-green-100 text-green-800"
                              : protocol.color === "blue"
                                ? "bg-blue-100 text-blue-800"
                                : protocol.color === "yellow"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-purple-100 text-purple-800"
                          }
                        >
                          {protocol.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">安全性:</span>
                          <div className="font-medium">{protocol.security}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">效率:</span>
                          <div className="font-medium">{protocol.efficiency}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">距离:</span>
                          <div className="font-medium">{protocol.distance}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/quantum/qkd/protocols">协议详细对比</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pqc" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  后量子密码算法
                </CardTitle>
                <CardDescription>NIST标准化的抗量子计算攻击算法</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      category: "基于格的密码",
                      algorithms: ["CRYSTALS-Kyber", "CRYSTALS-Dilithium"],
                      security: "最高",
                      performance: "优秀",
                      status: "NIST标准",
                      color: "green",
                    },
                    {
                      category: "基于编码的密码",
                      algorithms: ["Classic McEliece", "BIKE"],
                      security: "高",
                      performance: "良好",
                      status: "候选算法",
                      color: "blue",
                    },
                    {
                      category: "基于多变量的密码",
                      algorithms: ["Rainbow", "GeMSS"],
                      security: "中等",
                      performance: "一般",
                      status: "研究中",
                      color: "yellow",
                    },
                    {
                      category: "基于同源的密码",
                      algorithms: ["SIKE", "CSIDH"],
                      security: "高",
                      performance: "较慢",
                      status: "实验性",
                      color: "orange",
                    },
                  ].map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{category.category}</h4>
                        <Badge
                          className={
                            category.color === "green"
                              ? "bg-green-100 text-green-800"
                              : category.color === "blue"
                                ? "bg-blue-100 text-blue-800"
                                : category.color === "yellow"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-orange-100 text-orange-800"
                          }
                        >
                          {category.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {category.algorithms.map((algo, algoIndex) => (
                            <Badge key={algoIndex} variant="secondary" className="text-xs">
                              {algo}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">安全性:</span>
                            <span className="font-medium ml-1">{category.security}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">性能:</span>
                            <span className="font-medium ml-1">{category.performance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/quantum/pqc/algorithms">算法详细分析</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-600" />
                  量子威胁评估
                </CardTitle>
                <CardDescription>量子计算对现有密码系统的威胁分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-800 mb-2">高风险算法</h4>
                    <div className="space-y-1 text-sm text-red-600">
                      <div>• RSA - Shor算法可破解</div>
                      <div>• ECC - 椭圆曲线离散对数问题</div>
                      <div>• DSA - 数字签名算法脆弱</div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">中等风险算法</h4>
                    <div className="space-y-1 text-sm text-yellow-600">
                      <div>• AES-128 - 需升级到AES-256</div>
                      <div>• SHA-256 - Grover算法影响</div>
                      <div>• HMAC - 需增强密钥长度</div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">量子安全算法</h4>
                    <div className="space-y-1 text-sm text-green-600">
                      <div>• AES-256 - 量子安全</div>
                      <div>• SHA-3 - 抗量子攻击</div>
                      <div>• 后量子密码 - 专门设计</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">迁移时间线</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>当前阶段</span>
                      <span className="font-medium">准备期</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="text-xs text-blue-600">预计2030年开始大规模迁移</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/quantum/threat-assessment">威胁评估报告</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qrng" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  量子随机数生成
                </CardTitle>
                <CardDescription>基于量子物理的真随机数生成技术</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">光子偏振测量</h4>
                    <p className="text-sm text-green-600">通过测量单光子的偏振态获得真随机比特流</p>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">熵率:</span>
                      <span className="font-medium ml-1">1.0 bit/photon</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">真空涨落</h4>
                    <p className="text-sm text-blue-600">利用量子真空中的零点能涨落产生随机数</p>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">速率:</span>
                      <span className="font-medium ml-1">1 Gbps</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">量子隧穿效应</h4>
                    <p className="text-sm text-purple-600">基于电子隧穿的随机性生成高质量随机数</p>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">功耗:</span>
                      <span className="font-medium ml-1">超低功耗</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-muted rounded">
                    <div className="text-lg font-bold text-green-600">100%</div>
                    <div className="text-xs text-muted-foreground">真随机性</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="text-lg font-bold text-blue-600">1Gbps</div>
                    <div className="text-xs text-muted-foreground">生成速率</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="text-lg font-bold text-purple-600">∞</div>
                    <div className="text-xs text-muted-foreground">周期长度</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/quantum/qrng/demo">QRNG在线演示</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-orange-600" />
                  随机性质量检测
                </CardTitle>
                <CardDescription>量子随机数的统计检验和质量评估</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { test: "频率检验", result: "通过", score: "99.8%", status: "excellent" },
                    { test: "块内频率检验", result: "通过", score: "99.5%", status: "excellent" },
                    { test: "游程检验", result: "通过", score: "99.7%", status: "excellent" },
                    { test: "最长游程检验", result: "通过", score: "99.3%", status: "excellent" },
                    { test: "二元矩阵秩检验", result: "通过", score: "99.6%", status: "excellent" },
                    { test: "离散傅里叶变换", result: "通过", score: "99.4%", status: "excellent" },
                    { test: "非重叠模板匹配", result: "通过", score: "99.2%", status: "excellent" },
                    { test: "重叠模板匹配", result: "通过", score: "99.1%", status: "excellent" },
                  ].map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm font-medium">{test.test}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{test.score}</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">{test.result}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">NIST SP 800-22 测试套件</h4>
                  <div className="flex justify-between text-sm">
                    <span>总体通过率</span>
                    <span className="font-medium text-green-600">99.45%</span>
                  </div>
                  <Progress value={99.45} className="h-2 mt-2" />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/quantum/qrng/testing">详细测试报告</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-600" />
                  量子认证架构
                </CardTitle>
                <CardDescription>量子安全认证系统的技术架构设计</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-2">量子安全层</h4>
                    <ul className="text-sm text-indigo-600 space-y-1">
                      <li>• QKD密钥管理中心</li>
                      <li>• 量子随机数生成器</li>
                      <li>• 后量子密码引擎</li>
                      <li>• 量子签名验证器</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <h4 className="font-medium text-cyan-800 mb-2">混合密码层</h4>
                    <ul className="text-sm text-cyan-600 space-y-1">
                      <li>• 经典-量子密码桥接</li>
                      <li>• 渐进式迁移支持</li>
                      <li>• 兼容性适配器</li>
                      <li>• 性能优化引擎</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <h4 className="font-medium text-teal-800 mb-2">应用接口层</h4>
                    <ul className="text-sm text-teal-600 space-y-1">
                      <li>• 量子安全API</li>
                      <li>• SDK集成工具包</li>
                      <li>• 开发者控制台</li>
                      <li>• 监控告警系统</li>
                    </ul>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/quantum/architecture">架构详细设计</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  部署实施路线
                </CardTitle>
                <CardDescription>量子安全认证的分阶段部署计划</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      phase: "第一阶段",
                      title: "量子随机数集成",
                      duration: "3-4个月",
                      progress: 85,
                      items: ["QRNG硬件部署", "随机数API开发", "质量检测系统", "性能基准测试"],
                      status: "进行中",
                      color: "blue",
                    },
                    {
                      phase: "第二阶段",
                      title: "后量子密码迁移",
                      duration: "6-8个月",
                      progress: 40,
                      items: ["PQC算法选型", "密钥管理升级", "签名系统改造", "兼容性测试"],
                      status: "计划中",
                      color: "green",
                    },
                    {
                      phase: "第三阶段",
                      title: "量子密钥分发",
                      duration: "8-12个月",
                      progress: 15,
                      items: ["QKD网络建设", "协议栈开发", "安全认证", "商用部署"],
                      status: "准备中",
                      color: "purple",
                    },
                    {
                      phase: "第四阶段",
                      title: "全量子安全",
                      duration: "12-18个月",
                      progress: 5,
                      items: ["量子签名", "量子身份", "量子网络", "生态建设"],
                      status: "规划中",
                      color: "orange",
                    },
                  ].map((phase, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">
                            {phase.phase}: {phase.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">预计时间: {phase.duration}</p>
                        </div>
                        <Badge
                          className={
                            phase.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : phase.color === "green"
                                ? "bg-green-100 text-green-800"
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
                      <div className="grid gap-1 md:grid-cols-2 mt-3">
                        {phase.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/quantum/roadmap">详细实施计划</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
