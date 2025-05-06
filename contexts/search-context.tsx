"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 搜索历史记录项类型
interface SearchHistoryItem {
  query: string
  timestamp: number
}

// 搜索建议项类型
interface SearchSuggestion {
  text: string
  type: "history" | "popular" | "category"
}

// 搜索上下文类型
interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchHistory: SearchHistoryItem[]
  clearHistory: () => void
  removeHistoryItem: (query: string) => void
  suggestions: SearchSuggestion[]
  isLoading: boolean
  saveSearch: (query: string) => void
}

// 创建上下文
const SearchContext = createContext<SearchContextType | undefined>(undefined)

// 热门搜索词
const popularSearches = [
  "React Hooks",
  "JWT认证",
  "Flexbox布局",
  "Git命令",
  "API集成",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
]

// 分类建议
const categorySearches = ["API", "代码片段", "工具", "JavaScript", "React", "CSS", "HTML", "终端命令"]

export function SearchProvider({ children }: { children: ReactNode }) {
  // 搜索查询状态
  const [searchQuery, setSearchQuery] = useState("")

  // 搜索历史记录状态
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])

  // 搜索建议状态
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])

  // 加载状态
  const [isLoading, setIsLoading] = useState(false)

  // 初始化时从本地存储加载搜索历史
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        setSearchHistory(parsedHistory)
      } catch (error) {
        console.error("Failed to parse search history:", error)
        setSearchHistory([])
      }
    }
  }, [])

  // 当搜索历史更新时，保存到本地存储
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    }
  }, [searchHistory])

  // 当搜索查询更新时，更新建议
  useEffect(() => {
    if (!searchQuery.trim()) {
      // 如果搜索查询为空，显示历史记录和热门搜索
      const historySuggestions = searchHistory
        .slice(0, 5)
        .map((item) => ({ text: item.query, type: "history" as const }))

      const popularSuggestions = popularSearches.slice(0, 5).map((text) => ({ text, type: "popular" as const }))

      setSuggestions([...historySuggestions, ...popularSuggestions])
      return
    }

    // 模拟加载状态
    setIsLoading(true)

    // 模拟API请求延迟
    const timer = setTimeout(() => {
      // 从历史记录中过滤匹配的项
      const historyMatches = searchHistory
        .filter((item) => item.query.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
        .map((item) => ({ text: item.query, type: "history" as const }))

      // 从热门搜索中过滤匹配的项
      const popularMatches = popularSearches
        .filter((text) => text.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
        .map((text) => ({ text, type: "popular" as const }))

      // 从分类中过滤匹配的项
      const categoryMatches = categorySearches
        .filter((text) => text.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
        .map((text) => ({ text, type: "category" as const }))

      // 合并所有建议
      setSuggestions([...historyMatches, ...popularMatches, ...categoryMatches])
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, searchHistory])

  // 保存搜索到历史记录
  const saveSearch = (query: string) => {
    if (!query.trim()) return

    // 检查是否已存在相同的查询
    const existingIndex = searchHistory.findIndex((item) => item.query === query)

    // 创建新的历史记录数组
    let newHistory = [...searchHistory]

    if (existingIndex !== -1) {
      // 如果已存在，移除旧的
      newHistory.splice(existingIndex, 1)
    }

    // 添加到历史记录的开头
    newHistory.unshift({
      query,
      timestamp: Date.now(),
    })

    // 限制历史记录数量为20条
    if (newHistory.length > 20) {
      newHistory = newHistory.slice(0, 20)
    }

    setSearchHistory(newHistory)
  }

  // 清除所有历史记录
  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
  }

  // 移除单个历史记录项
  const removeHistoryItem = (query: string) => {
    const newHistory = searchHistory.filter((item) => item.query !== query)
    setSearchHistory(newHistory)

    if (newHistory.length === 0) {
      localStorage.removeItem("searchHistory")
    } else {
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))
    }
  }

  // 提供上下文值
  const value = {
    searchQuery,
    setSearchQuery,
    searchHistory,
    clearHistory,
    removeHistoryItem,
    suggestions,
    isLoading,
    saveSearch,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

// 自定义钩子，用于访问搜索上下文
export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
