"use client"

import { useState } from "react"
import { Tag } from "./tag"

interface TagCloudProps {
  tags: string[]
  className?: string
}

export function TagCloud({ tags, className }: TagCloudProps) {
  const [activeTags, setActiveTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag))
    } else {
      setActiveTags([...activeTags, tag])
    }
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-medium mb-3">标签</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} active={activeTags.includes(tag)} onClick={() => toggleTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
      {activeTags.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">已选择 {activeTags.length} 个标签</span>
          <button onClick={() => setActiveTags([])} className="text-sm text-blue-accent-600 hover:underline">
            清除
          </button>
        </div>
      )}
    </div>
  )
}
