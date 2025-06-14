"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, MessageSquare, Flag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

interface Comment {
  id: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  content: string
  createdAt: string
  likes: number
  dislikes: number
  replies: Comment[]
  isLiked?: boolean
  isDisliked?: boolean
}

interface CommentSectionProps {
  contentId: string
  contentType: "article" | "snippet" | "api" | "tool"
  initialComments?: Comment[]
}

export function CommentSection({ contentId, contentType, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  // 模拟当前用户
  const currentUser = {
    id: "current-user",
    name: "当前用户",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: currentUser,
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        replies: [],
        isLiked: false,
        isDisliked: false,
      }

      setComments((prev) => [newCommentObj, ...prev])
      setNewComment("")
    } catch (error) {
      console.error("提交评论失败", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newReply: Comment = {
        id: Date.now().toString(),
        user: currentUser,
        content: replyContent,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        replies: [],
        isLiked: false,
        isDisliked: false,
      }

      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            }
          }
          return comment
        }),
      )

      setReplyingTo(null)
      setReplyContent("")
    } catch (error) {
      console.error("提交回复失败", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply && parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                const wasLiked = reply.isLiked
                return {
                  ...reply,
                  likes: wasLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !wasLiked,
                  isDisliked: false,
                }
              }
              return reply
            }),
          }
        } else if (comment.id === commentId) {
          const wasLiked = comment.isLiked
          return {
            ...comment,
            likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !wasLiked,
            isDisliked: false,
          }
        }
        return comment
      }),
    )
  }

  const handleDislike = (commentId: string, isReply = false, parentId?: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply && parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                const wasDisliked = reply.isDisliked
                return {
                  ...reply,
                  dislikes: wasDisliked ? reply.dislikes - 1 : reply.dislikes + 1,
                  isDisliked: !wasDisliked,
                  isLiked: false,
                }
              }
              return reply
            }),
          }
        } else if (comment.id === commentId) {
          const wasDisliked = comment.isDisliked
          return {
            ...comment,
            dislikes: wasDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
            isDisliked: !wasDisliked,
            isLiked: false,
          }
        }
        return comment
      }),
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: zhCN })
    } catch (error) {
      return "未知时间"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">评论 ({comments.length})</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">排序方式:</span>
          <select className="text-sm bg-transparent border-none focus:outline-none">
            <option value="newest">最新</option>
            <option value="popular">最热</option>
          </select>
        </div>
      </div>

      {/* 评论输入框 */}
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="分享您的想法..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? "提交中..." : "发表评论"}
            </Button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="border-muted">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{comment.user.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Flag className="h-4 w-4" />
                    <span className="sr-only">举报</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{comment.content}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 h-8 px-2 ${comment.isLiked ? "text-blue-500" : ""}`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 h-8 px-2 ${comment.isDisliked ? "text-red-500" : ""}`}
                    onClick={() => handleDislike(comment.id)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{comment.dislikes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 h-8 px-2"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>回复</span>
                  </Button>
                </div>
              </CardFooter>

              {/* 回复输入框 */}
              {replyingTo === comment.id && (
                <div className="px-4 pb-4">
                  <div className="flex gap-2 items-start mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="回复评论..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px] resize-none text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyContent("")
                          }}
                        >
                          取消
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={isSubmitting || !replyContent.trim()}
                        >
                          回复
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 回复列表 */}
              {comment.replies.length > 0 && (
                <div className="px-4 pb-4 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="pl-6 border-l-2 border-muted">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-xs">{reply.user.name}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(reply.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mt-1 ml-8">{reply.content}</p>
                      <div className="flex items-center gap-4 mt-1 ml-8">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-1 h-6 px-2 text-xs ${reply.isLiked ? "text-blue-500" : ""}`}
                          onClick={() => handleLike(reply.id, true, comment.id)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{reply.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-1 h-6 px-2 text-xs ${
                            reply.isDisliked ? "text-red-500" : ""
                          }`}
                          onClick={() => handleDislike(reply.id, true, comment.id)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                          <span>{reply.dislikes}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="mt-2 text-muted-foreground">暂无评论，成为第一个评论的人吧！</p>
          </div>
        )}
      </div>
    </div>
  )
}
