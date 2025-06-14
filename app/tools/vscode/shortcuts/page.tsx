import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function VSCodeShortcutsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">VS Code 快捷键大全</h1>
        <p className="text-muted-foreground mt-2">提升开发效率的VS Code快捷键完整指南</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">通用</TabsTrigger>
          <TabsTrigger value="editing">编辑</TabsTrigger>
          <TabsTrigger value="navigation">导航</TabsTrigger>
          <TabsTrigger value="search">搜索</TabsTrigger>
          <TabsTrigger value="debug">调试</TabsTrigger>
          <TabsTrigger value="terminal">终端</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>基础操作</CardTitle>
                <CardDescription>最常用的基础快捷键</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>命令面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+P</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+P</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>快速打开文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+P</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+P</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>新建文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+N</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+N</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>保存文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+S</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+S</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>保存所有文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K S</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+S</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>关闭文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+W</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+W</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>关闭所有文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K Ctrl+W</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K Cmd+W</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>重新打开关闭的文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+T</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+T</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>窗口管理</CardTitle>
                <CardDescription>窗口和面板管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>新建窗口</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+N</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+N</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>关闭窗口</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+W</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+W</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>分割编辑器</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+\</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+\</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换编辑器组</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+1/2/3</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+1/2/3</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换侧边栏</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+B</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+B</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换资源管理器</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+E</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+E</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换搜索面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+F</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+F</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换Git面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+G</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+G</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="editing" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>文本编辑</CardTitle>
                <CardDescription>文本编辑和格式化</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>复制行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+Alt+↓</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+Option+↓</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>移动行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+↑/↓</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Option+↑/↓</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>删除行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+K</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+K</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>在上方插入行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+Enter</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+Enter</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>在下方插入行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Enter</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Enter</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>增加缩进</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+]</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+]</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>减少缩进</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+[</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+[</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>注释/取消注释</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+/</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+/</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>多光标编辑</CardTitle>
                <CardDescription>多光标和选择操作</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>添加光标</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+Click</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Option+Click</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>在上方添加光标</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Alt+↑</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+↑</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>在下方添加光标</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Alt+↓</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+↓</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>选择所有匹配项</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+L</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+L</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>选择下一个匹配项</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+D</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+D</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>跳过当前匹配项</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K Ctrl+D</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K Cmd+D</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>撤销上一个光标</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+U</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+U</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>选择整行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+L</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+L</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码格式化</CardTitle>
                <CardDescription>代码格式化和重构</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>格式化文档</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+Alt+F</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+Option+F</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>格式化选择</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K Ctrl+F</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K Cmd+F</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>重命名符号</TableCell>
                      <TableCell>
                        <Badge variant="outline">F2</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F2</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>快速修复</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+.</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+.</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>重构</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+R</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+R</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>折叠代码块</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+[</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+[</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>展开代码块</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+]</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+]</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>折叠所有</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K Ctrl+0</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K Cmd+0</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>智能编辑</CardTitle>
                <CardDescription>智能提示和自动完成</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>触发建议</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Space</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Space</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>触发参数提示</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+Space</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+Space</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>显示悬停信息</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K Ctrl+I</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K Cmd+I</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到定义</TableCell>
                      <TableCell>
                        <Badge variant="outline">F12</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F12</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>查看定义</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+F12</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Option+F12</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到类型定义</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+F12</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+F12</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>查找所有引用</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F12</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F12</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到符号</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+O</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+O</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>文件导航</CardTitle>
                <CardDescription>文件和标签页导航</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>切换标签页</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Tab</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Tab</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>上一个标签页</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+PageUp</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+[</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>下一个标签页</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+PageDown</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+]</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到特定标签页</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+1-9</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+1-9</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>最近打开的文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+R</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+R</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到文件</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+P</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+P</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到行</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+G</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+G</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>面包屑导航</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+;</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+;</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码导航</CardTitle>
                <CardDescription>代码内部导航</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>转到行首</TableCell>
                      <TableCell>
                        <Badge variant="outline">Home</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+←</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到行尾</TableCell>
                      <TableCell>
                        <Badge variant="outline">End</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+→</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到文件开头</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Home</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+↑</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到文件结尾</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+End</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+↓</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>按单词移动</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+←/→</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Option+←/→</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>跳转到匹配的括号</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+\</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+\</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>向前导航</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+→</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+-</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>向后导航</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+←</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+-</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="search" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>搜索和替换</CardTitle>
                <CardDescription>文本搜索和替换操作</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>查找</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+F</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+F</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>替换</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+H</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+F</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>查找下一个</TableCell>
                      <TableCell>
                        <Badge variant="outline">F3</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+G</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>查找上一个</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F3</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+G</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>选择所有匹配项</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+Enter</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Option+Enter</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>全局搜索</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+F</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+F</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>全局替换</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+H</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+H</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换大小写敏感</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+C</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+C</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>高级搜索</CardTitle>
                <CardDescription>正则表达式和符号搜索</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>切换正则表达式</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+R</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+R</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换整词匹配</TableCell>
                      <TableCell>
                        <Badge variant="outline">Alt+W</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Option+W</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到工作区符号</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+T</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+T</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>转到文件符号</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+O</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+O</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>显示问题面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+M</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+M</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>下一个错误或警告</TableCell>
                      <TableCell>
                        <Badge variant="outline">F8</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F8</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>上一个错误或警告</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F8</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F8</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>在文件中查找引用</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+Alt+F12</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+Option+F12</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="debug" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>调试控制</CardTitle>
                <CardDescription>调试器控制操作</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>开始/继续调试</TableCell>
                      <TableCell>
                        <Badge variant="outline">F5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F5</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>停止调试</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F5</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>重启调试</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+F5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+F5</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>暂停</TableCell>
                      <TableCell>
                        <Badge variant="outline">F6</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F6</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>单步跳过</TableCell>
                      <TableCell>
                        <Badge variant="outline">F10</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F10</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>单步进入</TableCell>
                      <TableCell>
                        <Badge variant="outline">F11</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F11</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>单步跳出</TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F11</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Shift+F11</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换断点</TableCell>
                      <TableCell>
                        <Badge variant="outline">F9</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F9</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>断点管理</CardTitle>
                <CardDescription>断点和监视管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>切换断点</TableCell>
                      <TableCell>
                        <Badge variant="outline">F9</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F9</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>条件断点</TableCell>
                      <TableCell>
                        <Badge variant="outline">右键+条件</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">右键+条件</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>禁用所有断点</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+F9</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+F9</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>启用所有断点</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+F9</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+F9</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>显示调试控制台</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+Y</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+Y</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>显示调试面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+D</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+D</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>添加到监视</TableCell>
                      <TableCell>
                        <Badge variant="outline">右键+监视</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">右键+监视</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>计算表达式</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K Ctrl+I</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K Cmd+I</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="terminal" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>终端操作</CardTitle>
                <CardDescription>集成终端管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>显示/隐藏终端</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+`</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+`</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>新建终端</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+`</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+`</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>分割终端</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+\</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+\</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>切换终端</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+PageUp/Down</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+[/]</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>关闭终端</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+W</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+W</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>清除终端</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+K</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+K</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>向上滚动</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+↑</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+↑</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>向下滚动</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+↓</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+↓</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>任务和运行</CardTitle>
                <CardDescription>任务执行和运行配置</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>功能</TableHead>
                      <TableHead>Windows/Linux</TableHead>
                      <TableHead>macOS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>运行任务</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+P</Badge> → Tasks
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+P</Badge> → Tasks
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>运行上次任务</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+F5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+F5</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>停止任务</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+C</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+C</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>配置任务</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+P</Badge> → Configure
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+P</Badge> → Configure
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>显示输出面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+U</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+U</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>显示问题面板</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+Shift+M</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+Shift+M</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>运行代码</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ctrl+F5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cmd+F5</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>调试代码</TableCell>
                      <TableCell>
                        <Badge variant="outline">F5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">F5</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 自定义快捷键提示 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>自定义快捷键</CardTitle>
          <CardDescription>如何自定义和管理快捷键</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">打开快捷键设置</h4>
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">Ctrl+K Ctrl+S</Badge>
              <span className="text-sm text-muted-foreground">或</span>
              <Badge variant="outline">Cmd+K Cmd+S</Badge>
            </div>
            <p className="text-sm text-muted-foreground">在快捷键设置中，你可以搜索、修改和添加自定义快捷键绑定。</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">快捷键冲突解决</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 当快捷键冲突时，VS Code会显示警告图标</li>
              <li>• 可以为同一命令设置多个快捷键</li>
              <li>• 使用"when"条件来限制快捷键的作用范围</li>
              <li>• 可以导出和导入快捷键配置</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">常用自定义快捷键示例</h4>
            <div className="bg-muted p-4 rounded-md text-sm font-mono">
              <pre>{`// keybindings.json 示例
[
  {
    "key": "ctrl+shift+alt+f",
    "command": "editor.action.formatDocument",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+shift+d",
    "command": "editor.action.duplicateSelection"
  },
  {
    "key": "alt+up",
    "command": "editor.action.moveLinesUpAction",
    "when": "editorTextFocus"
  }
]`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
