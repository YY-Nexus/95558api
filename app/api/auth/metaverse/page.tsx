import { Gamepad2, Eye, Users, Shield, Globe, Zap, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function MetaverseAuthPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          🌐 元宇宙认证体系
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          虚拟世界的身份认证革命 - 构建安全可信的数字化身与虚拟身份体系
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/metaverse/demo">🎮 虚拟体验</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/metaverse/avatar">👤 数字化身</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/metaverse/nft">🎨 NFT身份</Link>
          </Button>
        </div>
      </div>

      {/* 元宇宙认证核心特性 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-pink-100 text-pink-600 w-fit mx-auto">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-pink-800">沉浸体验</CardTitle>
            <CardDescription>真实的虚拟身份体验</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>沉浸度</span>
                <span className="font-medium text-pink-600">98%</span>
              </div>
              <Progress value={98} className="h-2" />
              <div className="text-xs text-pink-600 mt-2">VR/AR全感官体验</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 w-fit mx-auto">
              <Eye className="h-6 w-6" />
            </div>
            <CardTitle className="text-blue-800">生物识别</CardTitle>
            <CardDescription>多模态生物特征认证</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>识别精度</span>
                <span className="font-medium text-blue-600">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
              <div className="text-xs text-blue-600 mt-2">眼纹+声纹+行为识别</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-green-800">隐私保护</CardTitle>
            <CardDescription>零知识身份验证</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>隐私等级</span>
                <span className="font-medium text-green-600">最高</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-green-600 mt-2">选择性信息披露</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-orange-100 text-orange-600 w-fit mx-auto">
              <Globe className="h-6 w-6" />
            </div>
            <CardTitle className="text-orange-800">跨平台</CardTitle>
            <CardDescription>统一身份多平台互通</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>兼容性</span>
                <span className="font-medium text-orange-600">95%</span>
              </div>
              <Progress value={95} className="h-2" />
              <div className="text-xs text-orange-600 mt-2">主流元宇宙平台</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 元宇宙认证技术详解 */}
      <Tabs defaultValue="avatar" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="avatar">数字化身</TabsTrigger>
          <TabsTrigger value="biometric">生物识别</TabsTrigger>
          <TabsTrigger value="nft">NFT身份</TabsTrigger>
          <TabsTrigger value="social">社交认证</TabsTrigger>
          <TabsTrigger value="economy">虚拟经济</TabsTrigger>
        </TabsList>

        <TabsContent value="avatar" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-pink-600" />
                  3D数字化身系统
                </CardTitle>
                <CardDescription>高度个性化的虚拟形象创建与管理</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <h4 className="font-medium text-pink-800 mb-2">化身创建技术</h4>
                    <div className="space-y-1 text-sm text-pink-600">
                      <div>• 3D扫描技术 - 真实面部建模</div>
                      <div>• AI生成算法 - 智能特征优化</div>
                      <div>• 动作捕捉 - 自然肢体动画</div>
                      <div>• 表情同步 - 实时情感表达</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">个性化定制</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">外观定制</div>
                        <div className="text-xs text-muted-foreground">发型、服装、配饰</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">动作风格</div>
                        <div className="text-xs text-muted-foreground">走路、手势、表情</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">声音合成</div>
                        <div className="text-xs text-muted-foreground">个性化语音</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">特效增强</div>
                        <div className="text-xs text-muted-foreground">光效、粒子效果</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/metaverse/avatar/create">创建数字化身</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  行为认证系统
                </CardTitle>
                <CardDescription>基于虚拟世界行为模式的身份验证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">行为特征分析</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>移动模式</span>
                        <span className="font-medium">98.5%</span>
                      </div>
                      <Progress value={98.5} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>交互习惯</span>
                        <span className="font-medium">96.8%</span>
                      </div>
                      <Progress value={96.8} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>社交模式</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-1" />
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-2">异常检测</h4>
                    <div className="space-y-1 text-sm text-indigo-600">
                      <div>• 账户盗用检测</div>
                      <div>• 机器人行为识别</div>
                      <div>• 多重身份检测</div>
                      <div>• 恶意行为预警</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/metaverse/behavior">行为分析详解</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="biometric" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  多模态生物识别
                </CardTitle>
                <CardDescription>融合多种生物特征的高精度身份认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      type: "眼纹识别",
                      accuracy: "99.97%",
                      speed: "0.3s",
                      uniqueness: "1:10^17",
                      advantage: "终生不变、无法伪造",
                      color: "blue",
                    },
                    {
                      type: "声纹识别",
                      accuracy: "99.5%",
                      speed: "0.5s",
                      uniqueness: "1:10^12",
                      advantage: "远程识别、自然交互",
                      color: "green",
                    },
                    {
                      type: "步态识别",
                      accuracy: "96.8%",
                      speed: "1.0s",
                      uniqueness: "1:10^8",
                      advantage: "远距离识别、难以模仿",
                      color: "purple",
                    },
                    {
                      type: "手势识别",
                      accuracy: "94.2%",
                      speed: "0.8s",
                      uniqueness: "1:10^6",
                      advantage: "VR环境友好、直观操作",
                      color: "orange",
                    },
                  ].map((bio, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{bio.type}</h4>
                        <Badge
                          className={
                            bio.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : bio.color === "green"
                                ? "bg-green-100 text-green-800"
                                : bio.color === "purple"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-orange-100 text-orange-800"
                          }
                        >
                          {bio.accuracy}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-muted-foreground">识别速度:</span>
                          <div className="font-medium">{bio.speed}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">唯一性:</span>
                          <div className="font-medium">{bio.uniqueness}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">优势:</span>
                          <div className="font-medium text-xs">{bio.advantage}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/metaverse/biometric/setup">设置生物识别</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  VR/AR设备集成
                </CardTitle>
                <CardDescription>针对虚拟现实设备优化的认证方案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">支持设备</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">Meta Quest</div>
                        <div className="text-xs text-muted-foreground">眼动追踪、手势识别</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">HTC Vive</div>
                        <div className="text-xs text-muted-foreground">全身追踪、语音识别</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">Apple Vision Pro</div>
                        <div className="text-xs text-muted-foreground">虹膜识别、面部识别</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">HoloLens</div>
                        <div className="text-xs text-muted-foreground">手势识别、语音识别</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-800 mb-2">认证流程优化</h4>
                    <div className="space-y-1 text-sm text-emerald-600">
                      <div>• 无感知认证 - 佩戴即认证</div>
                      <div>• 连续验证 - 使用过程持续确认</div>
                      <div>• 快速切换 - 多用户设备共享</div>
                      <div>• 离线模式 - 本地生物特征缓存</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/metaverse/devices">设备兼容性</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nft" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-orange-600" />
                  NFT身份证书
                </CardTitle>
                <CardDescription>基于区块链的不可伪造数字身份</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">身份NFT类型</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">基础身份</div>
                        <div className="text-xs text-muted-foreground">姓名、头像、简介</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">成就徽章</div>
                        <div className="text-xs text-muted-foreground">技能、荣誉、等级</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">社交关系</div>
                        <div className="text-xs text-muted-foreground">好友、团队、组织</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">资产证明</div>
                        <div className="text-xs text-muted-foreground">虚拟物品所有权</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">NFT身份优势</h4>
                    <div className="space-y-1 text-sm text-amber-600">
                      <div>• 不可伪造 - 区块链技术保证唯一性</div>
                      <div>• 可验证 - 身份信息透明可验证</div>
                      <div>• 可移植 - 跨平台使用</div>
                      <div>• 可定制 - 个性化身份展示</div>
                    </div>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <h4 className="font-medium text-teal-800 mb-2">创建流程</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs">
                          1
                        </div>
                        <span className="text-sm">验证真实身份</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs">
                          2
                        </div>
                        <span className="text-sm">生成NFT身份模板</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs">
                          3
                        </div>
                        <span className="text-sm">添加个人信息和成就</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs">
                          4
                        </div>
                        <span className="text-sm">铸造NFT身份证书</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/metaverse/nft/create">创建NFT身份</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  身份安全保障
                </CardTitle>
                <CardDescription>多重安全机制保护数字身份</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">安全防护层</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">区块链验证</div>
                        <div className="text-xs text-muted-foreground">以太坊Layer 2</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">多因素认证</div>
                        <div className="text-xs text-muted-foreground">生物识别+硬件令牌</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">智能合约保护</div>
                        <div className="text-xs text-muted-foreground">防篡改代码</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">去中心化存储</div>
                        <div className="text-xs text-muted-foreground">IPFS分布式存储</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-800 mb-2">私钥管理</h4>
                    <div className="space-y-1 text-sm text-emerald-600">
                      <div>• 分层确定性钱包</div>
                      <div>• 硬件钱包支持</div>
                      <div>• 私钥分片存储</div>
                      <div>• 多签授权机制</div>
                    </div>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                    <h4 className="font-medium text-rose-800 mb-2">风险控制</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>异常登录检测</span>
                        <span className="font-medium">99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>交易风险评估</span>
                        <span className="font-medium">98.7%</span>
                      </div>
                      <Progress value={98.7} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>身份盗用恢复</span>
                        <span className="font-medium">97.5%</span>
                      </div>
                      <Progress value={97.5} className="h-1" />
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/metaverse/security">安全中心</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  社交关系图谱
                </CardTitle>
                <CardDescription>基于信任网络的社交身份认证</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">信任网络</h4>
                    <div className="space-y-1 text-sm text-blue-600">
                      <div>• 好友推荐系统</div>
                      <div>• 社交证明机制</div>
                      <div>• 共同兴趣发现</div>
                      <div>• 社区影响力评估</div>
                    </div>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                    <h4 className="font-medium text-sky-800 mb-2">社交身份验证</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs">
                          1
                        </div>
                        <span className="text-sm">联系人验证</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs">
                          2
                        </div>
                        <span className="text-sm">社交平台绑定</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs">
                          3
                        </div>
                        <span className="text-sm">社区贡献证明</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs">
                          4
                        </div>
                        <span className="text-sm">声誉系统评分</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-2">隐私控制</h4>
                    <div className="space-y-1 text-sm text-indigo-600">
                      <div>• 精细权限管理</div>
                      <div>• 选择性信息共享</div>
                      <div>• 匿名社交模式</div>
                      <div>• 数据使用审计</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/metaverse/social">社交身份设置</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  跨平台社交
                </CardTitle>
                <CardDescription>统一身份跨平台社交体验</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">支持平台</h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="text-purple-600 font-bold">VR Chat</div>
                        <div className="text-xs text-muted-foreground">完全支持</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="text-blue-600 font-bold">Decentraland</div>
                        <div className="text-xs text-muted-foreground">完全支持</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="text-indigo-600 font-bold">The Sandbox</div>
                        <div className="text-xs text-muted-foreground">完全支持</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="text-emerald-600 font-bold">Horizon Worlds</div>
                        <div className="text-xs text-muted-foreground">部分支持</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="text-amber-600 font-bold">Roblox</div>
                        <div className="text-xs text-muted-foreground">开发中</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="text-rose-600 font-bold">Fortnite</div>
                        <div className="text-xs text-muted-foreground">开发中</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                    <h4 className="font-medium text-violet-800 mb-2">社交同步功能</h4>
                    <div className="space-y-1 text-sm text-violet-600">
                      <div>• 好友列表同步</div>
                      <div>• 聊天历史同步</div>
                      <div>• 成就与进度同步</div>
                      <div>• 内容分享互通</div>
                    </div>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <h4 className="font-medium text-teal-800 mb-2">社交图谱分析</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>社交关系强度</span>
                        <span className="font-medium">97.3%</span>
                      </div>
                      <Progress value={97.3} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>跨平台活跃度</span>
                        <span className="font-medium">94.6%</span>
                      </div>
                      <Progress value={94.6} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>社区参与度</span>
                        <span className="font-medium">92.1%</span>
                      </div>
                      <Progress value={92.1} className="h-1" />
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/metaverse/connect">连接平台</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economy" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-600" />
                  虚拟经济身份
                </CardTitle>
                <CardDescription>元宇宙中的经济活动身份</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">经济身份组件</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">信用评分</div>
                        <div className="text-xs text-muted-foreground">虚拟经济信用记录</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">资产证明</div>
                        <div className="text-xs text-muted-foreground">虚拟资产所有权</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">交易历史</div>
                        <div className="text-xs text-muted-foreground">透明交易记录</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">专业资质</div>
                        <div className="text-xs text-muted-foreground">技能与服务认证</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">虚拟货币账户</h4>
                    <div className="space-y-1 text-sm text-orange-600">
                      <div>• 多币种钱包支持</div>
                      <div>• 跨平台支付系统</div>
                      <div>• 微交易支持</div>
                      <div>• 智能合约支付</div>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-800 mb-2">身份经济价值</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>身份声誉评分</span>
                        <span className="font-medium">96.8</span>
                      </div>
                      <Progress value={96.8} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>经济活动参与度</span>
                        <span className="font-medium">94.3</span>
                      </div>
                      <Progress value={94.3} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>资产安全等级</span>
                        <span className="font-medium">98.5</span>
                      </div>
                      <Progress value={98.5} className="h-1" />
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/metaverse/wallet">管理虚拟钱包</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-rose-600" />
                  交易安全保障
                </CardTitle>
                <CardDescription>安全可靠的虚拟经济交易环境</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                    <h4 className="font-medium text-rose-800 mb-2">交易保护</h4>
                    <div className="space-y-1 text-sm text-rose-600">
                      <div>• 智能合约托管</div>
                      <div>• 多重签名交易</div>
                      <div>• 交易风险评估</div>
                      <div>• 争议解决机制</div>
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-800 mb-2">反欺诈系统</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>欺诈交易拦截</span>
                        <span className="font-medium">99.7%</span>
                      </div>
                      <Progress value={99.7} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>可疑活动检测</span>
                        <span className="font-medium">98.9%</span>
                      </div>
                      <Progress value={98.9} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>身份盗用防护</span>
                        <span className="font-medium">99.4%</span>
                      </div>
                      <Progress value={99.4} className="h-1" />
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">合规与监管</h4>
                    <div className="space-y-1 text-sm text-slate-600">
                      <div>• KYC/AML 合规支持</div>
                      <div>• 税务报告工具</div>
                      <div>• 虚拟资产登记</div>
                      <div>• 监管审计接口</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/metaverse/security">安全中心</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
