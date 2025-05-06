"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SearchIcon, X, Clock, TrendingUpIcon as Trending, Tag, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/contexts/search-context"
import { useOnClickOutside } from "@/hooks/use-click-outside"

interface EnhancedSearchProps {
  placeholder?: string
  className?: string
  fullWidth?: boolean
  autoFocus?: boolean
}

export function EnhancedSearch({
  placeholder = "搜索...",
  className = "",
  fullWidth = false,
  autoFocus = false,
}: EnhancedSearchProps) {
  const { searchQuery, setSearchQuery, suggestions, isLoading, saveSearch, removeHistoryItem } = useSearch()

  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // 处理点击外部关闭建议
  useOnClickOutside(searchRef, () => setIsFocused(false))

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      saveSearch(searchQuery)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsFocused(false)
    }
  }

  // 处理建议点击
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    saveSearch(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setIsFocused(false)
  }

  // 处理历史记录项删除
  const handleRemoveHistory = (e: React.MouseEvent, query: string) => {
    e.stopPropagation()
    removeHistoryItem(query)
  }

  // 获取建议项图标
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "history":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "popular":
        return <Trending className="h-4 w-4 text-blue-accent-500" />
      case "category":
        return <Tag className="h-4 w-4 text-teal-accent-500" />
      default:
        return <SearchIcon className="h-4 w-4 text-muted-foreground" />
    }
  }

  // 按钮点击动画
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    button.classList.add("button-press")
    setTimeout(() => {
      button.classList.remove("button-press")
    }, 200)
  }

  return (
    <div ref={searchRef} className={`relative ${fullWidth ? "w-full" : "max-w-md"} ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            className="pl-10 pr-10 input-3d input-focus-animation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0 nav-button-3d"
              onClick={(e) => {
                handleButtonClick(e)
                setSearchQuery("")
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">清除</span>
            </Button>
          )}
        </div>
      </form>

      {/* 搜索建议下拉框 */}
      {isFocused && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg dropdown-3d">
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={`${suggestion.type}-${index}`}>
                    <button
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted menu-item-hover"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <div className="flex items-center gap-2">
                        {getSuggestionIcon(suggestion.type)}
                        <span>{suggestion.text}</span>
                      </div>
                      {suggestion.type === "history" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted-foreground/20 nav-button-3d"
                          onClick={(e) => {
                            handleButtonClick(e)
                            handleRemoveHistory(e, suggestion.text)
                          }}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">删除</span>
                        </Button>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : searchQuery ? (
              <div className="py-3 text-center text-sm text-muted-foreground">没有找到匹配的结果</div>
            ) : (
              <div className="py-3 text-center text-sm text-muted-foreground">开始输入以搜索</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
