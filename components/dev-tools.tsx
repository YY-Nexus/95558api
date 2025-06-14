"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Code, Hash, Key, Palette, Zap, Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DevTools() {
  const [activeTab, setActiveTab] = useState("json")
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // JSON格式化工具
  const [jsonInput, setJsonInput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [jsonMinify, setJsonMinify] = useState(false)

  // Base64编解码工具
  const [base64Input, setBase64Input] = useState("")
  const [base64Output, setBase64Output] = useState("")
  const [base64Mode, setBase64Mode] = useState<"encode" | "decode">("encode")

  // URL编解码工具
  const [urlInput, setUrlInput] = useState("")
  const [urlOutput, setUrlOutput] = useState("")
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode")

  // 哈希生成工具
  const [hashInput, setHashInput] = useState("")
  const [hashResults, setHashResults] = useState<Record<string, string>>({})

  // UUID生成工具
  const [uuidList, setUuidList] = useState<string[]>([])
  const [uuidCount, setUuidCount] = useState(5)

  // 颜色工具
  const [colorInput, setColorInput] = useState("#3b82f6")
  const [colorFormats, setColorFormats] = useState<Record<string, string>>({})

  // 复制到剪贴板
  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
      toast({
        title: "复制成功",
        description: "内容已复制到剪贴板",
      })
    } catch (error) {
      toast({
        title: "复制失败",
        description: "无法访问剪贴板",
        variant: "destructive",
      })
    }
  }

  // JSON格式化
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = jsonMinify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2)
      setJsonOutput(formatted)
    } catch (error) {
      setJsonOutput("JSON格式错误")
      toast({
        title: "JSON格式错误",
        description: "请检查输入的JSON格式",
        variant: "destructive",
      })
    }
  }

  // Base64编解码
  const processBase64 = () => {
    try {
      if (base64Mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(base64Input)))
        setBase64Output(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(base64Input)))
        setBase64Output(decoded)
      }
    } catch (error) {
      setBase64Output("处理失败")
      toast({
        title: "Base64处理失败",
        description: "请检查输入内容",
        variant: "destructive",
      })
    }
  }

  // URL编解码
  const processUrl = () => {
    try {
      if (urlMode === "encode") {
        const encoded = encodeURIComponent(urlInput)
        setUrlOutput(encoded)
      } else {
        const decoded = decodeURIComponent(urlInput)
        setUrlOutput(decoded)
      }
    } catch (error) {
      setUrlOutput("处理失败")
      toast({
        title: "URL处理失败",
        description: "请检查输入内容",
        variant: "destructive",
      })
    }
  }

  // 生成哈希
  const generateHashes = async () => {
    if (!hashInput.trim()) return

    const encoder = new TextEncoder()
    const data = encoder.encode(hashInput)

    try {
      // MD5 (使用Web Crypto API的替代方案)
      const md5Hash = await crypto.subtle.digest("SHA-1", data)
      const md5Hex = Array.from(new Uint8Array(md5Hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

      // SHA-256
      const sha256Hash = await crypto.subtle.digest("SHA-256", data)
      const sha256Hex = Array.from(new Uint8Array(sha256Hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

      // SHA-512
      const sha512Hash = await crypto.subtle.digest("SHA-512", data)
      const sha512Hex = Array.from(new Uint8Array(sha512Hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

      setHashResults({
        "SHA-1": md5Hex,
        "SHA-256": sha256Hex,
        "SHA-512": sha512Hex,
      })
    } catch (error) {
      toast({
        title: "哈希生成失败",
        description: "无法生成哈希值",
        variant: "destructive",
      })
    }
  }

  // 生成UUID
  const generateUUIDs = () => {
    const uuids = []
    for (let i = 0; i < uuidCount; i++) {
      uuids.push(crypto.randomUUID())
    }
    setUuidList(uuids)
  }

  // 颜色格式转换
  const convertColor = (hex: string) => {
    // 移除#号
    const cleanHex = hex.replace("#", "")

    // 转换为RGB
    const r = Number.parseInt(cleanHex.substr(0, 2), 16)
    const g = Number.parseInt(cleanHex.substr(2, 2), 16)
    const b = Number.parseInt(cleanHex.substr(4, 2), 16)

    // 转换为HSL
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const diff = max - min

    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

      switch (max) {
        case rNorm:
          h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6
          break
        case gNorm:
          h = ((bNorm - rNorm) / diff + 2) / 6
          break
        case bNorm:
          h = ((rNorm - gNorm) / diff + 4) / 6
          break
      }
    }

    setColorFormats({
      HEX: hex.toUpperCase(),
      RGB: `rgb(${r}, ${g}, ${b})`,
      RGBA: `rgba(${r}, ${g}, ${b}, 1)`,
      HSL: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      HSLA: `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 1)`,
    })
  }

  return (
    <div className="space-y-6">
      {/* 工具概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            开发工具集
          </CardTitle>
          <CardDescription>常用的开发和调试工具，提升开发效率</CardDescription>
        </CardHeader>
      </Card>

      {/* 工具标签页 */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="json">JSON工具</TabsTrigger>
              <TabsTrigger value="base64">Base64</TabsTrigger>
              <TabsTrigger value="url">URL编码</TabsTrigger>
              <TabsTrigger value="hash">哈希生成</TabsTrigger>
              <TabsTrigger value="uuid">UUID生成</TabsTrigger>
              <TabsTrigger value="color">颜色工具</TabsTrigger>
            </TabsList>

            <div className="p-6">
              {/* JSON格式化工具 */}
              <TabsContent value="json" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">JSON格式化工具</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="json-minify">压缩输出</Label>
                    <Switch id="json-minify" checked={jsonMinify} onCheckedChange={setJsonMinify} />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>输入JSON</Label>
                    <Textarea
                      placeholder="粘贴或输入JSON内容..."
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      className="min-h-[300px] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>格式化结果</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(jsonOutput, "json")}
                        disabled={!jsonOutput}
                      >
                        {copiedStates.json ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={jsonOutput}
                      readOnly
                      className="min-h-[300px] font-mono bg-muted"
                      placeholder="格式化后的JSON将显示在这里..."
                    />
                  </div>
                </div>
                <Button onClick={formatJson} className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  格式化JSON
                </Button>
              </TabsContent>

              {/* Base64编解码工具 */}
              <TabsContent value="base64" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Base64编解码工具</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={base64Mode === "encode" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBase64Mode("encode")}
                    >
                      编码
                    </Button>
                    <Button
                      variant={base64Mode === "decode" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBase64Mode("decode")}
                    >
                      解码
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>输入内容</Label>
                    <Textarea
                      placeholder={base64Mode === "encode" ? "输入要编码的文本..." : "输入要解码的Base64..."}
                      value={base64Input}
                      onChange={(e) => setBase64Input(e.target.value)}
                      className="min-h-[200px] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>处理结果</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(base64Output, "base64")}
                        disabled={!base64Output}
                      >
                        {copiedStates.base64 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={base64Output}
                      readOnly
                      className="min-h-[200px] font-mono bg-muted"
                      placeholder="处理结果将显示在这里..."
                    />
                  </div>
                </div>
                <Button onClick={processBase64} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {base64Mode === "encode" ? "编码" : "解码"}
                </Button>
              </TabsContent>

              {/* URL编解码工具 */}
              <TabsContent value="url" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">URL编解码工具</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={urlMode === "encode" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUrlMode("encode")}
                    >
                      编码
                    </Button>
                    <Button
                      variant={urlMode === "decode" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUrlMode("decode")}
                    >
                      解码
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>输入URL</Label>
                    <Input
                      placeholder={urlMode === "encode" ? "输入要编码的URL..." : "输入要解码的URL..."}
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>处理结果</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(urlOutput, "url")}
                        disabled={!urlOutput}
                      >
                        {copiedStates.url ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Input
                      value={urlOutput}
                      readOnly
                      className="font-mono bg-muted"
                      placeholder="处理结果将显示在这里..."
                    />
                  </div>
                </div>
                <Button onClick={processUrl} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {urlMode === "encode" ? "编码" : "解码"}
                </Button>
              </TabsContent>

              {/* 哈希生成工具 */}
              <TabsContent value="hash" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">哈希生成工具</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>输入文本</Label>
                    <Textarea
                      placeholder="输入要生成哈希的文本..."
                      value={hashInput}
                      onChange={(e) => setHashInput(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button onClick={generateHashes} className="w-full">
                    <Hash className="h-4 w-4 mr-2" />
                    生成哈希值
                  </Button>
                  {Object.keys(hashResults).length > 0 && (
                    <div className="space-y-3">
                      {Object.entries(hashResults).map(([algorithm, hash]) => (
                        <div key={algorithm} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>{algorithm}</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(hash, `hash-${algorithm}`)}
                            >
                              {copiedStates[`hash-${algorithm}`] ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <Input value={hash} readOnly className="font-mono bg-muted text-xs" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* UUID生成工具 */}
              <TabsContent value="uuid" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">UUID生成工具</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="space-y-2">
                      <Label>生成数量</Label>
                      <Input
                        type="number"
                        min="1"
                        max="50"
                        value={uuidCount}
                        onChange={(e) => setUuidCount(Number.parseInt(e.target.value) || 1)}
                        className="w-24"
                      />
                    </div>
                    <Button onClick={generateUUIDs} className="mt-6">
                      <Key className="h-4 w-4 mr-2" />
                      生成UUID
                    </Button>
                  </div>
                  {uuidList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>生成的UUID</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(uuidList.join("\n"), "uuid-list")}
                        >
                          {copiedStates["uuid-list"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          复制全部
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {uuidList.map((uuid, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input value={uuid} readOnly className="font-mono bg-muted" />
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(uuid, `uuid-${index}`)}>
                              {copiedStates[`uuid-${index}`] ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 颜色工具 */}
              <TabsContent value="color" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">颜色格式转换工具</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="space-y-2">
                      <Label>选择颜色</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={colorInput}
                          onChange={(e) => setColorInput(e.target.value)}
                          className="w-12 h-10 rounded border"
                        />
                        <Input
                          value={colorInput}
                          onChange={(e) => setColorInput(e.target.value)}
                          className="w-32 font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <Button onClick={() => convertColor(colorInput)} className="mt-6">
                      <Palette className="h-4 w-4 mr-2" />
                      转换格式
                    </Button>
                  </div>
                  {Object.keys(colorFormats).length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(colorFormats).map(([format, value]) => (
                        <div key={format} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>{format}</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(value, `color-${format}`)}
                            >
                              {copiedStates[`color-${format}`] ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: format === "HEX" ? value : colorInput }}
                            />
                            <Input value={value} readOnly className="font-mono bg-muted" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
