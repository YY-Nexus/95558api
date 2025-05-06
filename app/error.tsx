"use client"

import { useEffect } from "react"
import { ErrorPage } from "@/components/error-boundary"

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

  return <ErrorPage error={error} />
}
