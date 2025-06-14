"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RbacPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">RBAC权限控制</h1>
        <p className="text-muted-foreground mt-2">基于角色的访问控制实现指南和示例代码</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>提示</AlertTitle>
        <AlertDescription>
          RBAC通常与其他认证方法(如JWT或OAuth)结合使用，以提供完整的认证和授权解决方案。
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>RBAC概述</CardTitle>
            <CardDescription>基于角色的访问控制的工作原理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>RBAC(基于角色的访问控制)是一种根据用户在组织中的角色来管理对系统资源的访问权限的方法。</p>

            <h3 className="text-lg font-medium">RBAC的核心组件</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>用户(Users)</strong> - 系统的使用者
              </li>
              <li>
                <strong>角色(Roles)</strong> - 用户的职责或职能分组
              </li>
              <li>
                <strong>权限(Permissions)</strong> - 执行特定操作的能力
              </li>
              <li>
                <strong>会话(Sessions)</strong> - 用户激活的角色集合
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-4">RBAC的优势</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>简化权限管理</li>
              <li>减少管理开销</li>
              <li>支持职责分离原则</li>
              <li>易于审计和合规</li>
              <li>可扩展性强</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现步骤</CardTitle>
            <CardDescription>在Next.js中实现RBAC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">步骤 1: 定义角色和权限</h3>
            <p>首先，定义系统中的角色和权限：</p>

            <h3 className="text-lg font-medium mt-4">步骤 2: 创建RBAC工具函数</h3>
            <p>创建用于检查用户权限的工具函数：</p>

            <h3 className="text-lg font-medium mt-4">步骤 3: 实现权限中间件</h3>
            <p>创建中间件来保护路由：</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>代码示例</CardTitle>
          <CardDescription>RBAC实现代码</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
            <pre>{`// lib/rbac.ts
// 定义权限类型
export type Permission = 
  | 'create:post'
  | 'edit:post'
  | 'delete:post'
  | 'create:user'
  | 'edit:user'
  | 'delete:user'
  | 'view:analytics';

// 定义角色类型
export type Role = 'admin' | 'editor' | 'author' | 'user';

// 角色权限映射
export const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'create:post', 'edit:post', 'delete:post',
    'create:user', 'edit:user', 'delete:user',
    'view:analytics'
  ],
  editor: ['create:post', 'edit:post', 'delete:post', 'view:analytics'],
  author: ['create:post', 'edit:post'],
  user: []
};

// 检查用户是否有特定权限
export function hasPermission(
  userRoles: Role[],
  requiredPermission: Permission
): boolean {
  return userRoles.some(role => 
    rolePermissions[role]?.includes(requiredPermission)
  );
}

// 检查用户是否有多个权限中的任意一个
export function hasAnyPermission(
  userRoles: Role[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some(permission => 
    hasPermission(userRoles, permission)
  );
}

// 检查用户是否有所有指定的权限
export function hasAllPermissions(
  userRoles: Role[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every(permission => 
    hasPermission(userRoles, permission)
  );
}

// 中间件示例
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from './jwt';
import { hasPermission, Permission } from './rbac';

// 路由权限映射
const routePermissions: Record<string, Permission> = {
  '/api/posts': 'create:post',
  '/api/posts/[id]': 'edit:post',
  '/api/users': 'create:user',
  '/api/analytics': 'view:analytics',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 获取需要的权限
  const requiredPermission = getRequiredPermission(pathname);
  
  if (!requiredPermission) {
    return NextResponse.next();
  }
  
  // 获取用户令牌
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 验证令牌并获取用户信息
  const payload = verifyJwt(token);
  
  if (!payload || !payload.roles) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 检查用户是否有所需权限
  if (!hasPermission(payload.roles, requiredPermission)) {
    return new NextResponse(null, { status: 403 });
  }
  
  return NextResponse.next();
}

// 获取路由所需的权限
function getRequiredPermission(pathname: string): Permission | null {
  // 精确匹配
  if (pathname in routePermissions) {
    return routePermissions[pathname];
  }
  
  // 动态路由匹配
  for (const route in routePermissions) {
    if (route.includes('[') && matchDynamicRoute(route, pathname)) {
      return routePermissions[route];
    }
  }
  
  return null;
}

// 匹配动态路由
function matchDynamicRoute(route: string, pathname: string): boolean {
  const routeParts = route.split('/');
  const pathParts = pathname.split('/');
  
  if (routeParts.length !== pathParts.length) {
    return false;
  }
  
  return routeParts.every((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return true; // 动态部分，任何值都匹配
    }
    return part === pathParts[i];
  });
}

// 组件中使用示例
import { useAuth } from '@/hooks/use-auth';
import { hasPermission } from '@/lib/rbac';

function AdminPanel() {
  const { user } = useAuth();
  
  if (!user || !hasPermission(user.roles, 'view:analytics')) {
    return <p>您没有权限访问此页面</p>;
  }
  
  return (
    <div>
      <h1>管理面板</h1>
      {/* 面板内容 */}
    </div>
  );
}`}</pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>RBAC最佳实践</CardTitle>
          <CardDescription>实现RBAC的建议</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>遵循最小权限原则</li>
            <li>实现角色继承以简化管理</li>
            <li>定期审查和更新角色和权限</li>
            <li>实现职责分离</li>
            <li>记录权限更改以便审计</li>
            <li>考虑实现基于属性的访问控制(ABAC)作为RBAC的补充</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/api/auth/basic">返回基本认证</Link>
        </Button>
        <Button asChild>
          <Link href="/api/auth">返回认证API</Link>
        </Button>
      </div>
    </div>
  )
}
