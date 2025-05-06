"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tag } from "./tag"

// 将标签按类别分组
const tagCategories = {
  语言: ["javascript", "html", "css", "typescript"],
  框架: ["react", "vue", "angular", "next", "svelte"],
  功能: ["api", "auth", "storage", "form", "validation"],
  布局: ["flexbox", "grid", "layout", "responsive"],
  数据: ["array", "object", "map", "filter", "reduce", "merge"],
  状态: ["state-management", "context", "hooks", "localStorage", "sessionStorage"],
  其他: ["async", "promise", "fetch", "template", "destructuring"],
}

interface OrganizedTagsProps {
  className?: string
}

export function OrganizedTags({ className }: OrganizedTagsProps) {
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag))
    } else {
      setActiveTags([...activeTags, tag])
    }
  }

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null)
    } else {
      setActiveCategory(category)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">标签筛选</h3>
        {activeTags.length > 0 && (
          <button onClick={() => setActiveTags([])} className="text-sm text-blue-accent-600 hover:underline">
            清除选择
          </button>
        )}
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(tagCategories).map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeCategory === category
                ? "bg-blue-accent-600 text-white"
                : "bg-blue-accent-50 text-blue-accent-700 hover:bg-blue-accent-100",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 标签展示区域 */}
      <div className="grid gap-4">
        {(activeCategory ? [activeCategory] : Object.keys(tagCategories)).map((category) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {tagCategories[category].map((tag) => (
                <Tag key={tag} active={activeTags.includes(tag)} onClick={() => toggleTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeTags.length > 0 && (
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">已选择 {activeTags.length} 个标签</span>
            <button className="px-3 py-1 text-sm bg-blue-accent-600 text-white rounded-md hover:bg-blue-accent-700">
              应用筛选
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
