import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Terminal, Code, GitBranch, Database, BookOpen } from "lucide-react"

export default function ToolsPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">开发工具</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 开发工具和环境配置指南</p>
      </div>

      {/* 功能卡片网格 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 终端命令卡片 */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>终端命令</CardTitle>
              <CardDescription>常用终端命令和变量</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含常用终端命令、环境变量、Shell变量的释义和用途，以及文本处理命令等。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/terminal" className="w-full">
              <Button className="w-full" variant="outline">
                查看终端命令
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* VS Code卡片 */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>VS Code</CardTitle>
              <CardDescription>VS Code使用指南</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">包含VS Code的快捷键、插件推荐、设置技巧和主题定制等内容。</p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/vscode" className="w-full">
              <Button className="w-full" variant="outline">
                查看VS Code指南
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Git命令卡片 */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <GitBranch className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Git命令</CardTitle>
              <CardDescription>Git版本控制指南</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含Git的基本命令、分支管理、合并策略、工作流程和常见问题解决方案。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/git" className="w-full">
              <Button className="w-full" variant="outline">
                查看Git指南
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* 数据库工具卡片 */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>数据库工具</CardTitle>
              <CardDescription>数据库管理工具</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含常用数据库管理工具的使用指南、SQL查询技巧和数据库优化建议。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/database" className="w-full">
              <Button className="w-full" variant="outline">
                查看数据库工具
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* 术语表卡片 */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>术语表</CardTitle>
              <CardDescription>开发术语对照表</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">包含开发中常用的专业术语解释、中英文对照和相关概念说明。</p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/glossary" className="w-full">
              <Button className="w-full" variant="outline">
                查看术语表
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
