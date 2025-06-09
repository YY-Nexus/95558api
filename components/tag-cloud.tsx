"use client"

import { useState } from "react"
import { Tag } from "./tag"

// 默认标签数据
const defaultTags = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "CSS",
  "HTML",
  "Node.js",
  "API",
  "Database",
  "Authentication",
  "Payment",
  "Storage",
  "Git",
  "VS Code",
  "Terminal",
  "Docker",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "JWT",
  "OAuth",
]

interface TagCloudProps {
  tags?: string[]
  className?: string
}

export function TagCloud({ tags = defaultTags, className }: TagCloudProps) {
  const [activeTags, setActiveTags] = useState<string[]>([])

  // 确保tags是数组
  const safeTags = Array.isArray(tags) ? tags : defaultTags

  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag))
    } else {
      setActiveTags([...activeTags, tag])
    }
  }

  if (!safeTags || safeTags.length === 0) {
    return (
      <div className={className}>
        <p className="text-center text-muted-foreground">暂无标签数据</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap justify-center gap-3">
        {safeTags.map((tag, index) => (
          <Tag
            key={`${tag}-${index}`}
            active={activeTags.includes(tag)}
            onClick={() => toggleTag(tag)}
            className="cursor-pointer transition-all duration-200 hover:scale-105"
          >
            {tag}
          </Tag>
        ))}
      </div>
      {activeTags.length > 0 && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-vibrant-cyan-200">
            <span className="text-sm text-muted-foreground">已选择 {activeTags.length} 个标签</span>
            <button
              onClick={() => setActiveTags([])}
              className="text-sm text-vibrant-red-600 hover:text-vibrant-red-700 hover:underline transition-colors"
            >
              清除
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
