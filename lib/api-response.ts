// 统一的API响应格式
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
  pagination?: ApiResponse["pagination"],
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    pagination,
  }
}

export function createErrorResponse(error: string, message?: string): ApiResponse {
  return {
    success: false,
    error,
    message,
  }
}

export function createPagination(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  }
}
