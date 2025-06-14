import { type NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  // 验证state参数
  const storedState = request.cookies.get("oauth_state")?.value
  if (state !== storedState) {
    return NextResponse.redirect(new URL("/auth?error=invalid_state", request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL("/auth?error=no_code", request.url))
  }

  try {
    // 交换访问令牌
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      throw new Error(tokenData.error_description)
    }

    // 获取用户信息
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const userData = await userResponse.json()

    // 获取用户邮箱
    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const emailData = await emailResponse.json()
    const primaryEmail = emailData.find((email: any) => email.primary)?.email

    // 创建用户对象
    const user = {
      id: userData.id.toString(),
      name: userData.name || userData.login,
      email: primaryEmail || "",
      role: "user",
      provider: "github",
    }

    // 创建会话
    const sessionId = createSession(user)

    // 设置cookie并重定向
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7天
    })

    // 清除state cookie
    response.cookies.delete("oauth_state")

    return response
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.redirect(new URL("/auth?error=oauth_error", request.url))
  }
}
