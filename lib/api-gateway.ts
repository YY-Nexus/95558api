// API网关和限流系统
export interface RateLimitConfig {
  windowMs: number // 时间窗口（毫秒）
  maxRequests: number // 最大请求数
  keyGenerator?: (req: any) => string // 键生成器
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

export interface APIRoute {
  id: string
  path: string
  method: string
  target: string
  rateLimit?: RateLimitConfig
  auth?: {
    required: boolean
    permissions?: string[]
    roles?: string[]
  }
  cache?: {
    enabled: boolean
    ttl: number
    key?: string
  }
  transform?: {
    request?: (data: any) => any
    response?: (data: any) => any
  }
  monitoring: {
    enabled: boolean
    metrics: string[]
  }
}

export interface APIMetrics {
  routeId: string
  timestamp: number
  method: string
  path: string
  statusCode: number
  responseTime: number
  requestSize: number
  responseSize: number
  userAgent?: string
  ip?: string
  userId?: string
}

class RateLimiter {
  private store: Map<string, { count: number; resetTime: number }> = new Map()

  async isAllowed(
    key: string,
    config: RateLimitConfig,
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now()
    const record = this.store.get(key)

    if (!record || now > record.resetTime) {
      // 新的时间窗口
      const resetTime = now + config.windowMs
      this.store.set(key, { count: 1, resetTime })
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime,
      }
    }

    if (record.count >= config.maxRequests) {
      // 超出限制
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      }
    }

    // 增加计数
    record.count++
    this.store.set(key, record)

    return {
      allowed: true,
      remaining: config.maxRequests - record.count,
      resetTime: record.resetTime,
    }
  }

  cleanup() {
    const now = Date.now()
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key)
      }
    }
  }
}

class APIGateway {
  private routes: Map<string, APIRoute> = new Map()
  private rateLimiter = new RateLimiter()
  private cache: Map<string, { data: any; expires: number }> = new Map()
  private metrics: APIMetrics[] = []

  constructor() {
    this.initializeRoutes()
    this.startCleanupTimer()
  }

  private initializeRoutes() {
    const defaultRoutes: APIRoute[] = [
      {
        id: "auth-login",
        path: "/api/auth/login",
        method: "POST",
        target: "http://localhost:3000/api/auth/login",
        rateLimit: {
          windowMs: 15 * 60 * 1000, // 15分钟
          maxRequests: 5, // 最多5次登录尝试
        },
        auth: { required: false },
        monitoring: { enabled: true, metrics: ["responseTime", "statusCode"] },
      },
      {
        id: "api-list",
        path: "/api/tools",
        method: "GET",
        target: "http://localhost:3000/api/tools",
        rateLimit: {
          windowMs: 60 * 1000, // 1分钟
          maxRequests: 100,
        },
        auth: { required: true, permissions: ["api.read"] },
        cache: { enabled: true, ttl: 300000 }, // 5分钟缓存
        monitoring: { enabled: true, metrics: ["responseTime", "cacheHit"] },
      },
      {
        id: "content-create",
        path: "/api/articles",
        method: "POST",
        target: "http://localhost:3000/api/articles",
        rateLimit: {
          windowMs: 60 * 1000, // 1分钟
          maxRequests: 10,
        },
        auth: { required: true, permissions: ["content.write"] },
        monitoring: { enabled: true, metrics: ["responseTime", "statusCode"] },
      },
      {
        id: "analytics-data",
        path: "/api/analytics/*",
        method: "GET",
        target: "http://localhost:3000/api/analytics",
        rateLimit: {
          windowMs: 60 * 1000, // 1分钟
          maxRequests: 50,
        },
        auth: { required: true, permissions: ["analytics.read"] },
        cache: { enabled: true, ttl: 60000 }, // 1分钟缓存
        monitoring: { enabled: true, metrics: ["responseTime", "cacheHit"] },
      },
    ]

    defaultRoutes.forEach((route) => {
      this.routes.set(route.id, route)
    })
  }

  private startCleanupTimer() {
    setInterval(() => {
      this.rateLimiter.cleanup()
      this.cleanupCache()
      this.cleanupMetrics()
    }, 60000) // 每分钟清理一次
  }

  private cleanupCache() {
    const now = Date.now()
    for (const [key, record] of this.cache.entries()) {
      if (now > record.expires) {
        this.cache.delete(key)
      }
    }
  }

  private cleanupMetrics() {
    // 保留最近24小时的指标
    const cutoff = Date.now() - 24 * 60 * 60 * 1000
    this.metrics = this.metrics.filter((metric) => metric.timestamp > cutoff)
  }

  async handleRequest(request: {
    method: string
    path: string
    headers: Record<string, string>
    body?: any
    ip?: string
    sessionId?: string
  }): Promise<{
    statusCode: number
    headers: Record<string, string>
    body: any
    metrics?: APIMetrics
  }> {
    const startTime = Date.now()

    try {
      // 1. 路由匹配
      const route = this.findRoute(request.method, request.path)
      if (!route) {
        return {
          statusCode: 404,
          headers: {},
          body: { error: "Route not found" },
        }
      }

      // 2. 限流检查
      if (route.rateLimit) {
        const rateLimitKey = this.generateRateLimitKey(request, route.rateLimit)
        const rateLimitResult = await this.rateLimiter.isAllowed(rateLimitKey, route.rateLimit)

        if (!rateLimitResult.allowed) {
          return {
            statusCode: 429,
            headers: {
              "X-RateLimit-Limit": route.rateLimit.maxRequests.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
            },
            body: { error: "Rate limit exceeded" },
          }
        }
      }

      // 3. 认证检查
      if (route.auth?.required) {
        const authResult = await this.checkAuthentication(request, route.auth)
        if (!authResult.success) {
          return {
            statusCode: authResult.statusCode,
            headers: {},
            body: { error: authResult.error },
          }
        }
      }

      // 4. 缓存检查
      if (route.cache?.enabled && request.method === "GET") {
        const cacheKey = this.generateCacheKey(request, route)
        const cached = this.cache.get(cacheKey)
        if (cached && Date.now() < cached.expires) {
          return {
            statusCode: 200,
            headers: { "X-Cache": "HIT" },
            body: cached.data,
          }
        }
      }

      // 5. 请求转换
      let transformedRequest = request
      if (route.transform?.request) {
        transformedRequest = route.transform.request(request)
      }

      // 6. 转发请求
      const response = await this.forwardRequest(route, transformedRequest)

      // 7. 响应转换
      let transformedResponse = response
      if (route.transform?.response) {
        transformedResponse = {
          ...response,
          body: route.transform.response(response.body),
        }
      }

      // 8. 缓存响应
      if (route.cache?.enabled && request.method === "GET" && response.statusCode === 200) {
        const cacheKey = this.generateCacheKey(request, route)
        this.cache.set(cacheKey, {
          data: transformedResponse.body,
          expires: Date.now() + route.cache.ttl,
        })
      }

      // 9. 记录指标
      if (route.monitoring.enabled) {
        const metric: APIMetrics = {
          routeId: route.id,
          timestamp: Date.now(),
          method: request.method,
          path: request.path,
          statusCode: response.statusCode,
          responseTime: Date.now() - startTime,
          requestSize: JSON.stringify(request.body || {}).length,
          responseSize: JSON.stringify(transformedResponse.body).length,
          userAgent: request.headers["user-agent"],
          ip: request.ip,
          userId: request.sessionId,
        }
        this.metrics.push(metric)
      }

      return transformedResponse
    } catch (error) {
      console.error("API Gateway error:", error)
      return {
        statusCode: 500,
        headers: {},
        body: { error: "Internal server error" },
      }
    }
  }

  private findRoute(method: string, path: string): APIRoute | null {
    for (const route of this.routes.values()) {
      if (route.method === method) {
        // 简单的路径匹配（支持通配符）
        if (route.path === path || (route.path.endsWith("/*") && path.startsWith(route.path.slice(0, -2)))) {
          return route
        }
      }
    }
    return null
  }

  private generateRateLimitKey(request: any, config: RateLimitConfig): string {
    if (config.keyGenerator) {
      return config.keyGenerator(request)
    }
    return `${request.ip || "unknown"}:${request.path}`
  }

  private generateCacheKey(request: any, route: APIRoute): string {
    if (route.cache?.key) {
      return route.cache.key
    }
    return `${route.id}:${request.path}:${JSON.stringify(request.body || {})}`
  }

  private async checkAuthentication(
    request: any,
    auth: NonNullable<APIRoute["auth"]>,
  ): Promise<{
    success: boolean
    statusCode: number
    error?: string
  }> {
    if (!request.sessionId) {
      return { success: false, statusCode: 401, error: "Authentication required" }
    }

    // 这里应该调用RBAC系统进行权限检查
    // 简化实现
    return { success: true, statusCode: 200 }
  }

  private async forwardRequest(
    route: APIRoute,
    request: any,
  ): Promise<{
    statusCode: number
    headers: Record<string, string>
    body: any
  }> {
    // 模拟请求转发
    console.log(`转发请求到: ${route.target}`)

    // 这里应该实际发送HTTP请求到目标服务
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: { message: "请求成功", route: route.id },
    }
  }

  // 管理接口
  addRoute(route: APIRoute): void {
    this.routes.set(route.id, route)
  }

  removeRoute(routeId: string): boolean {
    return this.routes.delete(routeId)
  }

  updateRoute(routeId: string, updates: Partial<APIRoute>): boolean {
    const route = this.routes.get(routeId)
    if (!route) return false

    this.routes.set(routeId, { ...route, ...updates })
    return true
  }

  getRoutes(): APIRoute[] {
    return Array.from(this.routes.values())
  }

  getMetrics(routeId?: string): APIMetrics[] {
    if (routeId) {
      return this.metrics.filter((m) => m.routeId === routeId)
    }
    return this.metrics
  }

  getRouteStats(routeId: string): {
    totalRequests: number
    avgResponseTime: number
    errorRate: number
    requestsPerMinute: number
  } {
    const routeMetrics = this.metrics.filter((m) => m.routeId === routeId)
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    const recentMetrics = routeMetrics.filter((m) => m.timestamp > oneMinuteAgo)
    const errors = routeMetrics.filter((m) => m.statusCode >= 400)

    return {
      totalRequests: routeMetrics.length,
      avgResponseTime: routeMetrics.reduce((sum, m) => sum + m.responseTime, 0) / routeMetrics.length || 0,
      errorRate: routeMetrics.length > 0 ? (errors.length / routeMetrics.length) * 100 : 0,
      requestsPerMinute: recentMetrics.length,
    }
  }
}

export const apiGateway = new APIGateway()
