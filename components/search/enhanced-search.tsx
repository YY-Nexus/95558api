"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Clock, TrendingUp, Tag, Loader2, BookOpen, Code, PenToolIcon as Tool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnClickOutside } from "@/hooks/use-click-outside"

interface SearchResult {
  id: string
  title: string
  excerpt: string
  type: "article" | "snippet" | "api" | "tool"
  tags: string[]
  url: string
}

interface SearchSuggestion {
  text: string
  type: "history" | "popular" | "category" | "tag"
}

export function EnhancedSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 模拟的热门搜索
  const popularSearches = ["React Hooks", "Next.js", "API认证", "微信登录", "Tailwind CSS"]

  // 模拟的分类
  const categories = [
    { id: "article", name: "文章", icon: BookOpen },
    { id: "snippet", name: "代码片段", icon: Code },
    { id: "api", name: "API", icon: Tool },
    { id: "tool", name: "工具", icon: Tool },
  ]

  // 模拟的标签
  const availableTags = [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "API",
    "认证",
    "支付",
    "存储",
    "通知",
    "地图",
    "Hook",
    "组件",
  ]

  // 模拟的搜索结果
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "React Hooks 最佳实践",
      excerpt: "深入了解React Hooks的使用方法和最佳实践...",
      type: "article",
      tags: ["React", "Hooks", "JavaScript"],
      url: "/articles/react-hooks-best-practices",
    },
    {
      id: "2",
      title: "Next.js 13 App Router 指南",
      excerpt: "Next.js 13 App Router的完整使用指南...",
      type: "article",
      tags: ["Next.js", "React", "SSR"],
      url: "/articles/nextjs-13-app-router-guide",
    },
    {
      id: "3",
      title: "useLocalStorage Hook",
      excerpt: "一个用于管理localStorage的自定义Hook...",
      type: "snippet",
      tags: ["React", "Hooks", "localStorage"],
      url: "/snippets/react/use-local-storage",
    },
    {
      id: "4",
      title: "GitHub OAuth 集成",
      excerpt: "使用GitHub账号登录您的应用...",
      type: "api",
      tags: ["API", "认证", "OAuth"],
      url: "/api/auth/github",
    },
  ]

  // 处理点击外部关闭搜索结果
  useOnClickOutside(searchRef, () => setIsFocused(false))

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem("searchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // 更新建议
  useEffect(() => {
    if (!query) {
      // 显示历史记录和热门搜索
      const historySuggestions = searchHistory.slice(0, 3).map((text) => ({ text, type: "history" as const }))

      const popularSuggestions = popularSearches.slice(0, 3).map((text) => ({ text, type: "popular" as const }))

      setSuggestions([...historySuggestions, ...popularSuggestions])
      return
    }

    // 模拟搜索建议
    const lowerQuery = query.toLowerCase()

    // 匹配历史记录
    const matchedHistory = searchHistory
      .filter((item) => item.toLowerCase().includes(lowerQuery))
      .map((text) => ({ text, type: "history" as const }))

    // 匹配热门搜索
    const matchedPopular = popularSearches
      .filter((item) => item.toLowerCase().includes(lowerQuery))
      .map((text) => ({ text, type: "popular" as const }))

    // 匹配分类
    const matchedCategories = categories
      .filter((category) => category.name.toLowerCase().includes(lowerQuery))
      .map((category) => ({ text: category.name, type: "category" as const }))

    // 匹配标签
    const matchedTags = availableTags
      .filter((tag) => tag.toLowerCase().includes(lowerQuery))
      .map((text) => ({ text, type: "tag" as const }))

    setSuggestions([
      ...matchedHistory.slice(0, 2),
      ...matchedPopular.slice(0, 2),
      ...matchedCategories.slice(0, 2),
      ...matchedTags.slice(0, 3),
    ])
  }, [query, searchHistory])

  // 处理搜索
  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)

    try {
      // 保存到搜索历史
      const newHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 10)
      setSearchHistory(newHistory)
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 过滤结果
      let filteredResults = [...mockResults]

      // 按分类过滤
      if (selectedCategory) {
        filteredResults = filteredResults.filter((result) => result.type === selectedCategory)
      }

      // 按标签过滤
      if (selectedTags.length > 0) {
        filteredResults = filteredResults.filter((result) => selectedTags.some((tag) => result.tags.includes(tag)))
      }

      // 按查询词过滤
      if (query) {
        const lowerQuery = query.toLowerCase()
        filteredResults = filteredResults.filter(
          (result) =>
            result.title.toLowerCase().includes(lowerQuery) ||
            result.excerpt.toLowerCase().includes(lowerQuery) ||
            result.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
        )
      }

      setResults(filteredResults)
    } catch (error) {
      console.error("搜索失败", error)
    } finally {
      setIsSearching(false)
    }
  }

  // 处理建议点击
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === "category") {
      const category = categories.find((c) => c.name === suggestion.text)
      if (category) {
        setSelectedCategory(category.id)
      }
    } else if (suggestion.type === "tag") {
      if (!selectedTags.includes(suggestion.text)) {
        setSelectedTags([...selectedTags, suggestion.text])
      }
    } else {
      setQuery(suggestion.text)
      handleSearch()
    }
  }

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // 处理分类点击
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  // 处理搜索历史删除
  const handleRemoveHistory = (e: React.MouseEvent, text: string) => {
    e.stopPropagation()
    const newHistory = searchHistory.filter((item) => item !== text)
    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  // 获取建议图标
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "history":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "popular":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "category":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      case "tag":
        return <Tag className="h-4 w-4 text-green-500" />
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />
    }
  }

  // 获取结果类型图标
  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />
      case "snippet":
        return <Code className="h-4 w-4" />
      case "api":
        return <Tool className="h-4 w-4" />
      case "tool":
        return <Tool className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  // 获取结果类型名称
  const getResultTypeName = (type: string) => {
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

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索文章、代码片段、API..."
          className="pl-10 pr-10 h-12 rounded-full border-muted-foreground/20 focus-visible:ring-offset-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">清除</span>
          </Button>
        )}
      </div>

      {/* 搜索过滤器 */}
      {(selectedCategory || selectedTags.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
              <span>{categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setSelectedCategory(null)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">移除</span>
              </Button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1">
              <span>{tag}</span>
              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => handleTagClick(tag)}>
                <X className="h-3 w-3" />
                <span className="sr-only">移除</span>
              </Button>
            </Badge>
          ))}
          {(selectedCategory || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => {
                setSelectedCategory(null)
                setSelectedTags([])
              }}
            >
              清除全部
            </Button>
          )}
        </div>
      )}

      {/* 搜索建议和结果 */}
      {isFocused && (
        <Card className="absolute z-50 mt-2 w-full overflow-hidden shadow-lg">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">搜索中...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {/* 搜索结果 */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">搜索结果 ({results.length})</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setResults([])}>
                        清除结果
                      </Button>
                    </div>
                  </div>

                  {/* 分类过滤器 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <category.icon className="h-3 w-3 mr-1" />
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  {/* 结果列表 */}
                  <div className="space-y-4">
                    {results.map((result) => (
                      <div
                        key={result.id}
                        className="p-3 hover:bg-muted rounded-md transition-colors cursor-pointer"
                        onClick={() => router.push(result.url)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="px-1.5 py-0 h-5 text-xs">
                            <span className="flex items-center gap-1">
                              {getResultTypeIcon(result.type)}
                              <span>{getResultTypeName(result.type)}</span>
                            </span>
                          </Badge>
                          <h4 className="font-medium">{result.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{result.excerpt}</p>
                        <div className="flex flex-wrap gap-1">
                          {result.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="px-1.5 py-0 h-5 text-xs cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleTagClick(tag)
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : query ? (
              <div className="p-4">
                <h3 className="font-medium mb-2">建议</h3>
                {suggestions.length > 0 ? (
                  <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={`${suggestion.type}-${index}`}>
                        <button
                          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center gap-2">
                            {getSuggestionIcon(suggestion.type)}
                            <span>{suggestion.text}</span>
                          </div>
                          {suggestion.type === "history" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/20"
                              onClick={(e) => handleRemoveHistory(e, suggestion.text)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">删除</span>
                            </Button>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">没有找到匹配的结果</div>
                )}
              </div>
            ) : (
              <div className="p-4">
                {/* 历史记录 */}
                {searchHistory.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">搜索历史</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => {
                          setSearchHistory([])
                          localStorage.removeItem("searchHistory")
                        }}
                      >
                        清除历史
                      </Button>
                    </div>
                    <ul className="space-y-1">
                      {searchHistory.slice(0, 5).map((text, index) => (
                        <li key={`history-${index}`}>
                          <button
                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted group"
                            onClick={() => {
                              setQuery(text)
                              handleSearch()
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{text}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/20"
                              onClick={(e) => handleRemoveHistory(e, text)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">删除</span>
                            </Button>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 热门搜索 */}
                <div>
                  <h3 className="font-medium mb-2">热门搜索</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((text, index) => (
                      <Badge
                        key={`popular-${index}`}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => {
                          setQuery(text)
                          handleSearch()
                        }}
                      >
                        {text}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 分类浏览 */}
                <div className="mt-4">
                  <h3 className="font-medium mb-2">按分类浏览</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => {
                          setSelectedCategory(category.id)
                          handleSearch()
                        }}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
