"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div className="bg-blue-accent-50 p-4 rounded-full mb-4">
          <FileQuestion className="h-10 w-10 text-blue-accent-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2">页面未找到</h2>
        <p className="text-muted-foreground mb-6 max-w-md">您访问的页面不存在或已被移动到其他位置。</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  )
}
