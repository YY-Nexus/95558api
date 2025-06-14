// 简化的认证系统，不使用JWT
interface AuthUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  provider: string
}

// 简单的会话存储
const sessions = new Map<string, { user: AuthUser; expires: number }>()

export function createSession(user: AuthUser): string {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7天

  sessions.set(sessionId, { user, expires })
  return sessionId
}

export function getSession(sessionId: string): AuthUser | null {
  const session = sessions.get(sessionId)
  if (!session) return null

  if (Date.now() > session.expires) {
    sessions.delete(sessionId)
    return null
  }

  return session.user
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId)
}

// 清理过期会话
setInterval(
  () => {
    const now = Date.now()
    for (const [id, session] of sessions.entries()) {
      if (now > session.expires) {
        sessions.delete(id)
      }
    }
  },
  60 * 60 * 1000,
) // 每小时清理一次
