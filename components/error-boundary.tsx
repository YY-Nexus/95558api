"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { BrandLogo } from "./brand-logo"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("组件错误:", error)
    console.error("错误详情:", errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-vibrant-red-50 to-vibrant-cyan-50">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center mb-6">
              <BrandLogo size="lg" />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-vibrant-red-200 shadow-lg">
              <div className="bg-vibrant-red-100 p-4 rounded-full mb-4 w-fit mx-auto">
                <AlertTriangle className="h-8 w-8 text-vibrant-red-600" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-vibrant-red-700">出现了一些问题</h2>

              <p className="text-vibrant-red-600 mb-6">
                {this.state.error?.message || "应用遇到了意外错误，请尝试刷新页面。"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-vibrant-red-500 hover:bg-vibrant-red-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  刷新页面
                </Button>
                <Button
                  variant="outline"
                  onClick={() => this.setState({ hasError: false })}
                  className="border-vibrant-red-300 text-vibrant-red-700 hover:bg-vibrant-red-50"
                >
                  尝试恢复
                </Button>
              </div>

              {process.env.NODE_ENV === "development" && this.state.errorInfo && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-vibrant-red-600 hover:text-vibrant-red-700">
                    查看错误详情
                  </summary>
                  <pre className="mt-2 text-xs bg-vibrant-red-50 p-3 rounded border overflow-auto max-h-40">
                    {this.state.error?.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div className="bg-vibrant-red-100 p-4 rounded-full mb-4">
          <AlertTriangle className="h-10 w-10 text-vibrant-red-600" />
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
