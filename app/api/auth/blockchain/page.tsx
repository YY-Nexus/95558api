import { Link2, Shield, Users, Coins, Globe, Lock, Zap, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function BlockchainIdentityPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          🔗 区块链数字身份
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          去中心化的自主身份管理 - 构建用户完全掌控的数字身份体系
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/api/auth/blockchain/demo">🎮 DID演示</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/blockchain/did">🆔 去中心化身份</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/api/auth/blockchain/ssi">🔐 自主身份</Link>
          </Button>
        </div>
      </div>

      {/* 区块链身份核心特性 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-amber-100 text-amber-600 w-fit mx-auto">
              <Users className="h-6 w-6" />
            </div>
            <CardTitle className="text-amber-800">自主控制</CardTitle>
            <CardDescription>用户完全掌控身份数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>用户控制度</span>
                <span className="font-medium text-amber-600">100%</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-amber-600 mt-2">无需依赖第三方机构</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-blue-100 text-blue-600 w-fit mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-blue-800">隐私保护</CardTitle>
            <CardDescription>零知识证明技术</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>隐私保护</span>
                <span className="font-medium text-blue-600">最高级</span>
              </div>
              <Progress value={98} className="h-2" />
              <div className="text-xs text-blue-600 mt-2">选择性信息披露</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-green-100 text-green-600 w-fit mx-auto">
              <Link2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-green-800">互操作性</CardTitle>
            <CardDescription>跨链跨平台兼容</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>兼容性</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
              <Progress value={95} className="h-2" />
              <div className="text-xs text-green-600 mt-2">W3C DID标准</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="text-center pb-3">
            <div className="rounded-full p-3 bg-purple-100 text-purple-600 w-fit mx-auto">
              Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-purple-800">不可篡改</CardTitle>
            <CardDescription>区块链技术保障</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>安全性</span>
                <span className="font-medium text-purple-600">绝对</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-purple-600 mt-2">密码学保护</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 区块链身份技术详解 */}
      <Tabs defaultValue="did" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="did">去中心化身份</TabsTrigger>
          <TabsTrigger value="vc">可验证凭证</TabsTrigger>
          <TabsTrigger value="zkp">零知识证明</TabsTrigger>
          <TabsTrigger value="governance">治理机制</TabsTrigger>
        </TabsList>

        <TabsContent value="did" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  DID标识符体系
                </CardTitle>
                <CardDescription>W3C标准的去中心化身份标识符</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">DID格式规范</h4>
                    <div className="bg-black p-3 rounded text-green-400 text-sm font-mono">
                      did:yunshub:0x1234567890abcdef
                    </div>
                    <div className="mt-2 text-xs text-amber-600 space-y-1">
                      <div>• did: 固定前缀</div>
                      <div>• yunshub: 方法名称</div>
                      <div>• 0x123...: 唯一标识符</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">DID文档结构</h4>
                    <div className="bg-black p-3 rounded text-green-400 text-xs font-mono overflow-x-auto">
                      {`{
  "@context": "https://w3id.org/did/v1",
  "id": "did:yunshub:0x123...",
  "publicKey": [{
    "id": "did:yunshub:0x123...#key1",
    "type": "Ed25519VerificationKey2018",
    "controller": "did:yunshub:0x123...",
    "publicKeyBase58": "H3C2AVvL..."
  }],
  "authentication": ["#key1"],
  "service": [{
    "type": "IdentityHub",
    "serviceEndpoint": "https://hub.yunshub.com"
  }]
}`}
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/blockchain/did/specification">DID规范详解</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  多链支持架构
                </CardTitle>
                <CardDescription>支持主流区块链网络的DID实现</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      chain: "以太坊",
                      method: "did:ethr",
                      tps: "15",
                      cost: "高",
                      features: "智能合约、ERC标准",
                      status: "生产",
                      color: "blue",
                    },
                    {
                      chain: "Polygon",
                      method: "did:polygon",
                      tps: "7000",
                      cost: "低",
                      features: "Layer2、兼容以太坊",
                      status: "生产",
                      color: "purple",
                    },
                    {
                      chain: "BSC",
                      method: "did:bsc",
                      tps: "300",
                      cost: "中",
                      features: "高性能、低费用",
                      status: "测试",
                      color: "yellow",
                    },
                    {
                      chain: "Solana",
                      method: "did:sol",
                      tps: "65000",
                      cost: "极低",
                      features: "高吞吐、低延迟",
                      status: "开发",
                      color: "green",
                    },
                  ].map((chain, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{chain.chain}</h4>
                        <Badge
                          className={
                            chain.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : chain.color === "purple"
                                ? "bg-purple-100 text-purple-800"
                                : chain.color === "yellow"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }
                        >
                          {chain.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-muted-foreground">TPS:</span>
                          <div className="font-medium">{chain.tps}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">成本:</span>
                          <div className="font-medium">{chain.cost}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">方法:</span>
                          <div className="font-medium text-xs">{chain.method}</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{chain.features}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/blockchain/did/chains">多链集成指南</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vc" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  可验证凭证系统
                </CardTitle>
                <CardDescription>基于W3C标准的数字凭证管理</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">凭证类型</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">身份凭证</div>
                        <div className="text-xs text-muted-foreground">姓名、年龄、国籍</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">学历凭证</div>
                        <div className="text-xs text-muted-foreground">学位、证书、成绩</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">职业凭证</div>
                        <div className="text-xs text-muted-foreground">工作经历、技能</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">资产凭证</div>
                        <div className="text-xs text-muted-foreground">财产、投资、信用</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">凭证结构</h4>
                    <div className="bg-black p-3 rounded text-green-400 text-xs font-mono overflow-x-auto">
                      {`{
  "@context": ["https://w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "UniversityDegree"],
  "issuer": "did:yunshub:university",
  "issuanceDate": "2024-01-15T00:00:00Z",
  "credentialSubject": {
    "id": "did:yunshub:student",
    "degree": "Bachelor of Science",
    "university": "云枢大学"
  },
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2024-01-15T00:00:00Z",
    "verificationMethod": "did:yunshub:university#key1",
    "proofValue": "z3FXQc..."
  }
}`}
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/blockchain/vc/types">凭证类型详解</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  凭证验证流程
                </CardTitle>
                <CardDescription>端到端的凭证颁发与验证机制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      step: "1. 凭证申请",
                      actor: "持有者",
                      action: "向颁发机构提交申请",
                      verification: "身份验证",
                      color: "blue",
                    },
                    {
                      step: "2. 凭证颁发",
                      actor: "颁发机构",
                      action: "审核并签发数字凭证",
                      verification: "数字签名",
                      color: "green",
                    },
                    {
                      step: "3. 凭证存储",
                      actor: "持有者",
                      action: "安全存储在数字钱包",
                      verification: "本地加密",
                      color: "purple",
                    },
                    {
                      step: "4. 凭证出示",
                      actor: "持有者",
                      action: "选择性披露给验证方",
                      verification: "零知识证明",
                      color: "orange",
                    },
                    {
                      step: "5. 凭证验证",
                      actor: "验证方",
                      action: "验证凭证真实性",
                      verification: "签名验证",
                      color: "red",
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div
                        className={`rounded-full p-2 text-white text-xs font-bold w-8 h-8 flex items-center justify-center ${
                          step.color === "blue"
                            ? "bg-blue-500"
                            : step.color === "green"
                              ? "bg-green-500"
                              : step.color === "purple"
                                ? "bg-purple-500"
                                : step.color === "orange"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{step.step}</h4>
                        <p className="text-xs text-muted-foreground">{step.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {step.actor}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {step.verification}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/blockchain/vc/workflow">验证流程详解</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zkp" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-indigo-600" />
                  零知识证明技术
                </CardTitle>
                <CardDescription>在不泄露信息的前提下证明知识</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-2">ZKP核心特性</h4>
                    <div className="space-y-2 text-sm text-indigo-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span>完整性 - 诚实的证明者总能说服验证者</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span>可靠性 - 欺骗的证明者无法说服验证者</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span>零知识 - 验证者无法获得额外信息</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <h4 className="font-medium text-cyan-800 mb-2">应用场景</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">年龄证明</div>
                        <div className="text-xs text-muted-foreground">证明年满18岁</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">收入证明</div>
                        <div className="text-xs text-muted-foreground">证明收入范围</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">学历证明</div>
                        <div className="text-xs text-muted-foreground">证明学位等级</div>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <div className="font-medium">信用证明</div>
                        <div className="text-xs text-muted-foreground">证明信用评级</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/blockchain/zkp/concepts">ZKP概念详解</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  ZKP算法实现
                </CardTitle>
                <CardDescription>主流零知识证明算法对比</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      algorithm: "zk-SNARKs",
                      proofSize: "288B",
                      verifyTime: "2ms",
                      setupTrust: "需要",
                      quantum: "不安全",
                      usage: "隐私交易",
                      color: "blue",
                    },
                    {
                      algorithm: "zk-STARKs",
                      proofSize: "100KB",
                      verifyTime: "10ms",
                      setupTrust: "不需要",
                      quantum: "安全",
                      usage: "可扩展性",
                      color: "green",
                    },
                    {
                      algorithm: "Bulletproofs",
                      proofSize: "1.3KB",
                      verifyTime: "50ms",
                      setupTrust: "不需要",
                      quantum: "不安全",
                      usage: "范围证明",
                      color: "purple",
                    },
                    {
                      algorithm: "PLONK",
                      proofSize: "320B",
                      verifyTime: "5ms",
                      setupTrust: "通用",
                      quantum: "不安全",
                      usage: "通用电路",
                      color: "orange",
                    },
                  ].map((algo, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{algo.algorithm}</h4>
                        <Badge
                          className={
                            algo.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : algo.color === "green"
                                ? "bg-green-100 text-green-800"
                                : algo.color === "purple"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-orange-100 text-orange-800"
                          }
                        >
                          {algo.usage}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">证明大小:</span>
                          <div className="font-medium">{algo.proofSize}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">验证时间:</span>
                          <div className="font-medium">{algo.verifyTime}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">可信设置:</span>
                          <div className="font-medium">{algo.setupTrust}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">量子安全:</span>
                          <div className="font-medium">{algo.quantum}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/blockchain/zkp/algorithms">算法详细对比</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  去中心化治理
                </CardTitle>
                <CardDescription>社区驱动的身份网络治理机制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">治理参与者</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-amber-600">12,847</div>
                        <div className="text-xs text-amber-700">代币持有者</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-blue-600">156</div>
                        <div className="text-xs text-blue-700">验证节点</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-green-600">89</div>
                        <div className="text-xs text-green-700">颁发机构</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-lg font-bold text-purple-600">23</div>
                        <div className="text-xs text-purple-700">核心开发者</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">治理提案类型</h4>
                    <div className="space-y-2 text-sm text-blue-600">
                      <div>• 协议升级 - 技术改进和新功能</div>
                      <div>• 参数调整 - 费用、奖励等参数</div>
                      <div>• 标准制定 - 新的凭证类型标准</div>
                      <div>• 资金分配 - 生态发展基金使用</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/api/auth/blockchain/governance/dao">DAO治理详解</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-green-600" />
                  经济激励模型
                </CardTitle>
                <CardDescription>可持续的代币经济和激励机制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">代币分配</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>社区奖励</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>生态发展</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>团队预留</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-1" />
                      <div className="flex justify-between text-sm">
                        <span>投资者</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-1" />
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">激励机制</h4>
                    <div className="space-y-2 text-sm text-purple-600">
                      <div>• 验证奖励 - 节点验证获得代币</div>
                      <div>• 使用奖励 - 活跃用户获得奖励</div>
                      <div>• 贡献奖励 - 开发者贡献奖励</div>
                      <div>• 治理奖励 - 参与治理获得奖励</div>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">费用模型</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">DID注册:</span>
                        <div className="font-medium">0.1 YSH</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">凭证颁发:</span>
                        <div className="font-medium">0.05 YSH</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">凭证验证:</span>
                        <div className="font-medium">0.01 YSH</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">治理投票:</span>
                        <div className="font-medium">免费</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/auth/blockchain/governance/tokenomics">代币经济详解</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
