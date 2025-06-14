import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response"
import { createApiHandler } from "@/lib/middleware"

// POST /api/snippets/[id]/like - 点赞代码片段
async function handlePost(request: NextRequest, user: any, { params }: { params: { id: string } }) {
  const snippet = await db.getSnippetById(params.id)

  if (!snippet) {
    return Response.json(createErrorResponse("代码片段不存在"), { status: 404 })
  }

  const updatedSnippet = await db.likeSnippet(params.id)

  return Response.json(createSuccessResponse(updatedSnippet, "点赞成功"))
}

export const POST = createApiHandler(handlePost)
