import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 需要认证的路径
const protectedPaths = ["/dashboard", "/settings", "/profile"]

// 公开路径（不需要认证）
const publicPaths = ["/", "/auth", "/api/auth", "/about", "/snippets", "/tools"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是受保护的路径
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // 如果是公开路径，直接通过
  if (isPublicPath && !isProtectedPath) {
    return NextResponse.next()
  }

  // 获取会话ID
  const sessionId = request.cookies.get("session")?.value

  // 如果是受保护路径但没有会话ID，重定向到登录页
  if (isProtectedPath && !sessionId) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // 简化的会话验证 - 只检查是否存在会话ID
  if (isProtectedPath && sessionId) {
    // 这里不再验证JWT，只检查会话ID是否存在
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public|images).*)",
  ],
}
