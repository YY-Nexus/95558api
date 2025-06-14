"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookOpen, Code, PenToolIcon as Tool, Trash2, Clock, Search } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

interface CollectionItem {
  id: string
  type: "article" | "snippet" | "api" | "tool"
  title: string
  addedAt: string
}

export function UserCollections() {
  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  // 加载收藏
  useEffect(() => {
    const savedCollections = JSON.parse(localStorage.getItem("userCollections") || "[]")
    setCollections(savedCollections)
  }, [])

  // 过滤收藏
  const filteredCollections = collections.filter((item) => {
    // 按类型过滤
    if (activeTab !== "all" && item.type !== activeTab) {
      return false
    }

    // 按搜索词过滤
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // 移除收藏
  const handleRemoveCollection = (item: CollectionItem) => {
    const updatedCollections = collections.filter(
      (collection) => !(collection.id === item.id && collection.type === item.type),
    )
    setCollections(updatedCollections)
    localStorage.setItem("userCollections", JSON.stringify(updatedCollections))

    toast({
      title: "已移除收藏",
      description: `已从收藏夹中移除「${item.title}」`,
    })
  }

  // 清空收藏
  const handleClearCollections = () => {
    if (window.confirm("确定要清空所有收藏吗？此操作无法撤销。")) {
      setCollections([])
      localStorage.setItem("userCollections", "[]")

      toast({
        title: "已清空收藏",
        description: "所有收���项目已被移除",
      })
    }
  }

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />
      case "snippet":
        return <Code className="h-4 w-4" />
      case "api":
      case "tool":
        return <Tool className="h-4 w-4" />
      default:
        return <Bookmark className="h-4 w-4" />
    }
  }

  // 获取类型名称
  const getTypeName = (type: string) => {
    switch (type) {
      case "article":
        return "文章"
      case "snippet":
        return "代码片段"
      case "api":
        return "API"
      case "tool":
        return "工具"
      default:
        return "未知"
    }
  }

  // 获取内容链接
  const getItemUrl = (item: CollectionItem) => {
    switch (item.type) {
      case "article":
        return `/articles/${item.id}`
      case "snippet":
        return `/snippets/${item.id}`
      case "api":
        return `/api/${item.id}`
      case "tool":
        return `/tools/${item.id}`
      default:
        return "#"
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: zhCN })
    } catch (error) {
      return "未知时间"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              我的收藏
            </CardTitle>
            <CardDescription>管理您收藏的内容</CardDescription>
          </div>
          {collections.length > 0 && (
            <Button variant="outline" size="sm" className="text-destructive" onClick={handleClearCollections}>
              <Trash2 className="h-4 w-4 mr-1" />
              清空收藏
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {collections.length > 0 ? (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="搜索收藏..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="article">文章</TabsTrigger>
                <TabsTrigger value="snippet">代码片段</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="tool">工具</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredCollections.length > 0 ? (
                  <div className="space-y-2">
                    {filteredCollections.map((item) => (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted"
                      >
                        <div className="flex-1 min-w-0">
                          <Link href={getItemUrl(item)} className="hover:underline">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="px-1.5 py-0 h-5">
                                <span className="flex items-center gap-1">
                                  {getTypeIcon(item.type)}
                                  <span className="text-xs">{getTypeName(item.type)}</span>
                                </span>
                              </Badge>
                              <h4 className="font-medium truncate">{item.title}</h4>
                            </div>
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>收藏于 {formatDate(item.addedAt)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveCollection(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">移除</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">
                      {searchQuery
                        ? "没有找到匹配的收藏内容"
                        : activeTab === "all"
                          ? "您还没有收藏任何内容"
                          : `您还没有收藏任何${getTypeName(activeTab)}`}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-8">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="mt-2 text-muted-foreground">您还没有收藏任何内容</p>
            <p className="text-sm text-muted-foreground mt-1">浏览内容时点击"收藏"按钮将内容添加到这里</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full text-center text-sm text-muted-foreground">
          共 {filteredCollections.length} 项收藏
          {activeTab !== "all" && ` (${getTypeName(activeTab)})`}
          {searchQuery && ` 匹配"${searchQuery}"`}
        </div>
      </CardFooter>
    </Card>
  )
}
