import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// 模拟用户数据库（实际项目中应该使用真实数据库）
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "所有字段都是必填的" }, { status: 400 })
    }

    // 检查邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "邮箱格式不正确" }, { status: 400 })
    }

    // 检查密码长度
    if (password.length < 6) {
      return NextResponse.json({ error: "密码长度至少6位" }, { status: 400 })
    }

    // 检查用户是否已存在
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // 生成JWT令牌
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        provider: "local",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    // 设置cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7天
    })

    return response
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "注册失败，请重试" }, { status: 500 })
  }
}
