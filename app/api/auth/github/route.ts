import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`
  const SCOPE = "user:email"

  if (!GITHUB_CLIENT_ID) {
    return NextResponse.json({ error: "GitHub OAuth not configured" }, { status: 500 })
  }

  // 生成随机state参数
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    state: state,
    response_type: "code",
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params}`

  // 设置state到cookie用于验证
  const response = NextResponse.redirect(authUrl)
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10分钟
  })

  return response
}
