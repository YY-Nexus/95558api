"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Star, Trophy, Gift, Calendar, BookOpen, Code, Lightbulb, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CommunityMember {
  id: string
  name: string
  avatar: string
  role: "developer" | "contributor" | "maintainer" | "admin"
  contributions: number
  reputation: number
  joinDate: string
  specialties: string[]
}

interface CommunityEvent {
  id: string
  title: string
  description: string
  type: "workshop" | "hackathon" | "meetup" | "webinar"
  date: string
  participants: number
  maxParticipants: number
  status: "upcoming" | "ongoing" | "completed"
}

interface ContributionReward {
  id: string
  title: string
  description: string
  points: number
  badge: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export function CommunityBuilder() {
  const [activeTab, setActiveTab] = useState("overview")
  const [members, setMembers] = useState<CommunityMember[]>([])
  const [events, setEvents] = useState<CommunityEvent[]>([])
  const [rewards, setRewards] = useState<ContributionReward[]>([])
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const { toast } = useToast()

  // 初始化社区数据
  useEffect(() => {
    // 模拟社区成员数据
    setMembers([
      {
        id: "1",
        name: "张开发",
        avatar: "/placeholder.svg?height=40&width=40&text=张",
        role: "maintainer",
        contributions: 156,
        reputation: 2340,
        joinDate: "2023-01-15",
        specialties: ["React", "TypeScript", "Node.js"],
      },
      {
        id: "2",
        name: "李前端",
        avatar: "/placeholder.svg?height=40&width=40&text=李",
        role: "contributor",
        contributions: 89,
        reputation: 1580,
        joinDate: "2023-03-22",
        specialties: ["Vue.js", "CSS", "UI/UX"],
      },
      {
        id: "3",
        name: "王全栈",
        avatar: "/placeholder.svg?height=40&width=40&text=王",
        role: "developer",
        contributions: 45,
        reputation: 890,
        joinDate: "2023-06-10",
        specialties: ["Python", "Django", "PostgreSQL"],
      },
      {
        id: "4",
        name: "赵架构",
        avatar: "/placeholder.svg?height=40&width=40&text=赵",
        role: "admin",
        contributions: 234,
        reputation: 3450,
        joinDate: "2022-11-08",
        specialties: ["系统架构", "微服务", "DevOps"],
      },
    ])

    // 模拟社区活动数据
    setEvents([
      {
        id: "1",
        title: "React 18 新特性深度解析",
        description: "探讨React 18的并发特性、Suspense改进和新的Hooks",
        type: "workshop",
        date: "2024-01-20",
        participants: 45,
        maxParticipants: 50,
        status: "upcoming",
      },
      {
        id: "2",
        title: "云原生应用开发大赛",
        description: "48小时黑客马拉松，构建下一代云原生应用",
        type: "hackathon",
        date: "2024-02-15",
        participants: 128,
        maxParticipants: 200,
        status: "upcoming",
      },
      {
        id: "3",
        title: "AI驱动的代码优化技术分享",
        description: "分享如何使用AI工具提升代码质量和开发效率",
        type: "webinar",
        date: "2024-01-10",
        participants: 89,
        maxParticipants: 100,
        status: "completed",
      },
    ])

    // 模拟贡献奖励数据
    setRewards([
      {
        id: "1",
        title: "首次贡献者",
        description: "提交第一个PR或Issue",
        points: 100,
        badge: "🌟",
        rarity: "common",
      },
      {
        id: "2",
        title: "代码审查专家",
        description: "完成50次代码审查",
        points: 500,
        badge: "👁️",
        rarity: "rare",
      },
      {
        id: "3",
        title: "文档贡献者",
        description: "改进或新增重要文档",
        points: 300,
        badge: "📚",
        rarity: "common",
      },
      {
        id: "4",
        title: "社区导师",
        description: "帮助10位新成员融入社区",
        points: 1000,
        badge: "🎓",
        rarity: "epic",
      },
      {
        id: "5",
        title: "创新先锋",
        description: "提出并实现突破性功能",
        points: 2000,
        badge: "🚀",
        rarity: "legendary",
      },
    ])
  }, [])

  // 创建新活动
  const createEvent = () => {
    if (!newEventTitle.trim() || !newEventDescription.trim()) {
      toast({
        title: "请填写完整信息",
        description: "活动标题和描述不能为空",
        variant: "destructive",
      })
      return
    }

    const newEvent: CommunityEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDescription,
      type: "meetup",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      participants: 0,
      maxParticipants: 50,
      status: "upcoming",
    }

    setEvents((prev) => [newEvent, ...prev])
    setNewEventTitle("")
    setNewEventDescription("")

    toast({
      title: "活动创建成功",
      description: "新的社区活动已发布",
    })
  }

  // 参加活动
  const joinEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId && event.participants < event.maxParticipants
          ? { ...event, participants: event.participants + 1 }
          : event,
      ),
    )

    toast({
      title: "报名成功",
      description: "您已成功报名参加活动",
    })
  }

  // 获取角色颜色
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500"
      case "maintainer":
        return "bg-purple-500"
      case "contributor":
        return "bg-blue-500"
      case "developer":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取稀有度颜色
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-500 bg-yellow-50"
      case "epic":
        return "border-purple-500 bg-purple-50"
      case "rare":
        return "border-blue-500 bg-blue-50"
      case "common":
        return "border-gray-300 bg-gray-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  // 获取活动类型图标
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "workshop":
        return <BookOpen className="h-4 w-4" />
      case "hackathon":
        return <Code className="h-4 w-4" />
      case "meetup":
        return <Users className="h-4 w-4" />
      case "webinar":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 社区概览 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                开发者社区生态建设
              </CardTitle>
              <CardDescription>构建活跃的开发者社区，促进知识分享与协作创新</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {members.length} 成员
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {events.filter((e) => e.status === "upcoming").length} 活动
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 社区统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{members.length}</div>
                <div className="text-sm text-muted-foreground">活跃成员</div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {members.reduce((acc, member) => acc + member.contributions, 0)}
                </div>
                <div className="text-sm text-muted-foreground">总贡献数</div>
              </div>
              <Star className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{events.length}</div>
                <div className="text-sm text-muted-foreground">社区活动</div>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{rewards.length}</div>
                <div className="text-sm text-muted-foreground">成就奖励</div>
              </div>
              <Trophy className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细内容 */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="overview">社区概览</TabsTrigger>
              <TabsTrigger value="members">成员管理</TabsTrigger>
              <TabsTrigger value="events">活动中心</TabsTrigger>
              <TabsTrigger value="rewards">奖励体系</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 最新动态 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        最新动态
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=张" />
                          <AvatarFallback>张</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="font-medium">张开发</span> 提交了新的PR
                          </div>
                          <div className="text-xs text-muted-foreground">2小时前</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=李" />
                          <AvatarFallback>李</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="font-medium">李前端</span> 发布了新的教程
                          </div>
                          <div className="text-xs text-muted-foreground">5小时前</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=王" />
                          <AvatarFallback>王</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="font-medium">王全栈</span> 参加了技术分享会
                          </div>
                          <div className="text-xs text-muted-foreground">1天前</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 热门话题 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        热门话题
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">React 18 最佳实践</div>
                          <div className="text-sm text-muted-foreground">23个讨论</div>
                        </div>
                        <Badge variant="secondary">热门</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">TypeScript 5.0 新特性</div>
                          <div className="text-sm text-muted-foreground">18个讨论</div>
                        </div>
                        <Badge variant="outline">讨论中</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">微前端架构设计</div>
                          <div className="text-sm text-muted-foreground">15个讨论</div>
                        </div>
                        <Badge variant="outline">技术</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="members" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="font-medium">{member.name}</div>
                              <div className={`w-2 h-2 rounded-full ${getRoleColor(member.role)}`}></div>
                            </div>
                            <div className="text-sm text-muted-foreground capitalize">{member.role}</div>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {member.contributions}
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-3 w-3" />
                                {member.reputation}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.specialties.slice(0, 2).map((specialty) => (
                                <Badge key={specialty} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                              {member.specialties.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{member.specialties.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-0 space-y-4">
                {/* 创建活动 */}
                <Card>
                  <CardHeader>
                    <CardTitle>创建新活动</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="活动标题"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="活动描述"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                    />
                    <Button onClick={createEvent}>创建活动</Button>
                  </CardContent>
                </Card>

                {/* 活动列表 */}
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getEventTypeIcon(event.type)}
                              <div className="font-medium">{event.title}</div>
                              <Badge
                                variant={
                                  event.status === "upcoming"
                                    ? "default"
                                    : event.status === "ongoing"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {event.status === "upcoming"
                                  ? "即将开始"
                                  : event.status === "ongoing"
                                    ? "进行中"
                                    : "已结束"}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">{event.description}</div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {event.participants}/{event.maxParticipants}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {event.status === "upcoming" && event.participants < event.maxParticipants && (
                              <Button size="sm" onClick={() => joinEvent(event.id)}>
                                报名参加
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Share2 className="h-3 w-3 mr-1" />
                              分享
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className={`border-2 ${getRarityColor(reward.rarity)}`}>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{reward.badge}</div>
                          <div className="font-medium mb-1">{reward.title}</div>
                          <div className="text-sm text-muted-foreground mb-3">{reward.description}</div>
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Gift className="h-3 w-3" />
                              {reward.points} 积分
                            </Badge>
                            <Badge
                              variant={
                                reward.rarity === "legendary"
                                  ? "default"
                                  : reward.rarity === "epic"
                                    ? "secondary"
                                    : reward.rarity === "rare"
                                      ? "outline"
                                      : "outline"
                              }
                            >
                              {reward.rarity === "legendary"
                                ? "传说"
                                : reward.rarity === "epic"
                                  ? "史诗"
                                  : reward.rarity === "rare"
                                    ? "稀有"
                                    : "普通"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* 积分商店 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      积分商店
                    </CardTitle>
                    <CardDescription>使用积分兑换专属奖励和特权</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">🎁</div>
                        <div className="font-medium">专属贴纸包</div>
                        <div className="text-sm text-muted-foreground mb-2">限量版社区贴纸</div>
                        <Badge variant="outline">500 积分</Badge>
                      </div>

                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">👕</div>
                        <div className="font-medium">社区T恤</div>
                        <div className="text-sm text-muted-foreground mb-2">高品质纯棉T恤</div>
                        <Badge variant="outline">2000 积分</Badge>
                      </div>

                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">🎫</div>
                        <div className="font-medium">技术大会门票</div>
                        <div className="text-sm text-muted-foreground mb-2">年度技术大会入场券</div>
                        <Badge variant="outline">5000 积分</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
