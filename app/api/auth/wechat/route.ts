import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const WECHAT_APP_ID = process.env.WECHAT_APP_ID
  const REDIRECT_URI = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/wechat/callback`)
  const SCOPE = "snsapi_login"

  if (!WECHAT_APP_ID) {
    return NextResponse.json({ error: "WeChat OAuth not configured" }, { status: 500 })
  }

  // 生成随机state参数
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  const authUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${state}#wechat_redirect`

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
