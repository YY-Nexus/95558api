import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createSuccessResponse, createPagination } from "@/lib/api-response"
import { createApiHandler } from "@/lib/middleware"

// GET /api/admin/logs - 获取API日志
async function handleGet(request: NextRequest, user: any) {
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const method = searchParams.get("method") || undefined
  const statusCode = searchParams.get("statusCode") ? Number.parseInt(searchParams.get("statusCode")!) : undefined

  // 日期范围
  const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined
  const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined

  const { logs, total } = await db.getApiLogs({
    page,
    limit,
    method,
    statusCode,
    startDate,
    endDate,
  })

  const pagination = createPagination(page, limit, total)

  return Response.json(createSuccessResponse(logs, "获取日志成功", pagination))
}

export const GET = createApiHandler(handleGet, { requireAdmin: true })
