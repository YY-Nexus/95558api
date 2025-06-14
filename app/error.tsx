"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DynamicIcon } from "@/components/dynamic-icon"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到控制台或错误跟踪服务
    console.error("全局错误:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <DynamicIcon name="close" className="h-16 w-16 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-2">出错了</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">很抱歉，应用程序遇到了一个错误。</p>
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-left overflow-auto">
          <code className="text-sm">{error.message}</code>
        </div>
        <Button onClick={reset} className="mx-auto">
          重试
        </Button>
      </div>
    </div>
  )
}
