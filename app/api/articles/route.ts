import { type NextRequest, NextResponse } from "next/server"
import { Database } from "@/lib/database"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"
import { validateArticle } from "@/lib/validation"

export async function GET(request: NextRequest) {
  try {
    const articles = Database.getArticles()
    return NextResponse.json(createSuccessResponse(articles))
  } catch (error) {
    return NextResponse.json(createErrorResponse("获取文章失败"), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const validation = validateArticle(data)
    if (!validation.isValid) {
      return NextResponse.json(createErrorResponse("验证失败", validation.errors.join(", ")), { status: 400 })
    }

    const article = Database.createArticle({
      ...data,
      views: 0,
      likes: 0,
    })

    return NextResponse.json(createSuccessResponse(article, "文章创建成功"))
  } catch (error) {
    return NextResponse.json(createErrorResponse("创建文章失败"), { status: 500 })
  }
}
