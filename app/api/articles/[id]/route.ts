import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"
import { validateData, VALIDATION_RULES } from "@/lib/validation"
import { createApiHandler } from "@/lib/middleware"

// GET /api/articles/[id] - 获取单篇文章
async function handleGet(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const article = await db.getArticleById(params.id)

  if (!article) {
    return Response.json(createErrorResponse("文章不存在"), { status: 404 })
  }

  return Response.json(createSuccessResponse(article, "获取文章成功"))
}

// PUT /api/articles/[id] - 更新文章
async function handlePut(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const body = await request.json()

  const article = await db.getArticleById(params.id)
  if (!article) {
    return Response.json(createErrorResponse("文章不存在"), { status: 404 })
  }

  // 检查权限
  if (article.author !== user.id && user.role !== "admin") {
    return Response.json(createErrorResponse("无权限修改此文章"), { status: 403 })
  }

  // 数据验证
  const errors = validateData(body, {
    title: { ...VALIDATION_RULES.title, required: false },
    content: { ...VALIDATION_RULES.content, required: false },
    excerpt: { maxLength: 500 },
    slug: { ...VALIDATION_RULES.slug, required: false },
    category: { ...VALIDATION_RULES.category, required: false },
    tags: { ...VALIDATION_RULES.tags, required: false },
  })

  if (errors.length > 0) {
    return Response.json(createErrorResponse("数据验证失败", errors.map((e) => e.message).join(", ")), { status: 400 })
  }

  // 如果更新slug，检查是否已存在
  if (body.slug && body.slug !== article.slug) {
    const existingArticle = await db.getArticleBySlug(body.slug)
    if (existingArticle) {
      return Response.json(createErrorResponse("文章别名已存在"), { status: 400 })
    }
  }

  const updatedArticle = await db.updateArticle(params.id, body)

  return Response.json(createSuccessResponse(updatedArticle, "文章更新成功"))
}

// DELETE /api/articles/[id] - 删除文章
async function handleDelete(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const article = await db.getArticleById(params.id)
  if (!article) {
    return Response.json(createErrorResponse("文章不存在"), { status: 404 })
  }

  // 检查权限
  if (article.author !== user.id && user.role !== "admin") {
    return Response.json(createErrorResponse("无权限删除此文章"), { status: 403 })
  }

  await db.deleteArticle(params.id)

  return Response.json(createSuccessResponse(null, "文章删除成功"))
}

export const GET = createApiHandler(handleGet)
export const PUT = createApiHandler(handlePut, { requireAuth: true })
export const DELETE = createApiHandler(handleDelete, { requireAuth: true })
