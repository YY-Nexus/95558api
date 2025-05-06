"use client"

import { useState } from "react"
import { Database, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [offlineMode, setOfflineMode] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">设置</h1>
        <p className="text-muted-foreground mt-2">管理应用设置和偏好</p>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList>
          <TabsTrigger value="appearance">外观</TabsTrigger>
          <TabsTrigger value="data">数据管理</TabsTrigger>
          <TabsTrigger value="about">关于</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>主题</CardTitle>
              <CardDescription>自定义应用的外观</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue={theme}
                onValueChange={(value) => setTheme(value)}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="light" id="light" className="sr-only" />
                  <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    data-state={theme === "light" ? "checked" : "unchecked"}
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    亮色
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="dark" id="dark" className="sr-only" />
                  <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    data-state={theme === "dark" ? "checked" : "unchecked"}
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    暗色
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="system" id="system" className="sr-only" />
                  <Label
                    htmlFor="system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    data-state={theme === "system" ? "checked" : "unchecked"}
                  >
                    <Database className="mb-3 h-6 w-6" />
                    系统
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>数据存储</CardTitle>
              <CardDescription>管理应用数据和存储设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="offline-mode">离线模式</Label>
                  <p className="text-sm text-muted-foreground">启用完全离线工作，所有数据存储在浏览器中</p>
                </div>
                <Switch id="offline-mode" checked={offlineMode} onCheckedChange={setOfflineMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">自动保存</Label>
                  <p className="text-sm text-muted-foreground">自动保存更改到本地存储</p>
                </div>
                <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                清除本地数据
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>关于应用</CardTitle>
              <CardDescription>应用信息和版本</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">启智云枢³ (IntelliCloudHub³)</h3>
                <p className="text-sm text-muted-foreground mt-1">版本: 1.0.0</p>
              </div>

              <p className="text-sm">
                这是一个本地部署的知识库应用，包含术语对照表、VS Code快捷键、
                终端命令、API集成库和代码片段库。所有数据都存储在您的浏览器中，不会上传到任何服务器。
              </p>

              <div>
                <h4 className="font-medium">存储信息</h4>
                <p className="text-sm text-muted-foreground mt-1">数据存储在浏览器的IndexedDB中</p>
                <p className="text-sm text-muted-foreground">应用支持完全离线工作，并可以安装为PWA（渐进式Web应用）</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
