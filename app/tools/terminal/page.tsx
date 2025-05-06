import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Terminal, Variable, FileText, GitBranch, Database } from "lucide-react"

export default function TerminalPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* 页面标题 / Page title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">终端命令</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用终端命令、变量和使用技巧</p>
      </div>

      {/* 功能卡片网格 / Feature card grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 基础命令卡片 / Basic commands card */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>基础命令</CardTitle>
              <CardDescription>常用终端基础命令</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含文件操作、目录导航、权限管理等基础命令，适合终端新手入门使用。
              {/* Includes file operations, directory navigation, permission management and other basic commands, suitable for terminal beginners. */}
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/terminal/basics" className="w-full">
              <Button className="w-full" variant="outline">
                查看基础命令
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* 终端变量卡片 / Terminal variables card */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Variable className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>终端变量</CardTitle>
              <CardDescription>变量命令与释义</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含环境变量、Shell变量的释义和用途，以及生成各类变量值的命令和示例。
              {/* Includes explanations and uses of environment variables, Shell variables, as well as commands and examples for generating various variable values. */}
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/terminal/variables" className="w-full">
              <Button className="w-full" variant="outline">
                查看终端变量
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* 文本处理卡片 / Text processing card */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>文本处理</CardTitle>
              <CardDescription>文本处理命令</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含grep、sed、awk等文本处理命令，用于搜索、替换和处理文本文件内容。
              {/* Includes text processing commands such as grep, sed, awk, used for searching, replacing, and processing text file content. */}
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/terminal/text" className="w-full">
              <Button className="w-full" variant="outline">
                查看文本处理
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Git命令卡片 / Git commands card */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <GitBranch className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Git命令</CardTitle>
              <CardDescription>Git版本控制命令</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含常用的Git版本控制命令，用于代码仓库管理、分支操作和协作开发。
              {/* Includes common Git version control commands for code repository management, branch operations, and collaborative development. */}
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/terminal/git" className="w-full">
              <Button className="w-full" variant="outline">
                查看Git命令
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* 数据库命令卡片 / Database commands card */}
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>数据库命令</CardTitle>
              <CardDescription>数据库操作命令</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              包含MySQL、PostgreSQL等数据库的命令行操作指令，用于数据库管理和查询。
              {/* Includes command line operation instructions for databases such as MySQL and PostgreSQL, used for database management and queries. */}
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/tools/terminal/database" className="w-full">
              <Button className="w-full" variant="outline">
                查看数据库命令
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
