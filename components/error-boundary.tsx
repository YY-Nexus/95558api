"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新状态，下次渲染时显示降级UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 可以在这里记录错误信息
    console.error("组件错误:", error)
    console.error("错误详情:", errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义的降级UI，则使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认的错误UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">出现了一些问题</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {this.state.error?.message || "应用遇到了意外错误，请尝试刷新页面或联系支持团队。"}
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>刷新页面</Button>
            <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
              尝试恢复
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// 错误页面组件
export function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">出现了一些问题</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {error?.message || "应用遇到了意外错误，请尝试刷新页面或联系支持团队。"}
        </p>
        <div className="flex gap-4">
          <Button onClick={() => window.location.reload()}>刷新页面</Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  )
}
