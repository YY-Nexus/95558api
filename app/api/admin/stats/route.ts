import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createSuccessResponse } from "@/lib/api-response"
import { createApiHandler } from "@/lib/middleware"

// GET /api/admin/stats - 获取系统统计数据
async function handleGet(request: NextRequest, user: any) {
  const stats = await db.getStats()

  // 获取最近7天的API调用统计
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { logs } = await db.getApiLogs({
    startDate: sevenDaysAgo,
    limit: 1000,
  })

  // 按天统计API调用
  const dailyStats = logs.reduce(
    (acc, log) => {
      const date = log.timestamp.toISOString().split("T")[0]
      if (!acc[date]) {
        acc[date] = { total: 0, errors: 0 }
      }
      acc[date].total++
      if (log.statusCode >= 400) {
        acc[date].errors++
      }
      return acc
    },
    {} as Record<string, { total: number; errors: number }>,
  )

  // 热门端点统计
  const endpointStats = logs.reduce(
    (acc, log) => {
      const endpoint = log.url.split("?")[0] // 移除查询参数
      if (!acc[endpoint]) {
        acc[endpoint] = { count: 0, avgResponseTime: 0, totalResponseTime: 0 }
      }
      acc[endpoint].count++
      acc[endpoint].totalResponseTime += log.responseTime
      acc[endpoint].avgResponseTime = acc[endpoint].totalResponseTime / acc[endpoint].count
      return acc
    },
    {} as Record<string, { count: number; avgResponseTime: number; totalResponseTime: number }>,
  )

  const topEndpoints = Object.entries(endpointStats)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 10)
    .map(([endpoint, stats]) => ({
      endpoint,
      count: stats.count,
      avgResponseTime: Math.round(stats.avgResponseTime),
    }))

  return Response.json(
    createSuccessResponse(
      {
        ...stats,
        dailyStats,
        topEndpoints,
        totalApiCalls: logs.length,
        errorRate:
          logs.length > 0 ? ((logs.filter((l) => l.statusCode >= 400).length / logs.length) * 100).toFixed(2) : 0,
      },
      "获取统计数据成功",
    ),
  )
}

export const GET = createApiHandler(handleGet, { requireAdmin: true })
