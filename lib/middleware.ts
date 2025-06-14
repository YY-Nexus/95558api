import type { NextRequest } from "next/server"
import { db } from "@/lib/database"

// 模拟JWT验证 - 生产环境应使用真实的JWT库
function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    // 这里应该使用真实的JWT验证
    // 现在只是模拟验证
    if (token === "mock-admin-token") {
      return { id: "admin", email: "admin@example.com", role: "admin" }
    }
    if (token === "mock-user-token") {
      return { id: "user1", email: "user@example.com", role: "user" }
    }
    return null
  } catch {
    return null
  }
}

export interface ApiHandlerOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  rateLimit?: {
    requests: number
    window: number // 时间窗口（毫秒）
  }
}

export function createApiHandler(
  handler: (request: NextRequest, user?: any, context?: any) => Promise<Response>,
  options: ApiHandlerOptions = {},
) {
  return async (request: NextRequest, context?: any) => {
    const startTime = Date.now()
    let user = null

    try {
      // 认证检查
      if (options.requireAuth || options.requireAdmin) {
        const authHeader = request.headers.get("authorization")
        const token = authHeader?.replace("Bearer ", "")

        if (!token) {
          return Response.json({ success: false, error: "缺少认证令牌" }, { status: 401 })
        }

        user = verifyToken(token)
        if (!user) {
          return Response.json({ success: false, error: "无效的认证令牌" }, { status: 401 })
        }

        // 管理员权限检查
        if (options.requireAdmin && user.role !== "admin") {
          return Response.json({ success: false, error: "需要管理员权限" }, { status: 403 })
        }
      }

      // 速率限制检查（简化实现）
      if (options.rateLimit) {
        // 生产环境应使用Redis或其他持久化存储
        // 这里只是演示概念
      }

      // 执行处理函数
      const response = await handler(request, user, context)

      // 记录API日志
      const responseTime = Date.now() - startTime
      const url = new URL(request.url)

      await db.logApiRequest({
        method: request.method,
        url: url.pathname + url.search,
        statusCode: response.status,
        responseTime,
        userAgent: request.headers.get("user-agent") || "",
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userId: user?.id,
      })

      return response
    } catch (error) {
      const responseTime = Date.now() - startTime
      const url = new URL(request.url)

      // 记录错误日志
      await db.logApiRequest({
        method: request.method,
        url: url.pathname + url.search,
        statusCode: 500,
        responseTime,
        userAgent: request.headers.get("user-agent") || "",
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userId: user?.id,
        error: error instanceof Error ? error.message : "未知错误",
      })

      return Response.json({ success: false, error: "服务器内部错误" }, { status: 500 })
    }
  }
}
