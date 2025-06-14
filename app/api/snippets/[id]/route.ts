import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"
import { validateData, VALIDATION_RULES } from "@/lib/validation"
import { createApiHandler } from "@/lib/middleware"

// GET /api/snippets/[id] - 获取单个代码片段
async function handleGet(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const snippet = await db.getSnippetById(params.id)

  if (!snippet) {
    return Response.json(createErrorResponse("代码片段不存在"), { status: 404 })
  }

  return Response.json(createSuccessResponse(snippet, "获取代码片段成功"))
}

// PUT /api/snippets/[id] - 更新代码片段
async function handlePut(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const body = await request.json()

  const snippet = await db.getSnippetById(params.id)
  if (!snippet) {
    return Response.json(createErrorResponse("代码片段不存在"), { status: 404 })
  }

  // 检查权限
  if (snippet.author !== user.id && user.role !== "admin") {
    return Response.json(createErrorResponse("无权限修改此代码片段"), { status: 403 })
  }

  // 数据验证
  const errors = validateData(body, {
    title: { ...VALIDATION_RULES.title, required: false },
    description: { maxLength: 1000 },
    code: { maxLength: 10000 },
    language: { maxLength: 50 },
    category: { ...VALIDATION_RULES.category, required: false },
    tags: { ...VALIDATION_RULES.tags, required: false },
  })

  if (errors.length > 0) {
    return Response.json(createErrorResponse("数据验证失败", errors.map((e) => e.message).join(", ")), { status: 400 })
  }

  const updatedSnippet = await db.updateSnippet(params.id, body)

  return Response.json(createSuccessResponse(updatedSnippet, "代码片段更新成功"))
}

// DELETE /api/snippets/[id] - 删除代码片段
async function handleDelete(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const snippet = await db.getSnippetById(params.id)
  if (!snippet) {
    return Response.json(createErrorResponse("代码片段不存在"), { status: 404 })
  }

  // 检查权限
  if (snippet.author !== user.id && user.role !== "admin") {
    return Response.json(createErrorResponse("无权限删除此代码片段"), { status: 403 })
  }

  await db.deleteSnippet(params.id)

  return Response.json(createSuccessResponse(null, "代码片段删除成功"))
}

export const GET = createApiHandler(handleGet)
export const PUT = createApiHandler(handlePut, { requireAuth: true })
export const DELETE = createApiHandler(handleDelete, { requireAuth: true })
