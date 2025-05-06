"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

// 终端命令接口定义 / Terminal command interface definition
interface TerminalCommand {
  title: string // 标题 / Title
  description: string // 描述 / Description
  command: string // 命令 / Command
  example: string // 示例 / Example
  explanation: string // 解释 / Explanation
}

interface TerminalCommandCardProps {
  command: TerminalCommand
}

export function TerminalCommandCard({ command }: TerminalCommandCardProps) {
  // 跟踪复制状态 / Track copy state
  const [copied, setCopied] = useState(false)

  // 复制到剪贴板的函数 / Function to copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(command.command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{command.title}</CardTitle>
        <CardDescription>{command.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {/* 命令区域 / Command area */}
        <div className="bg-muted rounded-md p-3 font-mono text-sm relative group">
          <pre className="overflow-x-auto">{command.command}</pre>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
          >
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
        {/* 示例区域 / Example area */}
        <div>
          <h4 className="text-sm font-medium mb-1">示例:</h4>
          <div className="bg-muted rounded-md p-3 font-mono text-sm">
            <pre className="overflow-x-auto">{command.example}</pre>
          </div>
        </div>
        {/* 说明区域 / Explanation area */}
        <div>
          <h4 className="text-sm font-medium mb-1">说明:</h4>
          <p className="text-sm text-muted-foreground">{command.explanation}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={copyToClipboard}>
          {copied ? "已复制" : "复制命令"}
        </Button>
      </CardFooter>
    </Card>
  )
}
