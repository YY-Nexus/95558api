"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Zap,
  Moon,
  Sun,
  Type,
  Layout,
  MousePointer,
  Accessibility,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UXSettings {
  theme: "light" | "dark" | "auto"
  fontSize: number
  spacing: number
  animationSpeed: number
  colorContrast: number
  reducedMotion: boolean
  highContrast: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  responsiveBreakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export function UXOptimizer() {
  const [settings, setSettings] = useState<UXSettings>({
    theme: "auto",
    fontSize: 16,
    spacing: 16,
    animationSpeed: 300,
    colorContrast: 4.5,
    reducedMotion: false,
    highContrast: false,
    screenReader: false,
    keyboardNavigation: true,
    responsiveBreakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1280,
    },
  })

  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { toast } = useToast()

  // 应用设置到DOM
  useEffect(() => {
    const root = document.documentElement

    // 应用字体大小
    root.style.setProperty("--font-size-base", `${settings.fontSize}px`)

    // 应用间距
    root.style.setProperty("--spacing-base", `${settings.spacing}px`)

    // 应用动画速度
    root.style.setProperty("--animation-duration", `${settings.animationSpeed}ms`)

    // 应用主题
    if (settings.theme !== "auto") {
      root.setAttribute("data-theme", settings.theme)
    }

    // 应用无障碍设置
    if (settings.reducedMotion) {
      root.style.setProperty("--animation-duration", "0ms")
    }

    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
  }, [settings])

  // 自动优化UX
  const runAutoOptimization = async () => {
    setIsOptimizing(true)

    // 模拟分析用户行为和设备特性
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 基于分析结果优化设置
    const optimizedSettings = {
      ...settings,
      fontSize: window.innerWidth < 768 ? 14 : 16,
      spacing: window.innerWidth < 768 ? 12 : 16,
      animationSpeed: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      highContrast: window.matchMedia("(prefers-contrast: high)").matches,
    }

    setSettings(optimizedSettings)
    setIsOptimizing(false)

    toast({
      title: "UX优化完成",
      description: "已根据您的设备和偏好自动优化用户体验",
    })
  }

  // 重置设置
  const resetSettings = () => {
    setSettings({
      theme: "auto",
      fontSize: 16,
      spacing: 16,
      animationSpeed: 300,
      colorContrast: 4.5,
      reducedMotion: false,
      highContrast: false,
      screenReader: false,
      keyboardNavigation: true,
      responsiveBreakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280,
      },
    })

    toast({
      title: "设置已重置",
      description: "所有UX设置已恢复默认值",
    })
  }

  // 获取设备图标
  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                用户体验优化中心
              </CardTitle>
              <CardDescription>智能优化界面设计、响应式布局和无障碍访问体验</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetSettings}>
                重置设置
              </Button>
              <Button onClick={runAutoOptimization} disabled={isOptimizing}>
                {isOptimizing ? "优化中..." : "自动优化"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 设置面板 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>UX设置面板</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="visual" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="visual">视觉设计</TabsTrigger>
                  <TabsTrigger value="responsive">响应式</TabsTrigger>
                  <TabsTrigger value="accessibility">无障碍</TabsTrigger>
                  <TabsTrigger value="performance">性能</TabsTrigger>
                </TabsList>

                <TabsContent value="visual" className="space-y-6">
                  {/* 主题设置 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {settings.theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      <span className="font-medium">主题模式</span>
                    </div>
                    <div className="flex gap-2">
                      {["light", "dark", "auto"].map((theme) => (
                        <Button
                          key={theme}
                          variant={settings.theme === theme ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSettings((prev) => ({ ...prev, theme: theme as any }))}
                        >
                          {theme === "light" ? "浅色" : theme === "dark" ? "深色" : "自动"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 字体大小 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        <span className="font-medium">字体大小</span>
                      </div>
                      <Badge variant="outline">{settings.fontSize}px</Badge>
                    </div>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => setSettings((prev) => ({ ...prev, fontSize: value }))}
                      min={12}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* 间距设置 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4" />
                        <span className="font-medium">元素间距</span>
                      </div>
                      <Badge variant="outline">{settings.spacing}px</Badge>
                    </div>
                    <Slider
                      value={[settings.spacing]}
                      onValueChange={([value]) => setSettings((prev) => ({ ...prev, spacing: value }))}
                      min={8}
                      max={32}
                      step={2}
                      className="w-full"
                    />
                  </div>

                  {/* 动画速度 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">动画速度</span>
                      </div>
                      <Badge variant="outline">{settings.animationSpeed}ms</Badge>
                    </div>
                    <Slider
                      value={[settings.animationSpeed]}
                      onValueChange={([value]) => setSettings((prev) => ({ ...prev, animationSpeed: value }))}
                      min={0}
                      max={1000}
                      step={50}
                      className="w-full"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="responsive" className="space-y-6">
                  {/* 设备预览 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span className="font-medium">设备预览</span>
                    </div>
                    <div className="flex gap-2">
                      {["mobile", "tablet", "desktop"].map((device) => (
                        <Button
                          key={device}
                          variant={previewDevice === device ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreviewDevice(device as any)}
                          className="flex items-center gap-2"
                        >
                          {getDeviceIcon(device)}
                          {device === "mobile" ? "手机" : device === "tablet" ? "平板" : "桌面"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 断点设置 */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">手机断点</span>
                        <Badge variant="outline">{settings.responsiveBreakpoints.mobile}px</Badge>
                      </div>
                      <Slider
                        value={[settings.responsiveBreakpoints.mobile]}
                        onValueChange={([value]) =>
                          setSettings((prev) => ({
                            ...prev,
                            responsiveBreakpoints: { ...prev.responsiveBreakpoints, mobile: value },
                          }))
                        }
                        min={320}
                        max={1024}
                        step={16}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">平板断点</span>
                        <Badge variant="outline">{settings.responsiveBreakpoints.tablet}px</Badge>
                      </div>
                      <Slider
                        value={[settings.responsiveBreakpoints.tablet]}
                        onValueChange={([value]) =>
                          setSettings((prev) => ({
                            ...prev,
                            responsiveBreakpoints: { ...prev.responsiveBreakpoints, tablet: value },
                          }))
                        }
                        min={768}
                        max={1440}
                        step={16}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">桌面断点</span>
                        <Badge variant="outline">{settings.responsiveBreakpoints.desktop}px</Badge>
                      </div>
                      <Slider
                        value={[settings.responsiveBreakpoints.desktop]}
                        onValueChange={([value]) =>
                          setSettings((prev) => ({
                            ...prev,
                            responsiveBreakpoints: { ...prev.responsiveBreakpoints, desktop: value },
                          }))
                        }
                        min={1024}
                        max={1920}
                        step={16}
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="accessibility" className="space-y-6">
                  {/* 无障碍开关 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium">高对比度模式</span>
                      </div>
                      <Switch
                        checked={settings.highContrast}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, highContrast: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">减少动画</span>
                      </div>
                      <Switch
                        checked={settings.reducedMotion}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, reducedMotion: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Accessibility className="h-4 w-4" />
                        <span className="font-medium">屏幕阅读器支持</span>
                      </div>
                      <Switch
                        checked={settings.screenReader}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, screenReader: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MousePointer className="h-4 w-4" />
                        <span className="font-medium">键盘导航</span>
                      </div>
                      <Switch
                        checked={settings.keyboardNavigation}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, keyboardNavigation: checked }))}
                      />
                    </div>
                  </div>

                  {/* 对比度设置 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">颜色对比度</span>
                      <Badge variant="outline">{settings.colorContrast.toFixed(1)}:1</Badge>
                    </div>
                    <Slider
                      value={[settings.colorContrast]}
                      onValueChange={([value]) => setSettings((prev) => ({ ...prev, colorContrast: value }))}
                      min={3}
                      max={21}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground">WCAG AA标准要求最低4.5:1，AAA标准要求最低7:1</div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">98</div>
                          <div className="text-sm text-muted-foreground">性能评分</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">95</div>
                          <div className="text-sm text-muted-foreground">无障碍评分</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">92</div>
                          <div className="text-sm text-muted-foreground">最佳实践</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">89</div>
                          <div className="text-sm text-muted-foreground">SEO评分</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 实时预览 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getDeviceIcon(previewDevice)}
                实时预览
              </CardTitle>
              <CardDescription>查看当前设置在不同设备上的效果</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border rounded-lg p-4 transition-all duration-300 ${
                  previewDevice === "mobile" ? "max-w-sm" : previewDevice === "tablet" ? "max-w-md" : "max-w-full"
                }`}
                style={{
                  fontSize: `${settings.fontSize}px`,
                  padding: `${settings.spacing}px`,
                  transition: `all ${settings.animationSpeed}ms ease`,
                }}
              >
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-primary/10 rounded"></div>
                    <div className="h-8 w-16 bg-secondary/10 rounded"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>优化建议</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">字体大小适中</div>
                  <div className="text-muted-foreground">当前设置符合可读性标准</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">建议启用高对比度</div>
                  <div className="text-muted-foreground">提升视觉障碍用户体验</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">响应式设计良好</div>
                  <div className="text-muted-foreground">断点设置合理，适配多设备</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
