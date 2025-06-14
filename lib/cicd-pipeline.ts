// CI/CD流水线配置
export interface PipelineStage {
  name: string
  type: "build" | "test" | "security" | "deploy" | "notify"
  commands: string[]
  environment?: Record<string, string>
  timeout?: number
  retries?: number
  condition?: string
  artifacts?: string[]
}

export interface Pipeline {
  id: string
  name: string
  description: string
  trigger: {
    type: "push" | "pull_request" | "schedule" | "manual"
    branches?: string[]
    schedule?: string
  }
  stages: PipelineStage[]
  notifications: {
    success: string[]
    failure: string[]
  }
  environment: Record<string, string>
}

export interface PipelineRun {
  id: string
  pipelineId: string
  status: "pending" | "running" | "success" | "failed" | "cancelled"
  startTime: Date
  endTime?: Date
  stages: Array<{
    name: string
    status: "pending" | "running" | "success" | "failed" | "skipped"
    startTime?: Date
    endTime?: Date
    logs: string[]
    artifacts?: string[]
  }>
  trigger: {
    type: string
    user?: string
    commit?: string
    branch?: string
  }
}

// 预定义流水线配置
const PIPELINES: Pipeline[] = [
  {
    id: "main-pipeline",
    name: "主分支部署流水线",
    description: "主分支代码的完整CI/CD流水线",
    trigger: {
      type: "push",
      branches: ["main", "master"],
    },
    stages: [
      {
        name: "代码检出",
        type: "build",
        commands: ["git clone $REPO_URL .", "git checkout $BRANCH"],
        timeout: 300,
      },
      {
        name: "依赖安装",
        type: "build",
        commands: ["npm ci", "npm audit --audit-level moderate"],
        timeout: 600,
      },
      {
        name: "代码质量检查",
        type: "test",
        commands: ["npm run lint", "npm run type-check", "npm run format:check"],
        timeout: 300,
      },
      {
        name: "单元测试",
        type: "test",
        commands: ["npm run test:unit", "npm run test:coverage"],
        artifacts: ["coverage/"],
        timeout: 600,
      },
      {
        name: "集成测试",
        type: "test",
        commands: ["docker-compose up -d test-db", "npm run test:integration", "docker-compose down"],
        timeout: 900,
      },
      {
        name: "安全扫描",
        type: "security",
        commands: [
          "npm audit --audit-level high",
          "docker run --rm -v $(pwd):/app security-scanner /app",
          "npm run security:check",
        ],
        timeout: 600,
      },
      {
        name: "构建应用",
        type: "build",
        commands: [
          "npm run build",
          "docker build -t yunshub:$BUILD_NUMBER .",
          "docker tag yunshub:$BUILD_NUMBER yunshub:latest",
        ],
        artifacts: ["dist/", "Dockerfile"],
        timeout: 1200,
      },
      {
        name: "部署到测试环境",
        type: "deploy",
        commands: [
          "kubectl apply -f k8s/test/",
          "kubectl set image deployment/yunshub yunshub=yunshub:$BUILD_NUMBER -n test",
          "kubectl rollout status deployment/yunshub -n test",
        ],
        environment: {
          KUBECONFIG: "/etc/kubernetes/test-config",
        },
        timeout: 600,
      },
      {
        name: "端到端测试",
        type: "test",
        commands: ["npm run test:e2e -- --env=test", "npm run test:performance -- --env=test"],
        timeout: 1800,
      },
      {
        name: "部署到生产环境",
        type: "deploy",
        commands: [
          "kubectl apply -f k8s/prod/",
          "kubectl set image deployment/yunshub yunshub=yunshub:$BUILD_NUMBER -n prod",
          "kubectl rollout status deployment/yunshub -n prod",
        ],
        environment: {
          KUBECONFIG: "/etc/kubernetes/prod-config",
        },
        condition: "success",
        timeout: 600,
      },
      {
        name: "部署后验证",
        type: "test",
        commands: ["curl -f https://yunshub.com/health", "npm run test:smoke -- --env=prod"],
        timeout: 300,
      },
      {
        name: "通知部署结果",
        type: "notify",
        commands: [
          'curl -X POST $SLACK_WEBHOOK -d "{\\"text\\": \\"部署成功: yunshub:$BUILD_NUMBER\\"}"',
          "npm run notify:success",
        ],
        timeout: 60,
      },
    ],
    notifications: {
      success: ["slack://dev-team", "email://admin@yunshub.com"],
      failure: ["slack://dev-team", "email://admin@yunshub.com", "sms://+1234567890"],
    },
    environment: {
      NODE_ENV: "production",
      BUILD_NUMBER: "${CI_BUILD_NUMBER}",
      BRANCH: "${CI_BRANCH}",
      REPO_URL: "https://github.com/yunshub/yunshub.git",
    },
  },
  {
    id: "feature-pipeline",
    name: "功能分支测试流水线",
    description: "功能分支的快速测试流水线",
    trigger: {
      type: "pull_request",
      branches: ["main", "develop"],
    },
    stages: [
      {
        name: "代码检出",
        type: "build",
        commands: ["git clone $REPO_URL .", "git checkout $BRANCH"],
      },
      {
        name: "快速构建",
        type: "build",
        commands: ["npm ci", "npm run build"],
      },
      {
        name: "快速测试",
        type: "test",
        commands: ["npm run lint", "npm run test:unit -- --coverage=false"],
      },
      {
        name: "安全检查",
        type: "security",
        commands: ["npm audit --audit-level high"],
      },
    ],
    notifications: {
      success: ["github://pr-comment"],
      failure: ["github://pr-comment", "slack://dev-team"],
    },
    environment: {
      NODE_ENV: "test",
    },
  },
  {
    id: "hotfix-pipeline",
    name: "热修复部署流水线",
    description: "紧急热修复的快速部署流水线",
    trigger: {
      type: "push",
      branches: ["hotfix/*"],
    },
    stages: [
      {
        name: "代码检出",
        type: "build",
        commands: ["git clone $REPO_URL .", "git checkout $BRANCH"],
      },
      {
        name: "快速构建",
        type: "build",
        commands: ["npm ci", "npm run build", "docker build -t yunshub:hotfix-$BUILD_NUMBER ."],
      },
      {
        name: "关键测试",
        type: "test",
        commands: ["npm run test:critical"],
      },
      {
        name: "紧急部署",
        type: "deploy",
        commands: [
          "kubectl set image deployment/yunshub yunshub=yunshub:hotfix-$BUILD_NUMBER -n prod",
          "kubectl rollout status deployment/yunshub -n prod",
        ],
      },
      {
        name: "紧急通知",
        type: "notify",
        commands: ['curl -X POST $EMERGENCY_WEBHOOK -d "{\\"text\\": \\"紧急热修复部署: $BRANCH\\"}"'],
      },
    ],
    notifications: {
      success: ["slack://emergency", "email://admin@yunshub.com"],
      failure: ["slack://emergency", "email://admin@yunshub.com", "sms://+1234567890"],
    },
    environment: {
      NODE_ENV: "production",
    },
  },
]

class CICDManager {
  private pipelines: Map<string, Pipeline> = new Map()
  private runs: Map<string, PipelineRun> = new Map()
  private runHistory: PipelineRun[] = []

  constructor() {
    this.initializePipelines()
  }

  private initializePipelines() {
    PIPELINES.forEach((pipeline) => {
      this.pipelines.set(pipeline.id, pipeline)
    })
  }

  // 触发流水线
  async triggerPipeline(pipelineId: string, trigger: PipelineRun["trigger"]): Promise<string> {
    const pipeline = this.pipelines.get(pipelineId)
    if (!pipeline) {
      throw new Error(`流水线 ${pipelineId} 不存在`)
    }

    const runId = `run_${Date.now()}_${Math.random().toString(36).substring(2)}`

    const run: PipelineRun = {
      id: runId,
      pipelineId,
      status: "pending",
      startTime: new Date(),
      stages: pipeline.stages.map((stage) => ({
        name: stage.name,
        status: "pending",
        logs: [],
      })),
      trigger,
    }

    this.runs.set(runId, run)

    // 异步执行流水线
    this.executePipeline(runId).catch((error) => {
      console.error(`流水线执行失败 ${runId}:`, error)
    })

    return runId
  }

  private async executePipeline(runId: string): Promise<void> {
    const run = this.runs.get(runId)
    if (!run) return

    const pipeline = this.pipelines.get(run.pipelineId)
    if (!pipeline) return

    run.status = "running"

    try {
      for (let i = 0; i < pipeline.stages.length; i++) {
        const stage = pipeline.stages[i]
        const runStage = run.stages[i]

        // 检查条件
        if (stage.condition && !this.evaluateCondition(stage.condition, run)) {
          runStage.status = "skipped"
          continue
        }

        runStage.status = "running"
        runStage.startTime = new Date()

        try {
          await this.executeStage(stage, runStage, pipeline.environment)
          runStage.status = "success"
        } catch (error) {
          runStage.status = "failed"
          runStage.logs.push(`错误: ${error}`)

          // 阶段失败，整个流水线失败
          run.status = "failed"
          run.endTime = new Date()

          await this.sendNotification(pipeline, "failure", run)
          return
        } finally {
          runStage.endTime = new Date()
        }
      }

      // 所有阶段成功
      run.status = "success"
      run.endTime = new Date()

      await this.sendNotification(pipeline, "success", run)
    } catch (error) {
      run.status = "failed"
      run.endTime = new Date()
      console.error(`流水线执行异常 ${runId}:`, error)
    } finally {
      // 保存到历史记录
      this.runHistory.push({ ...run })

      // 清理运行中的记录（保留最近100个）
      if (this.runHistory.length > 100) {
        this.runHistory = this.runHistory.slice(-100)
      }
    }
  }

  private async executeStage(
    stage: PipelineStage,
    runStage: PipelineRun["stages"][0],
    globalEnv: Record<string, string>,
  ): Promise<void> {
    const env = { ...globalEnv, ...stage.environment }

    for (const command of stage.commands) {
      const processedCommand = this.processCommand(command, env)
      runStage.logs.push(`执行: ${processedCommand}`)

      // 模拟命令执行
      await this.simulateCommand(processedCommand, runStage)
    }

    // 处理构件
    if (stage.artifacts) {
      runStage.artifacts = stage.artifacts
      runStage.logs.push(`保存构件: ${stage.artifacts.join(", ")}`)
    }
  }

  private async simulateCommand(command: string, runStage: PipelineRun["stages"][0]): Promise<void> {
    // 模拟命令执行时间
    const executionTime = Math.random() * 2000 + 500 // 0.5-2.5秒

    await new Promise((resolve) => setTimeout(resolve, executionTime))

    // 模拟命令成功/失败
    const success = Math.random() > 0.05 // 95%成功率

    if (!success) {
      throw new Error(`命令执行失败: ${command}`)
    }

    runStage.logs.push(`✓ 命令执行成功 (${executionTime.toFixed(0)}ms)`)
  }

  private processCommand(command: string, env: Record<string, string>): string {
    let processed = command

    // 替换环境变量
    for (const [key, value] of Object.entries(env)) {
      processed = processed.replace(new RegExp(`\\$${key}|\\$\\{${key}\\}`, "g"), value)
    }

    return processed
  }

  private evaluateCondition(condition: string, run: PipelineRun): boolean {
    // 简化的条件评估
    switch (condition) {
      case "success":
        return run.stages.every(
          (stage) => stage.status === "success" || stage.status === "skipped" || stage.status === "pending",
        )
      case "failure":
        return run.stages.some((stage) => stage.status === "failed")
      default:
        return true
    }
  }

  private async sendNotification(pipeline: Pipeline, type: "success" | "failure", run: PipelineRun): Promise<void> {
    const notifications = pipeline.notifications[type]

    for (const notification of notifications) {
      try {
        await this.processNotification(notification, pipeline, run)
      } catch (error) {
        console.error(`通知发送失败 ${notification}:`, error)
      }
    }
  }

  private async processNotification(notification: string, pipeline: Pipeline, run: PipelineRun): Promise<void> {
    const [type, target] = notification.split("://")

    const message =
      `流水线 ${pipeline.name} ${run.status === "success" ? "成功" : "失败"}\n` +
      `运行ID: ${run.id}\n` +
      `分支: ${run.trigger.branch || "unknown"}\n` +
      `耗时: ${
        run.endTime && run.startTime ? Math.round((run.endTime.getTime() - run.startTime.getTime()) / 1000) : 0
      }秒`

    switch (type) {
      case "slack":
        console.log(`发送Slack通知到 ${target}: ${message}`)
        break
      case "email":
        console.log(`发送邮件通知到 ${target}: ${message}`)
        break
      case "sms":
        console.log(`发送短信通知到 ${target}: ${message}`)
        break
      case "github":
        console.log(`发送GitHub通知: ${message}`)
        break
      default:
        console.log(`未知通知类型: ${type}`)
    }
  }

  // 管理接口
  getPipeline(pipelineId: string): Pipeline | null {
    return this.pipelines.get(pipelineId) || null
  }

  getAllPipelines(): Pipeline[] {
    return Array.from(this.pipelines.values())
  }

  getRun(runId: string): PipelineRun | null {
    return this.runs.get(runId) || null
  }

  getRunHistory(pipelineId?: string): PipelineRun[] {
    if (pipelineId) {
      return this.runHistory.filter((run) => run.pipelineId === pipelineId)
    }
    return this.runHistory
  }

  cancelRun(runId: string): boolean {
    const run = this.runs.get(runId)
    if (!run || run.status !== "running") return false

    run.status = "cancelled"
    run.endTime = new Date()

    // 取消正在运行的阶段
    run.stages.forEach((stage) => {
      if (stage.status === "running") {
        stage.status = "failed"
        stage.endTime = new Date()
        stage.logs.push("阶段被取消")
      }
    })

    return true
  }

  // 统计信息
  getPipelineStats(pipelineId: string): {
    totalRuns: number
    successRate: number
    avgDuration: number
    recentRuns: PipelineRun[]
  } {
    const runs = this.runHistory.filter((run) => run.pipelineId === pipelineId)
    const successfulRuns = runs.filter((run) => run.status === "success")

    const durations = runs.filter((run) => run.endTime).map((run) => run.endTime!.getTime() - run.startTime.getTime())

    const avgDuration =
      durations.length > 0 ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length : 0

    return {
      totalRuns: runs.length,
      successRate: runs.length > 0 ? (successfulRuns.length / runs.length) * 100 : 0,
      avgDuration: Math.round(avgDuration / 1000), // 转换为秒
      recentRuns: runs.slice(-10), // 最近10次运行
    }
  }

  // 创建新流水线
  createPipeline(pipeline: Omit<Pipeline, "id">): string {
    const id = `pipeline_${Date.now()}_${Math.random().toString(36).substring(2)}`
    const newPipeline: Pipeline = { ...pipeline, id }

    this.pipelines.set(id, newPipeline)
    return id
  }

  // 更新流水线
  updatePipeline(pipelineId: string, updates: Partial<Pipeline>): boolean {
    const pipeline = this.pipelines.get(pipelineId)
    if (!pipeline) return false

    this.pipelines.set(pipelineId, { ...pipeline, ...updates })
    return true
  }

  // 删除流水线
  deletePipeline(pipelineId: string): boolean {
    return this.pipelines.delete(pipelineId)
  }
}

export const cicdManager = new CICDManager()
