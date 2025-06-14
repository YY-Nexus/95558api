"use client"

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CollectionButtonProps {
  contentId: string
  contentType: "article" | "snippet" | "api" | "tool"
  contentTitle: string
}

export function CollectionButton({ contentId, contentType, contentTitle }: CollectionButtonProps) {
  const [isCollected, setIsCollected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 检查是否已收藏
  useEffect(() => {
    const collections = JSON.parse(localStorage.getItem("userCollections") || "[]")
    const isInCollection = collections.some((item: any) => item.id === contentId && item.type === contentType)
    setIsCollected(isInCollection)
  }, [contentId, contentType])

  const handleToggleCollection = async () => {
    setIsLoading(true)

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 300))

      // 获取当前收藏
      const collections = JSON.parse(localStorage.getItem("userCollections") || "[]")

      if (isCollected) {
        // 移除收藏
        const updatedCollections = collections.filter(
          (item: any) => !(item.id === contentId && item.type === contentType),
        )
        localStorage.setItem("userCollections", JSON.stringify(updatedCollections))
        setIsCollected(false)

        toast({
          title: "已取消收藏",
          description: `已从收藏夹中移除「${contentTitle}」`,
        })
      } else {
        // 添加收藏
        const newCollection = {
          id: contentId,
          type: contentType,
          title: contentTitle,
          addedAt: new Date().toISOString(),
        }
        const updatedCollections = [newCollection, ...collections]
        localStorage.setItem("userCollections", JSON.stringify(updatedCollections))
        setIsCollected(true)

        toast({
          title: "收藏成功",
          description: `已将「${contentTitle}」添加到收藏夹`,
        })
      }
    } catch (error) {
      console.error("收藏操作失败", error)
      toast({
        title: "操作失败",
        description: "请稍后再试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isCollected ? "default" : "outline"}
      size="sm"
      className={`flex items-center gap-1 ${isCollected ? "bg-primary text-primary-foreground" : ""}`}
      onClick={handleToggleCollection}
      disabled={isLoading}
    >
      <Bookmark className={`h-4 w-4 ${isCollected ? "fill-current" : ""}`} />
      <span>{isCollected ? "已收藏" : "收藏"}</span>
    </Button>
  )
}
