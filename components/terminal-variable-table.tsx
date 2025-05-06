"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

// 终端变量接口定义 / Terminal variable interface definition
interface TerminalVariable {
  name: string // 变量名 / Variable name
  description: string // 描述 / Description
  command: string // 获取命令 / Command to get the variable
  example: string // 示例值 / Example value
  usage: string // 使用场景 / Usage scenario
}

interface TerminalVariableTableProps {
  variables: TerminalVariable[]
}

export function TerminalVariableTable({ variables }: TerminalVariableTableProps) {
  // 跟踪当前复制的索引 / Track the currently copied index
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // 复制到剪贴板的函数 / Function to copy to clipboard
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">变量名</TableHead>
            <TableHead>释义</TableHead>
            <TableHead>示例值</TableHead>
            <TableHead>常见用途</TableHead>
            <TableHead className="w-[100px]">命令</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono font-medium">{variable.name}</TableCell>
              <TableCell>{variable.description}</TableCell>
              <TableCell className="font-mono text-sm">{variable.example}</TableCell>
              <TableCell>{variable.usage}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(variable.command, index)}
                  className="h-8 w-8 p-0"
                >
                  {copiedIndex === index ? (
                    <span className="text-green-500 text-xs">已复制</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">复制命令</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
