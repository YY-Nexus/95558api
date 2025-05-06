"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function VSCodePage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">VS Code 使用指南</h1>
        <p className="text-muted-foreground mt-2">Visual Studio Code 快捷键、插件推荐和使用技巧</p>
      </div>

      <Tabs defaultValue="shortcuts">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shortcuts">快捷键</TabsTrigger>
          <TabsTrigger value="extensions">插件推荐</TabsTrigger>
          <TabsTrigger value="settings">设置技巧</TabsTrigger>
          <TabsTrigger value="themes">主题定制</TabsTrigger>
        </TabsList>

        <TabsContent value="shortcuts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>常用快捷键</CardTitle>
              <CardDescription>提高开发效率的VS Code快捷键</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">功能</TableHead>
                    <TableHead>Windows快捷键</TableHead>
                    <TableHead>Mac快捷键</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">命令面板</TableCell>
                    <TableCell>
                      <code>Ctrl+Shift+P</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+Shift+P</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">快速打开文件</TableCell>
                    <TableCell>
                      <code>Ctrl+P</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+P</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">保存文件</TableCell>
                    <TableCell>
                      <code>Ctrl+S</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+S</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">格式化文档</TableCell>
                    <TableCell>
                      <code>Shift+Alt+F</code>
                    </TableCell>
                    <TableCell>
                      <code>Shift+Option+F</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">注释代码</TableCell>
                    <TableCell>
                      <code>Ctrl+/</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+/</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">多光标编辑</TableCell>
                    <TableCell>
                      <code>Alt+Click</code>
                    </TableCell>
                    <TableCell>
                      <code>Option+Click</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">查找</TableCell>
                    <TableCell>
                      <code>Ctrl+F</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+F</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">全局查找</TableCell>
                    <TableCell>
                      <code>Ctrl+Shift+F</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+Shift+F</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">替换</TableCell>
                    <TableCell>
                      <code>Ctrl+H</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+Option+F</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">全局替换</TableCell>
                    <TableCell>
                      <code>Ctrl+Shift+H</code>
                    </TableCell>
                    <TableCell>
                      <code>Cmd+Shift+H</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Link href="/tools/vscode/shortcuts" className="w-full">
                <Button className="w-full" variant="outline">
                  查看更多快捷键
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="extensions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>ESLint</CardTitle>
                <CardDescription>JavaScript代码检查工具</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  ESLint是一个可组装的JavaScript和JSX检查工具，帮助开发者发现并修复代码中的问题。
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open("vscode:extension/dbaeumer.vscode-eslint")}
                >
                  安装插件
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Prettier</CardTitle>
                <CardDescription>代码格式化工具</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prettier是一个固执己见的代码格式化工具，支持多种语言，确保团队代码风格一致。
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open("vscode:extension/esbenp.prettier-vscode")}
                >
                  安装插件
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>GitLens</CardTitle>
                <CardDescription>Git增强工具</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  GitLens增强了VS Code内置的Git功能，提供代码作者信息、历史记录和强大的比较功能。
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open("vscode:extension/eamodio.gitlens")}
                >
                  安装插件
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Live Server</CardTitle>
                <CardDescription>本地开发服务器</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Live Server为静态和动态页面启动一个具有实时重载功能的本地开发服务器。
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open("vscode:extension/ritwickdey.LiveServer")}
                >
                  安装插件
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Tailwind CSS IntelliSense</CardTitle>
                <CardDescription>Tailwind CSS智能提示</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  为Tailwind CSS提供智能提示、自动完成和语法高亮功能，提高开发效率。
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open("vscode:extension/bradlc.vscode-tailwindcss")}
                >
                  安装插件
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Thunder Client</CardTitle>
                <CardDescription>轻量级REST客户端</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Thunder Client是VS Code的轻量级REST客户端，用于测试API，简单易用且功能强大。
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/50">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open("vscode:extension/rangav.vscode-thunder-client")}
                >
                  安装插件
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 其他标签页内容类似 */}
      </Tabs>
    </div>
  )
}
