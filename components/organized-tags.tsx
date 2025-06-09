"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tag } from "./tag"

// 默认标签分类数据
const defaultTagCategories = {
  语言: ["JavaScript", "TypeScript", "HTML", "CSS", "Python", "Java"],
  框架: ["React", "Next.js", "Vue", "Angular", "Express", "Nest.js"],
  功能: ["API", "Authentication", "Storage", "Form", "Validation", "Search"],
  布局: ["Flexbox", "Grid", "Layout", "Responsive", "Mobile", "Desktop"],
  数据: ["Array", "Object", "Map", "Filter", "Reduce", "Merge"],
  状态: ["State Management", "Context", "Hooks", "Redux", "Zustand"],
  工具: ["Git", "VS Code", "Terminal", "Docker", "AWS", "Vercel"],
  其他: ["Async", "Promise", "Fetch", "Template", "Destructuring", "ES6"],
}

interface OrganizedTagsProps {
  tagCategories?: Record<string, string[]>
  className?: string
}

export function OrganizedTags({ tagCategories = defaultTagCategories, className }: OrganizedTagsProps) {
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // 确保tagCategories是有效对象
  const safeCategories = tagCategories && typeof tagCategories === "object" ? tagCategories : defaultTagCategories

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

  const categoryKeys = Object.keys(safeCategories)

  if (categoryKeys.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-muted-foreground">暂无分类数据</p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-vibrant-purple-700">知识分类</h3>
        {activeTags.length > 0 && (
          <button
            onClick={() => setActiveTags([])}
            className="text-sm text-vibrant-red-600 hover:text-vibrant-red-700 hover:underline transition-colors"
          >
            清除选择 ({activeTags.length})
          </button>
        )}
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-3">
        {categoryKeys.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-2",
              activeCategory === category
                ? "bg-vibrant-purple-500 text-white border-vibrant-purple-500 shadow-lg"
                : "bg-white text-vibrant-purple-700 border-vibrant-purple-200 hover:bg-vibrant-purple-50 hover:border-vibrant-purple-300",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 标签展示区域 */}
      <div className="grid gap-6">
        {(activeCategory ? [activeCategory] : categoryKeys).map((category) => {
          const categoryTags = safeCategories[category]
          if (!Array.isArray(categoryTags) || categoryTags.length === 0) {
            return null
          }

          return (
            <div key={category} className="space-y-3">
              <h4 className="text-lg font-semibold text-vibrant-blue-700 border-b border-vibrant-blue-200 pb-2">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categoryTags.map((tag, index) => (
                  <Tag
                    key={`${category}-${tag}-${index}`}
                    active={activeTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    className="cursor-pointer transition-all duration-200 hover:scale-105"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {activeTags.length > 0 && (
        <div className="pt-6 border-t border-vibrant-purple-200">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-vibrant-purple-50 to-vibrant-pink-50 rounded-xl border border-vibrant-purple-200">
            <span className="text-sm font-medium text-vibrant-purple-700">已选择 {activeTags.length} 个标签</span>
            <button className="px-4 py-2 text-sm bg-vibrant-purple-600 text-white rounded-lg hover:bg-vibrant-purple-700 transition-colors">
              应用筛选
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
