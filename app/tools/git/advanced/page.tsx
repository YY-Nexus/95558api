import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TerminalCommandCard } from "@/components/terminal-command-card"

export default function GitAdvancedPage() {
  // Git高级命令数据
  const rebaseCommands = [
    {
      title: "交互式变基",
      description: "重新整理提交历史",
      command: "git rebase -i HEAD~3",
      example: "git rebase -i HEAD~3\n# 编辑器中选择操作：pick, reword, edit, squash, drop",
      explanation: "交互式变基允许你重新排列、合并、编辑或删除最近的3个提交，用于清理提交历史。",
    },
    {
      title: "变基到主分支",
      description: "将当前分支变基到主分支",
      command: "git rebase main",
      example: "git checkout feature-branch\ngit rebase main",
      explanation: "将feature-branch的提交重新应用到main分支的最新提交之上，创建线性历史。",
    },
    {
      title: "继续变基",
      description: "解决冲突后继续变基",
      command: "git rebase --continue",
      example: "# 解决冲突后\ngit add .\ngit rebase --continue",
      explanation: "在变基过程中遇到冲突时，解决冲突并添加文件后，使用此命令继续变基过程。",
    },
    {
      title: "中止变基",
      description: "取消正在进行的变基",
      command: "git rebase --abort",
      example: "git rebase --abort",
      explanation: "如果变基过程中出现问题，使用此命令可以取消变基并返回到变基前的状态。",
    },
  ]

  const cherryPickCommands = [
    {
      title: "选择单个提交",
      description: "将指定提交应用到当前分支",
      command: "git cherry-pick <commit-hash>",
      example: "git cherry-pick a1b2c3d4",
      explanation: "将指定的提交应用到当前分支，创建一个新的提交。",
    },
    {
      title: "选择多个提交",
      description: "选择多个不连续的提交",
      command: "git cherry-pick <commit1> <commit2> <commit3>",
      example: "git cherry-pick a1b2c3d4 e5f6g7h8 i9j0k1l2",
      explanation: "一次性将多个指定的提交应用到当前分支。",
    },
    {
      title: "选择提交范围",
      description: "选择一个范围内的提交",
      command: "git cherry-pick <start-commit>..<end-commit>",
      example: "git cherry-pick a1b2c3d4..e5f6g7h8",
      explanation: "选择从start-commit到end-commit之间的所有提交（不包括start-commit）。",
    },
    {
      title: "仅应用更改",
      description: "应用更改但不创建提交",
      command: "git cherry-pick -n <commit-hash>",
      example: "git cherry-pick -n a1b2c3d4",
      explanation: "应用指定提交的更改到工作区，但不自动创建提交，允许你进一步修改。",
    },
  ]

  const stashCommands = [
    {
      title: "保存当前更改",
      description: "将当前工作区更改保存到stash",
      command: "git stash",
      example: 'git stash\n# 或添加描述\ngit stash save "正在开发登录功能"',
      explanation: "将当前工作区的修改保存到stash栈中，工作区恢复到干净状态。",
    },
    {
      title: "查看stash列表",
      description: "显示所有保存的stash",
      command: "git stash list",
      example:
        "git stash list\n# 输出：\n# stash@{0}: WIP on main: a1b2c3d 添加登录功能\n# stash@{1}: On feature: e5f6g7h 修复bug",
      explanation: "显示所有保存的stash条目，每个条目都有一个索引号。",
    },
    {
      title: "应用最新stash",
      description: "应用最近的stash并保留stash",
      command: "git stash apply",
      example: "git stash apply\n# 或应用指定stash\ngit stash apply stash@{1}",
      explanation: "将stash中的更改应用到当前工作区，但保留stash条目。",
    },
    {
      title: "弹出最新stash",
      description: "应用最近的stash并删除它",
      command: "git stash pop",
      example: "git stash pop\n# 或弹出指定stash\ngit stash pop stash@{1}",
      explanation: "应用stash中的更改到工作区，并从stash栈中删除该条目。",
    },
    {
      title: "删除stash",
      description: "删除指定的stash条目",
      command: "git stash drop <stash-id>",
      example: "git stash drop stash@{1}\n# 或删除所有stash\ngit stash clear",
      explanation: "删除指定的stash条目，或使用clear删除所有stash。",
    },
    {
      title: "查看stash内容",
      description: "显示stash的详细更改",
      command: "git stash show -p <stash-id>",
      example: "git stash show -p stash@{0}",
      explanation: "显示指定stash中包含的具体更改内容。",
    },
  ]

  const bisectCommands = [
    {
      title: "开始二分查找",
      description: "启动Git二分查找",
      command: "git bisect start",
      example: "git bisect start\ngit bisect bad          # 当前版本有问题\ngit bisect good v1.0    # v1.0版本正常",
      explanation: "开始二分查找过程，用于定位引入bug的具体提交。",
    },
    {
      title: "标记为好版本",
      description: "标记当前版本为正常",
      command: "git bisect good",
      example: "git bisect good\n# 或指定提交\ngit bisect good a1b2c3d4",
      explanation: "告诉Git当前检出的版本是正常的，Git会继续二分查找。",
    },
    {
      title: "标记为坏版本",
      description: "标记当前版本有问题",
      command: "git bisect bad",
      example: "git bisect bad\n# 或指定提交\ngit bisect bad e5f6g7h8",
      explanation: "告诉Git当前检出的版本有问题，Git会继续二分查找。",
    },
    {
      title: "结束二分查找",
      description: "完成二分查找并返回原分支",
      command: "git bisect reset",
      example: "git bisect reset",
      explanation: "结束二分查找过程，返回到开始二分查找前的分支状态。",
    },
    {
      title: "自动化二分查找",
      description: "使用脚本自动进行二分查找",
      command: "git bisect run <test-script>",
      example: "git bisect run npm test\n# 或使用自定义脚本\ngit bisect run ./test.sh",
      explanation: "自动运行测试脚本进行二分查找，脚本返回0表示好版本，非0表示坏版本。",
    },
  ]

  const workflowCommands = [
    {
      title: "Git Flow初始化",
      description: "初始化Git Flow工作流",
      command: "git flow init",
      example: "git flow init\n# 按提示设置分支名称，通常使用默认值",
      explanation: "初始化Git Flow工作流，设置主分支、开发分支等的命名规范。",
    },
    {
      title: "开始新功能",
      description: "创建新的功能分支",
      command: "git flow feature start <feature-name>",
      example: "git flow feature start user-authentication",
      explanation: "从develop分支创建一个新的功能分支，用于开发新功能。",
    },
    {
      title: "完成功能开发",
      description: "完成功能开发并合并",
      command: "git flow feature finish <feature-name>",
      example: "git flow feature finish user-authentication",
      explanation: "将功能分支合并回develop分支，并删除功能分支。",
    },
    {
      title: "开始发布准备",
      description: "创建发布分支",
      command: "git flow release start <version>",
      example: "git flow release start 1.2.0",
      explanation: "从develop分支创建发布分支，用于发布前的最后准备工作。",
    },
    {
      title: "完成发布",
      description: "完成发布并打标签",
      command: "git flow release finish <version>",
      example: "git flow release finish 1.2.0",
      explanation: "将发布分支合并到main和develop分支，创建版本标签，并删除发布分支。",
    },
    {
      title: "紧急修复",
      description: "创建热修复分支",
      command: "git flow hotfix start <hotfix-name>",
      example: "git flow hotfix start critical-security-fix",
      explanation: "从main分支创建热修复分支，用于修复生产环境的紧急问题。",
    },
  ]

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">Git 高级技巧</h1>
        <p className="text-muted-foreground mt-2">掌握Git的高级功能和工作流程</p>
      </div>

      <Tabs defaultValue="rebase" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="rebase">变基操作</TabsTrigger>
          <TabsTrigger value="cherry-pick">选择提交</TabsTrigger>
          <TabsTrigger value="stash">暂存管理</TabsTrigger>
          <TabsTrigger value="bisect">二分查找</TabsTrigger>
          <TabsTrigger value="workflow">工作流程</TabsTrigger>
        </TabsList>

        <TabsContent value="rebase" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Git Rebase 详解</CardTitle>
                <CardDescription>变基操作的原理和最佳实践</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">什么是Rebase？</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rebase是将一系列提交移动或组合到新的基础提交上的操作。它可以创建更干净、线性的项目历史。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Rebase vs Merge</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h5 className="font-medium text-green-600 mb-2">Rebase优点</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 创建线性、干净的历史</li>
                        <li>• 避免不必要的合并提交</li>
                        <li>• 更容易理解项目演进</li>
                        <li>• 便于代码审查</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h5 className="font-medium text-red-600 mb-2">Rebase注意事项</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 不要对已推送的提交进行rebase</li>
                        <li>• 可能需要解决冲突</li>
                        <li>• 会改变提交的SHA值</li>
                        <li>• 团队需要统一使用规范</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">交互式Rebase操作</h4>
                  <div className="bg-muted p-4 rounded-md text-sm font-mono">
                    <pre>{`# 交互式rebase编辑器中的操作选项：
pick a1b2c3d 添加用户登录功能
reword e5f6g7h 修复登录bug  # 修改提交信息
edit i9j0k1l 优化登录性能   # 编辑提交内容
squash m3n4o5p 添加测试用例 # 合并到上一个提交
drop q7r8s9t 临时调试代码   # 删除此提交

# 操作说明：
# pick: 保持提交不变
# reword: 保持提交内容，但修改提交信息
# edit: 暂停以便修改提交
# squash: 将此提交合并到前一个提交
# drop: 删除此提交`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {rebaseCommands.map((command, index) => (
                <TerminalCommandCard key={index} command={command} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cherry-pick" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cherry-pick 使用场景</CardTitle>
                <CardDescription>选择性应用提交的常见场景</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h5 className="font-medium text-blue-700 mb-2">热修复</h5>
                    <p className="text-sm text-blue-600">从开发分支选择bug修复提交到生产分支</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md">
                    <h5 className="font-medium text-green-700 mb-2">功能移植</h5>
                    <p className="text-sm text-green-600">将特定功能从一个分支移植到另一个分支</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-md">
                    <h5 className="font-medium text-purple-700 mb-2">选择性合并</h5>
                    <p className="text-sm text-purple-600">只合并分支中的部分提交，而不是整个分支</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cherry-pick冲突处理</h4>
                  <div className="bg-muted p-4 rounded-md text-sm font-mono">
                    <pre>{`# 当cherry-pick遇到冲突时：
git cherry-pick a1b2c3d4
# 出现冲突，编辑冲突文件

# 解决冲突后：
git add .
git cherry-pick --continue

# 或者放弃cherry-pick：
git cherry-pick --abort

# 跳过当前提交：
git cherry-pick --skip`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {cherryPickCommands.map((command, index) => (
                <TerminalCommandCard key={index} command={command} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stash" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Git Stash 最佳实践</CardTitle>
                <CardDescription>有效管理工作区临时更改</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Stash使用场景</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 临时切换分支处理紧急问题</li>
                    <li>• 拉取远程更新前保存本地更改</li>
                    <li>• 实验性更改的临时保存</li>
                    <li>• 在不同功能间快速切换</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Stash高级用法</h4>
                  <div className="bg-muted p-4 rounded-md text-sm font-mono">
                    <pre>{`# 只stash已跟踪的文件
git stash --keep-index

# 包含未跟踪的文件
git stash --include-untracked

# 包含所有文件（包括忽略的文件）
git stash --all

# 创建分支从stash
git stash branch new-feature stash@{1}

# 部分stash（交互式）
git stash --patch`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Stash管理技巧</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-md">
                      <h5 className="font-medium text-green-700 mb-1">好习惯</h5>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• 给stash添加描述性信息</li>
                        <li>• 定期清理不需要的stash</li>
                        <li>• 使用stash list查看所有条目</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md">
                      <h5 className="font-medium text-red-700 mb-1">避免</h5>
                      <ul className="text-sm text-red-600 space-y-1">
                        <li>• 长期保存stash不处理</li>
                        <li>• 在stash中保存重要更改</li>
                        <li>• 忘记stash的具体内容</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {stashCommands.map((command, index) => (
                <TerminalCommandCard key={index} command={command} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bisect" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Git Bisect 调试技巧</CardTitle>
                <CardDescription>高效定位问题提交的方法</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">二分查找原理</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Git bisect使用二分查找算法，在已知好版本和坏版本之间快速定位引入问题的提交。
                    每次测试都会将搜索范围减半，大大提高调试效率。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Bisect工作流程</h4>
                  <div className="bg-muted p-4 rounded-md text-sm">
                    <ol className="list-decimal list-inside space-y-2">
                      <li>确定一个已知的好版本（没有bug）</li>
                      <li>确定一个已知的坏版本（有bug）</li>
                      <li>Git自动检出中间的提交</li>
                      <li>测试当前版本，标记为好或坏</li>
                      <li>重复步骤3-4，直到找到引入bug的提交</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">自动化测试脚本示例</h4>
                  <div className="bg-muted p-4 rounded-md text-sm font-mono">
                    <pre>{`#!/bin/bash
# test.sh - 自动化测试脚本

# 构建项目
npm install && npm run build

# 运行测试
npm test

# 检查特定功能
if curl -f http://localhost:3000/api/health; then
    exit 0  # 测试通过，这是好版本
else
    exit 1  # 测试失败，这是坏版本
fi`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Bisect使用技巧</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <h5 className="font-medium text-blue-700 mb-1">效率提升</h5>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• 使用自动化测试脚本</li>
                        <li>• 准备可重现的测试用例</li>
                        <li>• 选择合适的好坏版本范围</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-md">
                      <h5 className="font-medium text-yellow-700 mb-1">注意事项</h5>
                      <ul className="text-sm text-yellow-600 space-y-1">
                        <li>• 确保测试环境一致</li>
                        <li>• 避免在bisect过程中修改代码</li>
                        <li>• 记录测试结果和发现</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {bisectCommands.map((command, index) => (
                <TerminalCommandCard key={index} command={command} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Git工作流程对比</CardTitle>
                <CardDescription>不同团队规模和项目类型的工作流选择</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium text-blue-700 mb-2">Git Flow</h5>
                    <p className="text-sm text-muted-foreground mb-3">适合有计划发布周期的大型项目</p>
                    <ul className="text-sm space-y-1">
                      <li>• 严格的分支管理</li>
                      <li>• 支持并行开发</li>
                      <li>• 适合版本发布</li>
                      <li>• 学习成本较高</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium text-green-700 mb-2">GitHub Flow</h5>
                    <p className="text-sm text-muted-foreground mb-3">适合持续部署的敏捷团队</p>
                    <ul className="text-sm space-y-1">
                      <li>• 简单的分支策略</li>
                      <li>• 快速迭代</li>
                      <li>• 持续集成友好</li>
                      <li>• 适合小团队</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium text-purple-700 mb-2">GitLab Flow</h5>
                    <p className="text-sm text-muted-foreground mb-3">结合了Git Flow和GitHub Flow的优点</p>
                    <ul className="text-sm space-y-1">
                      <li>• 环境分支</li>
                      <li>• 上游优先</li>
                      <li>• 灵活配置</li>
                      <li>• 适合中大型团队</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Git Flow分支说明</h4>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">主要分支</h5>
                        <ul className="space-y-1">
                          <li>
                            <strong>main/master:</strong> 生产环境代码
                          </li>
                          <li>
                            <strong>develop:</strong> 开发环境代码
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">辅助分支</h5>
                        <ul className="space-y-1">
                          <li>
                            <strong>feature/*:</strong> 功能开发分支
                          </li>
                          <li>
                            <strong>release/*:</strong> 发布准备分支
                          </li>
                          <li>
                            <strong>hotfix/*:</strong> 紧急修复分支
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">工作流程选择建议</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-md">
                      <h5 className="font-medium text-green-700 mb-2">选择Git Flow当：</h5>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• 项目有明确的发布周期</li>
                        <li>• 需要维护多个版本</li>
                        <li>• 团队规模较大</li>
                        <li>• 需要严格的代码审查</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h5 className="font-medium text-blue-700 mb-2">选择GitHub Flow当：</h5>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• 持续部署到生产环境</li>
                        <li>• 团队规模较小</li>
                        <li>• 快速迭代开发</li>
                        <li>• 简单的项目结构</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {workflowCommands.map((command, index) => (
                <TerminalCommandCard key={index} command={command} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
