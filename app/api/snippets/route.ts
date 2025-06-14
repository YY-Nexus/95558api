import { type NextRequest, NextResponse } from "next/server"
import { Database } from "@/lib/database"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"

export async function GET(request: NextRequest) {
  try {
    const snippets = Database.getSnippets()
    return NextResponse.json(createSuccessResponse(snippets))
  } catch (error) {
    return NextResponse.json(createErrorResponse("获取代码片段失败"), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 简化验证
    if (!data.title || !data.code) {
      return NextResponse.json(createErrorResponse("标题和代码不能为空"), { status: 400 })
    }

    const snippet = {
      id: Date.now().toString(),
      ...data,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    Database.snippets.push(snippet)
    return NextResponse.json(createSuccessResponse(snippet, "代码片段创建成功"))
  } catch (error) {
    return NextResponse.json(createErrorResponse("创建代码片段失败"), { status: 500 })
  }
}
