"use client"

import { useState } from "react"
import { Share2, Copy, Check, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonProps {
  contentId: string
  contentType: "article" | "snippet" | "api" | "tool"
  contentTitle: string
}

export function ShareButton({ contentId, contentType, contentTitle }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  // 构建分享URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin
    return `${baseUrl}/${contentType}/${contentId}`
  }

  // 复制链接
  const handleCopyLink = async () => {
    const url = getShareUrl()

    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)

      toast({
        title: "链接已复制",
        description: "分享链接已复制到剪贴板",
      })

      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("复制失败", error)
      toast({
        title: "复制失败",
        description: "请手动复制链接",
        variant: "destructive",
      })
    }
  }

  // 分享到微信
  const handleShareToWeChat = () => {
    // 实际项目中可以使用微信SDK
    toast({
      title: "微信分享",
      description: "请使用微信扫描二维码分享",
    })
  }

  // 分享到微博
  const handleShareToWeibo = () => {
    const url = encodeURIComponent(getShareUrl())
    const title = encodeURIComponent(`我发现了一个很棒的${getContentTypeName()}: ${contentTitle}`)
    const weiboUrl = `http://service.weibo.com/share/share.php?url=${url}&title=${title}`
    window.open(weiboUrl, "_blank")
  }

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>分享</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyLink}>
          {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          复制链接
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareToWeChat}>
          <MessageSquare className="h-4 w-4 mr-2" />
          分享到微信
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareToWeibo}>
          <MessageSquare className="h-4 w-4 mr-2" />
          分享到微博
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
