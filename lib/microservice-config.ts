// 微服务架构配置
export interface ServiceConfig {
  name: string
  version: string
  port: number
  host: string
  protocol: "http" | "https" | "grpc"
  healthCheck: {
    path: string
    interval: number
    timeout: number
    retries: number
  }
  dependencies: string[]
  resources: {
    cpu: string
    memory: string
    storage?: string
  }
  scaling: {
    min: number
    max: number
    targetCPU: number
    targetMemory: number
  }
  environment: Record<string, string>
}

export interface ServiceRegistry {
  services: Map<string, ServiceConfig>
  instances: Map<string, ServiceInstance[]>
}

export interface ServiceInstance {
  id: string
  service: string
  host: string
  port: number
  status: "healthy" | "unhealthy" | "starting" | "stopping"
  lastHealthCheck: Date
  metadata: Record<string, any>
}

// 微服务配置
const MICROSERVICES: ServiceConfig[] = [
  {
    name: "auth-service",
    version: "1.0.0",
    port: 3001,
    host: "localhost",
    protocol: "http",
    healthCheck: {
      path: "/health",
      interval: 30000,
      timeout: 5000,
      retries: 3,
    },
    dependencies: ["database-service", "cache-service"],
    resources: {
      cpu: "500m",
      memory: "512Mi",
    },
    scaling: {
      min: 2,
      max: 10,
      targetCPU: 70,
      targetMemory: 80,
    },
    environment: {
      NODE_ENV: "production",
      JWT_SECRET: process.env.JWT_SECRET || "",
      DB_HOST: "database-service",
      REDIS_HOST: "cache-service",
    },
  },
  {
    name: "api-service",
    version: "1.0.0",
    port: 3002,
    host: "localhost",
    protocol: "http",
    healthCheck: {
      path: "/health",
      interval: 30000,
      timeout: 5000,
      retries: 3,
    },
    dependencies: ["database-service", "auth-service"],
    resources: {
      cpu: "1000m",
      memory: "1Gi",
    },
    scaling: {
      min: 3,
      max: 15,
      targetCPU: 60,
      targetMemory: 70,
    },
    environment: {
      NODE_ENV: "production",
      AUTH_SERVICE_URL: "http://auth-service:3001",
      DB_HOST: "database-service",
    },
  },
  {
    name: "content-service",
    version: "1.0.0",
    port: 3003,
    host: "localhost",
    protocol: "http",
    healthCheck: {
      path: "/health",
      interval: 30000,
      timeout: 5000,
      retries: 3,
    },
    dependencies: ["database-service", "storage-service"],
    resources: {
      cpu: "750m",
      memory: "768Mi",
    },
    scaling: {
      min: 2,
      max: 8,
      targetCPU: 65,
      targetMemory: 75,
    },
    environment: {
      NODE_ENV: "production",
      DB_HOST: "database-service",
      STORAGE_SERVICE_URL: "http://storage-service:3004",
    },
  },
  {
    name: "analytics-service",
    version: "1.0.0",
    port: 3004,
    host: "localhost",
    protocol: "http",
    healthCheck: {
      path: "/health",
      interval: 30000,
      timeout: 5000,
      retries: 3,
    },
    dependencies: ["database-service", "cache-service"],
    resources: {
      cpu: "1500m",
      memory: "2Gi",
    },
    scaling: {
      min: 2,
      max: 6,
      targetCPU: 75,
      targetMemory: 85,
    },
    environment: {
      NODE_ENV: "production",
      DB_HOST: "database-service",
      REDIS_HOST: "cache-service",
    },
  },
  {
    name: "notification-service",
    version: "1.0.0",
    port: 3005,
    host: "localhost",
    protocol: "http",
    healthCheck: {
      path: "/health",
      interval: 30000,
      timeout: 5000,
      retries: 3,
    },
    dependencies: ["cache-service"],
    resources: {
      cpu: "250m",
      memory: "256Mi",
    },
    scaling: {
      min: 1,
      max: 5,
      targetCPU: 60,
      targetMemory: 70,
    },
    environment: {
      NODE_ENV: "production",
      REDIS_HOST: "cache-service",
      EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL || "",
      SMS_SERVICE_URL: process.env.SMS_SERVICE_URL || "",
    },
  },
]

class ServiceDiscovery {
  private registry: ServiceRegistry = {
    services: new Map(),
    instances: new Map(),
  }

  constructor() {
    this.initializeServices()
    this.startHealthChecks()
  }

  private initializeServices() {
    MICROSERVICES.forEach((service) => {
      this.registry.services.set(service.name, service)
      this.registry.instances.set(service.name, [])
    })
  }

  private startHealthChecks() {
    setInterval(() => {
      this.performHealthChecks()
    }, 30000) // 每30秒检查一次
  }

  private async performHealthChecks() {
    for (const [serviceName, instances] of this.registry.instances.entries()) {
      const service = this.registry.services.get(serviceName)
      if (!service) continue

      for (const instance of instances) {
        try {
          const healthUrl = `${service.protocol}://${instance.host}:${instance.port}${service.healthCheck.path}`

          // 模拟健康检查
          const isHealthy = Math.random() > 0.1 // 90%的概率健康

          instance.status = isHealthy ? "healthy" : "unhealthy"
          instance.lastHealthCheck = new Date()

          console.log(`健康检查 ${serviceName}:${instance.id} - ${instance.status}`)
        } catch (error) {
          instance.status = "unhealthy"
          instance.lastHealthCheck = new Date()
          console.error(`健康检查失败 ${serviceName}:${instance.id}:`, error)
        }
      }
    }
  }

  // 注册服务实例
  registerInstance(serviceName: string, instance: Omit<ServiceInstance, "id" | "lastHealthCheck">): string {
    const instanceId = `${serviceName}-${Date.now()}-${Math.random().toString(36).substring(2)}`

    const fullInstance: ServiceInstance = {
      ...instance,
      id: instanceId,
      lastHealthCheck: new Date(),
    }

    const instances = this.registry.instances.get(serviceName) || []
    instances.push(fullInstance)
    this.registry.instances.set(serviceName, instances)

    console.log(`注册服务实例: ${serviceName}:${instanceId}`)
    return instanceId
  }

  // 注销服务实例
  unregisterInstance(serviceName: string, instanceId: string): boolean {
    const instances = this.registry.instances.get(serviceName) || []
    const index = instances.findIndex((i) => i.id === instanceId)

    if (index === -1) return false

    instances.splice(index, 1)
    this.registry.instances.set(serviceName, instances)

    console.log(`注销服务实例: ${serviceName}:${instanceId}`)
    return true
  }

  // 发现服务实例
  discoverService(serviceName: string): ServiceInstance[] {
    const instances = this.registry.instances.get(serviceName) || []
    return instances.filter((i) => i.status === "healthy")
  }

  // 负载均衡选择实例
  selectInstance(
    serviceName: string,
    strategy: "round-robin" | "random" | "least-connections" = "round-robin",
  ): ServiceInstance | null {
    const healthyInstances = this.discoverService(serviceName)
    if (healthyInstances.length === 0) return null

    switch (strategy) {
      case "random":
        return healthyInstances[Math.floor(Math.random() * healthyInstances.length)]

      case "least-connections":
        // 简化实现，选择第一个
        return healthyInstances[0]

      case "round-robin":
      default:
        // 简化的轮询实现
        const index = Date.now() % healthyInstances.length
        return healthyInstances[index]
    }
  }

  // 获取服务配置
  getServiceConfig(serviceName: string): ServiceConfig | null {
    return this.registry.services.get(serviceName) || null
  }

  // 获取所有服务
  getAllServices(): ServiceConfig[] {
    return Array.from(this.registry.services.values())
  }

  // 获取服务状态
  getServiceStatus(serviceName: string): {
    config: ServiceConfig | null
    instances: ServiceInstance[]
    healthyCount: number
    totalCount: number
  } {
    const config = this.registry.services.get(serviceName) || null
    const instances = this.registry.instances.get(serviceName) || []
    const healthyCount = instances.filter((i) => i.status === "healthy").length

    return {
      config,
      instances,
      healthyCount,
      totalCount: instances.length,
    }
  }

  // 检查服务依赖
  checkDependencies(serviceName: string): {
    service: string
    dependencies: Array<{
      name: string
      status: "available" | "unavailable"
      healthyInstances: number
    }>
  } {
    const service = this.registry.services.get(serviceName)
    if (!service) {
      return { service: serviceName, dependencies: [] }
    }

    const dependencies = service.dependencies.map((depName) => {
      const depInstances = this.discoverService(depName)
      return {
        name: depName,
        status: depInstances.length > 0 ? "available" : ("unavailable" as const),
        healthyInstances: depInstances.length,
      }
    })

    return { service: serviceName, dependencies }
  }
}

export const serviceDiscovery = new ServiceDiscovery()

// 自动注册本地服务实例
MICROSERVICES.forEach((service) => {
  serviceDiscovery.registerInstance(service.name, {
    service: service.name,
    host: service.host,
    port: service.port,
    status: "healthy",
    metadata: {
      version: service.version,
      protocol: service.protocol,
    },
  })
})
