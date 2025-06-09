"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mainCategories, type NavItem } from "@/data/navigation-data"
import { EnhancedSearch } from "@/components/enhanced-search"
import { useSearch } from "@/contexts/search-context"

// 搜索结果类型
interface SearchResult {
  title: string
  description: string
  href: string
  category: string
  type: "api" | "snippet" | "tool" | "other"
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q") || ""

  const { searchQuery, setSearchQuery, saveSearch } = useSearch()
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)

  // 当URL参数变化时更新搜索查询
  useEffect(() => {
    if (queryParam && queryParam !== searchQuery) {
      setSearchQuery(queryParam)
      saveSearch(queryParam)
    }
  }, [queryParam, searchQuery, setSearchQuery, saveSearch])

  // 模拟搜索功能
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase()

      // 递归搜索导航项
      const searchNavItems = (items: NavItem[], category = ""): SearchResult[] => {
        let results: SearchResult[] = []

        items.forEach((item) => {
          // 确定项目类型
          let type: "api" | "snippet" | "tool" | "other" = "other"
          if (item.href?.includes("/api")) type = "api"
          else if (item.href?.includes("/snippets")) type = "snippet"
          else if (item.href?.includes("/tools")) type = "tool"

          // 检查当前项是否匹配
          if (item.title.toLowerCase().includes(query)) {
            if (item.href) {
              results.push({
                title: item.title,
                description: `${category ? `${category} ${">"}` : ""} ${item.title}`,
                href: item.href,
                category: category || "其他",
                type,
              })
            }
          }

          // 如果有子项，递归搜索
          if (item.children && item.children.length > 0) {
            const childCategory = category ? `${category} ${">"}` : item.title
            results = [...results, ...searchNavItems(item.children, childCategory)]
          }
        })

        return results
      }

      // 执行搜索
      const searchResults = searchNavItems(mainCategories)
      setResults(searchResults)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // 根据活跃标签过滤结果
  const filteredResults = activeTab === "all" ? results : results.filter((result) => result.type === activeTab)

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">搜索</h1>
        <p className="text-muted-foreground mt-2">搜索API、代码片段、开发文档和工具</p>
      </div>

      {/* 搜索框 */}
      <div className="w-full max-w-2xl mx-auto">
        <EnhancedSearch placeholder="搜索..." fullWidth autoFocus className="search-container" />
      </div>

      {/* 搜索结果 */}
      {searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {isLoading ? "搜索中..." : `搜索结果: ${filteredResults.length} 个匹配项`}
            </h2>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="snippet">代码片段</TabsTrigger>
                <TabsTrigger value="tool">工具</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SearchResultSkeleton key={i} />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result, index) => (
                <SearchResultCard key={index} result={result} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-medium mb-2">没有找到匹配的结果</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">尝试使用不同的关键词或浏览下面的热门搜索</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {["React", "API", "JavaScript", "CSS", "HTML", "终端命令"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term)
                      saveSearch(term)
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 无搜索词时显示热门搜索 */}
      {!searchQuery && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">热门搜索</h2>
            <div className="flex flex-wrap gap-2">
              {["React Hooks", "JWT认证", "Flexbox布局", "Git命令", "API集成", "Next.js", "Tailwind CSS"].map(
                (term) => (
                  <Button
                    key={term}
                    variant="outline"
                    onClick={() => {
                      setSearchQuery(term)
                      saveSearch(term)
                    }}
                  >
                    {term}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">最近访问</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">JWT认证</CardTitle>
                  <CardDescription>API集成 {">"} 认证与授权</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/api/auth/jwt" className="text-primary hover:underline">
                    查看详情
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">终端变量</CardTitle>
                  <CardDescription>开发工具 {">"} 终端命令</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/tools/terminal/variables" className="text-primary hover:underline">
                    查看详情
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">React Hooks</CardTitle>
                  <CardDescription>代码片段 {">"} React</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/snippets/react/hooks" className="text-primary hover:underline">
                    查看详情
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 搜索结果卡片组件
function SearchResultCard({ result }: { result: SearchResult }) {
  // 根据类型设置图标颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case "api":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "snippet":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "tool":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // 根据类型获取标签文本
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "api":
        return "API"
      case "snippet":
        return "代码片段"
      case "tool":
        return "工具"
      default:
        return "其他"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{result.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
            {getTypeLabel(result.type)}
          </span>
        </div>
        <CardDescription>{result.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={result.href} className="text-primary hover:underline">
          查看详情
        </Link>
      </CardContent>
    </Card>
  )
}

// 搜索结果骨架屏组件
function SearchResultSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="h-6 w-2/3 bg-muted animate-pulse rounded"></div>
          <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
        </div>
        <div className="h-4 w-full bg-muted animate-pulse rounded mt-2"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
      </CardContent>
    </Card>
  )
}
