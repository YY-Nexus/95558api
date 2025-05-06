import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TerminalCommandCard } from "@/components/terminal-command-card"

export default function GitPage() {
  // Git基础命令数据
  const basicCommands = [
    {
      title: "初始化仓库",
      description: "在当前目录创建Git仓库",
      command: "git init",
      example: "git init",
      explanation: "在当前目录创建一个新的Git仓库，生成.git目录用于存储版本信息。",
    },
    {
      title: "克隆仓库",
      description: "克隆远程仓库到本地",
      command: "git clone <repository-url>",
      example: "git clone https://github.com/username/repository.git",
      explanation: "从远程仓库URL克隆一个完整的Git仓库到本地，包括所有历史记录。",
    },
    {
      title: "添加文件",
      description: "将文件添加到暂存区",
      command: "git add <file-name> 或 git add .",
      example: "git add index.html 或 git add .",
      explanation: "将指定文件或所有更改添加到Git暂存区，准备提交。",
    },
    {
      title: "提交更改",
      description: "将暂存区的更改提交到仓库",
      command: 'git commit -m "<commit-message>"',
      example: 'git commit -m "添加登录功能"',
      explanation: "将暂存区的更改提交到本地仓库，并添加描述性的提交信息。",
    },
    {
      title: "查看状态",
      description: "查看工作区和暂存区状态",
      command: "git status",
      example: "git status",
      explanation: "显示工作区和暂存区的状态，包括已修改、已暂存和未跟踪的文件。",
    },
    {
      title: "查看提交历史",
      description: "查看提交历史记录",
      command: "git log",
      example: "git log --oneline",
      explanation: "显示提交历史记录，包括提交ID、作者、日期和提交信息。",
    },
  ]

  // Git分支命令数据
  const branchCommands = [
    {
      title: "创建分支",
      description: "创建新分支",
      command: "git branch <branch-name>",
      example: "git branch feature/login",
      explanation: "创建一个新的分支，但不会自动切换到新分支。",
    },
    {
      title: "切换分支",
      description: "切换到指定分支",
      command: "git checkout <branch-name>",
      example: "git checkout feature/login",
      explanation: "切换到指定的分支，更新工作区文件以匹配该分支的状态。",
    },
    {
      title: "创建并切换分支",
      description: "创建新分支并立即切换",
      command: "git checkout -b <branch-name>",
      example: "git checkout -b feature/login",
      explanation: "创建一个新的分支并立即切换到该分支，相当于执行git branch和git checkout的组合。",
    },
    {
      title: "合并分支",
      description: "将指定分支合并到当前分支",
      command: "git merge <branch-name>",
      example: "git merge feature/login",
      explanation: "将指定分支的更改合并到当前活动分支中。",
    },
    {
      title: "删除分支",
      description: "删除本地分支",
      command: "git branch -d <branch-name>",
      example: "git branch -d feature/login",
      explanation: "删除指定的本地分支，如果分支未完全合并，会阻止删除。使用-D强制删除。",
    },
    {
      title: "查看所有分支",
      description: "列出所有本地分支",
      command: "git branch",
      example: "git branch",
      explanation: "列出所有本地分支，当前分支会用星号(*)标记。",
    },
  ]

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">Git 使用指南</h1>
        <p className="text-muted-foreground mt-2">Git版本控制系统的常用命令和工作流程</p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">基础命令</TabsTrigger>
          <TabsTrigger value="branches">分支管理</TabsTrigger>
          <TabsTrigger value="workflow">工作流程</TabsTrigger>
          <TabsTrigger value="advanced">高级技巧</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {basicCommands.map((command, index) => (
              <TerminalCommandCard key={index} command={command} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="branches" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {branchCommands.map((command, index) => (
              <TerminalCommandCard key={index} command={command} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Git Flow工作流</CardTitle>
              <CardDescription>基于分支的Git工作流模型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Git Flow是一种基于分支的工作流模型，它定义了一组严格的分支创建和合并规则，适用于有计划发布周期的项目。
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">分支类型</TableHead>
                    <TableHead>用途</TableHead>
                    <TableHead>命名规范</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">master</TableCell>
                    <TableCell>生产环境代码，只包含已发布的代码</TableCell>
                    <TableCell>master</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">develop</TableCell>
                    <TableCell>开发环境代码，包含最新的开发特性</TableCell>
                    <TableCell>develop</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">feature</TableCell>
                    <TableCell>用于开发新功能</TableCell>
                    <TableCell>feature/功能名称</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">release</TableCell>
                    <TableCell>准备发布版本，进行最后的调整</TableCell>
                    <TableCell>release/版本号</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">hotfix</TableCell>
                    <TableCell>修复生产环境中的紧急问题</TableCell>
                    <TableCell>hotfix/问题描述</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="bg-muted p-4 rounded-md text-sm">
                <h4 className="font-medium mb-2">Git Flow工作流程示例</h4>
                <pre className="overflow-x-auto">
                  <code>{`# 初始化Git Flow
git flow init

# 开始新功能开发
git flow feature start login-feature

# 完成功能开发
git flow feature finish login-feature

# 开始发布准备
git flow release start 1.0.0

# 完成发布
git flow release finish 1.0.0

# 修复生产环境问题
git flow hotfix start critical-bug
git flow hotfix finish critical-bug`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Git Rebase</CardTitle>
                <CardDescription>重新应用提交到另一个基础点</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Rebase是一种Git操作，用于将一系列提交移动或组合到新的基础提交上。它可以创建更干净的项目历史。
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <pre className="overflow-x-auto">
                    <code>{`# 将当前分支的更改应用到master分支上
git checkout feature-branch
git rebase master

# 交互式rebase，可以编辑、合并、删除提交
git rebase -i HEAD~3  # 处理最近3个提交`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Git Cherry-pick</CardTitle>
                <CardDescription>选择性地应用提交</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Cherry-pick允许你选择一个或多个提交，将其应用到当前分支，而不必合并整个分支。
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <pre className="overflow-x-auto">
                    <code>{`# 应用单个提交
git cherry-pick <commit-hash>

# 应用多个提交
git cherry-pick <commit-hash-1> <commit-hash-2>

# 应用一系列提交
git cherry-pick <start-commit>..<end-commit>`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Git Stash</CardTitle>
                <CardDescription>临时保存工作区更改</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Stash用于临时保存工作区的修改，以便你可以切换到其他任务，稍后再回来继续工作。
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <pre className="overflow-x-auto">
                    <code>{`# 保存当前工作区更改
git stash

# 保存更改并添加描述
git stash save "正在开发登录功能"

# 查看所有stash
git stash list

# 应用最近的stash并删除它
git stash pop

# 应用指定的stash
git stash apply stash@{2}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Git Bisect</CardTitle>
                <CardDescription>二分查找定位问题提交</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Bisect是一个强大的调试工具，它使用二分查找算法帮助你找出引入bug的提交。
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <pre className="overflow-x-auto">
                    <code>{`# 开始二分查找
git bisect start

# 标记当前版本有问题
git bisect bad

# 标记一个已知正常的版本
git bisect good <commit-hash>

# 测试后标记当前检出的版本
git bisect good  # 如果当前版本正常
git bisect bad   # 如果当前版本有问题

# 完成查找后重置
git bisect reset`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
