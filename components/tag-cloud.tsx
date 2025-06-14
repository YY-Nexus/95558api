import Link from "next/link"
import { cn } from "@/lib/utils"

interface TagCloudProps {
  tags?: string[]
  className?: string
}

export function TagCloud({ tags = [], className }: TagCloudProps) {
  // 如果没有提供标签，使用默认标签
  const displayTags = tags.length > 0 ? tags : ["React", "Next.js", "TypeScript", "API", "OAuth"]

  // 为标签分配随机大小和颜色类
  const getRandomSize = () => {
    const sizes = ["text-sm", "text-base", "text-lg", "text-xl"]
    return sizes[Math.floor(Math.random() * sizes.length)]
  }

  const getRandomColor = () => {
    const colors = [
      "text-vibrant-cyan-500",
      "text-vibrant-cyan-600",
      "text-vibrant-cyan-700",
      "text-vibrant-green-500",
      "text-vibrant-green-600",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className={cn("flex flex-wrap gap-4 justify-center", className)}>
      {displayTags.map((tag, index) => (
        <Link
          href={`/search?q=${encodeURIComponent(tag)}`}
          key={index}
          className={cn("hover:underline transition-colors duration-200", getRandomSize(), getRandomColor())}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
