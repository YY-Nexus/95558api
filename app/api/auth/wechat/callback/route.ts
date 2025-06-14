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
    // 获取access_token
    const tokenResponse = await fetch(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`,
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.errcode) {
      throw new Error(tokenData.errmsg)
    }

    // 获取用户信息
    const userResponse = await fetch(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenData.access_token}&openid=${tokenData.openid}&lang=zh_CN`,
    )

    const userData = await userResponse.json()

    if (userData.errcode) {
      throw new Error(userData.errmsg)
    }

    // 创建用户对象
    const user = {
      id: userData.openid,
      name: userData.nickname || "微信用户",
      email: "",
      role: "user",
      provider: "wechat",
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
    console.error("WeChat OAuth error:", error)
    return NextResponse.redirect(new URL("/auth?error=wechat_error", request.url))
  }
}
