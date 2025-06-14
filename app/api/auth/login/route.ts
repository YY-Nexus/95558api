import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 })
    }

    // 简化的用户验证（生产环境应使用真实的密码哈希）
    if (email === "admin@example.com" && password === "admin123") {
      const user = await db.getUserById("admin")
      if (user) {
        const sessionId = createSession({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          provider: user.provider,
        })

        const response = NextResponse.json({ success: true })
        response.cookies.set("session", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60, // 7天
        })

        return response
      }
    }

    return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "登录失败，请重试" }, { status: 500 })
  }
}
