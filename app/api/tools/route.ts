import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createSuccessResponse, createErrorResponse, createPagination } from "@/lib/api-response"
import { validateData } from "@/lib/validation"
import { createApiHandler } from "@/lib/middleware"

// GET /api/tools - 获取工具列表
async function handleGet(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const category = searchParams.get("category") || undefined
  const featured =
    searchParams.get("featured") === "true" ? true : searchParams.get("featured") === "false" ? false : undefined
  const search = searchParams.get("search") || undefined

  const { tools, total } = await db.getTools({
    page,
    limit,
    category,
    featured,
    search,
  })

  const pagination = createPagination(page, limit, total)

  return Response.json(createSuccessResponse(tools, "获取工具列表成功", pagination))
}

// POST /api/tools - 创建工具
async function handlePost(request: NextRequest, user: any) {
  const body = await request.json()

  // 数据验证
  const errors = validateData(body, {
    name: { required: true, maxLength: 100 },
    description: { required: true, maxLength: 1000 },
    category: { required: true, maxLength: 50 },
    url: { required: true, maxLength: 500 },
    icon: { required: true, maxLength: 50 },
    tags: {
      custom: (value: any) => {
        if (!Array.isArray(value)) return "标签必须是数组格式"
        if (value.length === 0) return "至少需要一个标签"
        if (value.length > 10) return "标签数量不能超过10个"
        return value.every((tag) => typeof tag === "string" && tag.length > 0) || "标签格式不正确"
      },
    },
  })

  if (errors.length > 0) {
    return Response.json(createErrorResponse("数据验证失败", errors.map((e) => e.message).join(", ")), { status: 400 })
  }

  const tool = await db.createTool({
    ...body,
    featured: body.featured || false,
  })

  return Response.json(createSuccessResponse(tool, "工具创建成功"), { status: 201 })
}

export const GET = createApiHandler(handleGet)
export const POST = createApiHandler(handlePost, { requireAdmin: true })
