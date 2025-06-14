// RBAC权限控制系统
export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  level: number
  isSystem: boolean
}

export interface User {
  id: string
  username: string
  email: string
  roles: string[]
  status: "active" | "inactive" | "suspended"
  createdAt: Date
  lastLoginAt?: Date
}

export interface RBACContext {
  user: User
  roles: Role[]
  permissions: Permission[]
  sessionId: string
}

// 权限定义
const PERMISSIONS: Permission[] = [
  // 系统管理权限
  { id: "system.read", name: "系统查看", resource: "system", action: "read", description: "查看系统信息" },
  { id: "system.write", name: "系统管理", resource: "system", action: "write", description: "修改系统配置" },
  { id: "system.admin", name: "系统管理员", resource: "system", action: "admin", description: "完全系统控制" },

  // 用户管理权限
  { id: "user.read", name: "用户查看", resource: "user", action: "read", description: "查看用户信息" },
  { id: "user.write", name: "用户管理", resource: "user", action: "write", description: "管理用户账户" },
  { id: "user.delete", name: "用户删除", resource: "user", action: "delete", description: "删除用户账户" },

  // 内容管理权限
  { id: "content.read", name: "内容查看", resource: "content", action: "read", description: "查看内容" },
  { id: "content.write", name: "内容编辑", resource: "content", action: "write", description: "编辑内容" },
  { id: "content.publish", name: "内容发布", resource: "content", action: "publish", description: "发布内容" },
  { id: "content.delete", name: "内容删除", resource: "content", action: "delete", description: "删除内容" },

  // API管理权限
  { id: "api.read", name: "API查看", resource: "api", action: "read", description: "查看API信息" },
  { id: "api.write", name: "API管理", resource: "api", action: "write", description: "管理API配置" },
  { id: "api.execute", name: "API执行", resource: "api", action: "execute", description: "执行API调用" },

  // 数据分析权限
  { id: "analytics.read", name: "分析查看", resource: "analytics", action: "read", description: "查看分析数据" },
  { id: "analytics.export", name: "数据导出", resource: "analytics", action: "export", description: "导出分析数据" },
]

// 角色定义
const ROLES: Role[] = [
  {
    id: "super_admin",
    name: "超级管理员",
    description: "拥有所有权限的系统管理员",
    permissions: PERMISSIONS.map((p) => p.id),
    level: 100,
    isSystem: true,
  },
  {
    id: "admin",
    name: "管理员",
    description: "系统管理员，拥有大部分管理权限",
    permissions: [
      "system.read",
      "system.write",
      "user.read",
      "user.write",
      "content.read",
      "content.write",
      "content.publish",
      "content.delete",
      "api.read",
      "api.write",
      "analytics.read",
      "analytics.export",
    ],
    level: 80,
    isSystem: true,
  },
  {
    id: "editor",
    name: "编辑者",
    description: "内容编辑和管理权限",
    permissions: ["content.read", "content.write", "content.publish", "api.read", "analytics.read"],
    level: 60,
    isSystem: true,
  },
  {
    id: "developer",
    name: "开发者",
    description: "API和技术相关权限",
    permissions: ["api.read", "api.write", "api.execute", "content.read", "analytics.read"],
    level: 50,
    isSystem: true,
  },
  {
    id: "user",
    name: "普通用户",
    description: "基础用户权限",
    permissions: ["content.read", "api.read"],
    level: 10,
    isSystem: true,
  },
]

class RBACManager {
  private permissions: Map<string, Permission> = new Map()
  private roles: Map<string, Role> = new Map()
  private users: Map<string, User> = new Map()
  private sessions: Map<string, RBACContext> = new Map()

  constructor() {
    this.initializePermissions()
    this.initializeRoles()
    this.initializeMockUsers()
  }

  private initializePermissions() {
    PERMISSIONS.forEach((permission) => {
      this.permissions.set(permission.id, permission)
    })
  }

  private initializeRoles() {
    ROLES.forEach((role) => {
      this.roles.set(role.id, role)
    })
  }

  private initializeMockUsers() {
    const mockUsers: User[] = [
      {
        id: "admin",
        username: "admin",
        email: "admin@yunshub.com",
        roles: ["super_admin"],
        status: "active",
        createdAt: new Date(),
        lastLoginAt: new Date(),
      },
      {
        id: "editor1",
        username: "editor",
        email: "editor@yunshub.com",
        roles: ["editor"],
        status: "active",
        createdAt: new Date(),
      },
      {
        id: "dev1",
        username: "developer",
        email: "dev@yunshub.com",
        roles: ["developer"],
        status: "active",
        createdAt: new Date(),
      },
    ]

    mockUsers.forEach((user) => {
      this.users.set(user.id, user)
    })
  }

  // 创建用户会话
  createSession(userId: string): string {
    const user = this.users.get(userId)
    if (!user || user.status !== "active") {
      throw new Error("用户不存在或已被禁用")
    }

    const userRoles = user.roles.map((roleId) => this.roles.get(roleId)).filter(Boolean) as Role[]
    const userPermissions = this.getUserPermissions(user)

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`

    const context: RBACContext = {
      user,
      roles: userRoles,
      permissions: userPermissions,
      sessionId,
    }

    this.sessions.set(sessionId, context)

    // 更新最后登录时间
    user.lastLoginAt = new Date()

    return sessionId
  }

  // 获取会话上下文
  getSession(sessionId: string): RBACContext | null {
    return this.sessions.get(sessionId) || null
  }

  // 销毁会话
  destroySession(sessionId: string): boolean {
    return this.sessions.delete(sessionId)
  }

  // 检查权限
  hasPermission(sessionId: string, permissionId: string): boolean {
    const context = this.getSession(sessionId)
    if (!context) return false

    return context.permissions.some((p) => p.id === permissionId)
  }

  // 检查资源权限
  hasResourcePermission(sessionId: string, resource: string, action: string): boolean {
    const context = this.getSession(sessionId)
    if (!context) return false

    return context.permissions.some((p) => p.resource === resource && p.action === action)
  }

  // 检查角色
  hasRole(sessionId: string, roleId: string): boolean {
    const context = this.getSession(sessionId)
    if (!context) return false

    return context.roles.some((r) => r.id === roleId)
  }

  // 检查角色级别
  hasRoleLevel(sessionId: string, minLevel: number): boolean {
    const context = this.getSession(sessionId)
    if (!context) return false

    return context.roles.some((r) => r.level >= minLevel)
  }

  // 获取用户权限
  private getUserPermissions(user: User): Permission[] {
    const permissions: Permission[] = []
    const permissionIds = new Set<string>()

    user.roles.forEach((roleId) => {
      const role = this.roles.get(roleId)
      if (role) {
        role.permissions.forEach((permissionId) => {
          if (!permissionIds.has(permissionId)) {
            const permission = this.permissions.get(permissionId)
            if (permission) {
              permissions.push(permission)
              permissionIds.add(permissionId)
            }
          }
        })
      }
    })

    return permissions
  }

  // 用户管理
  createUser(userData: Omit<User, "id" | "createdAt">): User {
    const id = `user_${Date.now()}_${Math.random().toString(36).substring(2)}`
    const user: User = {
      ...userData,
      id,
      createdAt: new Date(),
    }

    this.users.set(id, user)
    return user
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const user = this.users.get(userId)
    if (!user) return null

    const updatedUser = { ...user, ...updates }
    this.users.set(userId, updatedUser)
    return updatedUser
  }

  deleteUser(userId: string): boolean {
    return this.users.delete(userId)
  }

  // 角色管理
  createRole(roleData: Omit<Role, "id">): Role {
    const id = `role_${Date.now()}_${Math.random().toString(36).substring(2)}`
    const role: Role = { ...roleData, id }

    this.roles.set(id, role)
    return role
  }

  updateRole(roleId: string, updates: Partial<Role>): Role | null {
    const role = this.roles.get(roleId)
    if (!role || role.isSystem) return null

    const updatedRole = { ...role, ...updates }
    this.roles.set(roleId, updatedRole)
    return updatedRole
  }

  deleteRole(roleId: string): boolean {
    const role = this.roles.get(roleId)
    if (!role || role.isSystem) return false

    return this.roles.delete(roleId)
  }

  // 获取所有数据
  getAllPermissions(): Permission[] {
    return Array.from(this.permissions.values())
  }

  getAllRoles(): Role[] {
    return Array.from(this.roles.values())
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }

  // 权限检查中间件
  createPermissionMiddleware(requiredPermission: string) {
    return (sessionId: string) => {
      if (!this.hasPermission(sessionId, requiredPermission)) {
        throw new Error(`权限不足: 需要 ${requiredPermission} 权限`)
      }
    }
  }

  // 角色检查中间件
  createRoleMiddleware(requiredRole: string) {
    return (sessionId: string) => {
      if (!this.hasRole(sessionId, requiredRole)) {
        throw new Error(`权限不足: 需要 ${requiredRole} 角色`)
      }
    }
  }
}

export const rbacManager = new RBACManager()
