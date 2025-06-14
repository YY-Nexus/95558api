import Link from "next/link"
import { cn } from "@/lib/utils"

interface OrganizedTagsProps {
  categories?: Record<string, string[]>
  className?: string
}

export function OrganizedTags({ categories = {}, className }: OrganizedTagsProps) {
  // 默认分类和标签
  const defaultCategories = {
    frontend: ["React", "Vue", "Angular", "CSS", "HTML"],
    backend: ["Node.js", "Express", "NestJS", "Django"],
    database: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    devops: ["Docker", "Kubernetes", "CI/CD", "AWS"],
  }

  // 使用提供的分类或默认分类
  const displayCategories = Object.keys(categories).length > 0 ? categories : defaultCategories

  // 分类名称映射
  const categoryNames: Record<string, string> = {
    frontend: "前端技术",
    backend: "后端开发",
    database: "数据库",
    devops: "DevOps",
  }

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(displayCategories).map(([category, tags]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold">{categoryNames[category] || category}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link
                href={`/search?q=${encodeURIComponent(tag)}`}
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-vibrant-cyan-100 dark:hover:bg-vibrant-cyan-900 transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
