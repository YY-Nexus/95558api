"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface ContributionFormProps {
  contentType: "article" | "snippet" | "api" | "tool"
  onSuccess?: () => void
}

export function ContributionForm({ contentType, onSuccess }: ContributionFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // 获取内容类型名称
  const getContentTypeName = () => {
    switch (contentType) {
      case "article":
        return "文章"
      case "snippet":
        return "代码片段"
      case "api":
        return "API文档"
      case "tool":
        return "工具"
      default:
        return "内容"
    }
  }

  // 获取分类选项
  const getCategoryOptions = () => {
    switch (contentType) {
      case "article":
        return [
          { value: "tutorial", label: "教程" },
          { value: "guide", label: "指南" },
          { value: "case-study", label: "案例研究" },
          { value: "best-practice", label: "最佳实践" },
        ]
      case "snippet":
        return [
          { value: "javascript", label: "JavaScript" },
          { value: "react", label: "React" },
          { value: "css", label: "CSS" },
          { value: "html", label: "HTML" },
          { value: "typescript", label: "TypeScript" },
        ]
      case "api":
        return [
          { value: "auth", label: "认证与授权" },
          { value: "payment", label: "支付集成" },
          { value: "storage", label: "存储与数据库" },
          { value: "notification", label: "消息与通知" },
          { value: "map", label: "地图与位置" },
        ]
      case "tool":
        return [
          { value: "development", label: "开发工具" },
          { value: "design", label: "设计工具" },
          { value: "productivity", label: "生产力工具" },
          { value: "testing", label: "测试工具" },
        ]
      default:
        return []
    }
  }

  // 处理提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "请完善信息",
        description: "标题、内容和分类为必填项",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 处理标签
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      // 构建贡献数据
      const contributionData = {
        title,
        content,
        category,
        tags: tagArray,
        type: contentType,
        createdAt: new Date().toISOString(),
        status: "pending",
      }

      // 保存到本地存储（模拟）
      const contributions = JSON.parse(localStorage.getItem("userContributions") || "[]")
      localStorage.setItem("userContributions", JSON.stringify([contributionData, ...contributions]))

      toast({
        title: "提交成功",
        description: `您的${getContentTypeName()}已提交，等待审核`,
      })

      // 重置表单
      setTitle("")
      setContent("")
      setCategory("")
      setTags("")

      // 调用成功回调
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("提交失败", error)
      toast({
        title: "提交失败",
        description: "请稍后再试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>贡献{getContentTypeName()}</CardTitle>
        <CardDescription>分享您的知识和经验，帮助其他开发者</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              placeholder={`请输入${getContentTypeName()}标题`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">分类</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {getCategoryOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              placeholder={`请输入${getContentTypeName()}内容`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">标签</Label>
            <Input
              id="tags"
              placeholder="输入标签，用逗号分隔"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">例如: React, Hooks, 状态管理</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            保存草稿
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "提交贡献"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
