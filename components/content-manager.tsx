"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Eye, Heart, Calendar, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  category: string
  tags: string[]
  author: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  viewCount: number
}

interface CodeSnippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
  tags: string[]
  author: string
  likes: number
  createdAt: Date
  updatedAt: Date
}

interface ContentManagerProps {
  type: "articles" | "snippets"
  userRole?: "admin" | "user"
}

export function ContentManager({ type, userRole = "user" }: ContentManagerProps) {
  const [items, setItems] = useState<(Article | CodeSnippet)[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Article | CodeSnippet | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    fetchItems()
  }, [type, searchTerm, selectedCategory])

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (selectedCategory) params.append("category", selectedCategory)

      const response = await fetch(`/api/${type}?${params}`)
      const data = await response.json()

      if (data.success) {
        setItems(data.data)
      } else {
        toast({
          title: "获取数据失败",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "网络错误",
        description: "无法连接到服务器",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (formData: FormData) => {
    try {
      const itemData = Object.fromEntries(formData.entries())

      // 处理标签数组
      if (itemData.tags) {
        itemData.tags = (itemData.tags as string)
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      }

      const url = editingItem ? `/api/${type}/${editingItem.id}` : `/api/${type}`
      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: editingItem ? "更新成功" : "创建成功",
          description: data.message,
        })
        setIsDialogOpen(false)
        setEditingItem(null)
        fetchItems()
      } else {
        toast({
          title: "操作失败",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "网络错误",
        description: "操作失败，请重试",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这个项目吗？此操作不可撤销。")) return

    try {
      const response = await fetch(`/api/${type}/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "删除成功",
          description: data.message,
        })
        fetchItems()
      } else {
        toast({
          title: "删除失败",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "网络错误",
        description: "删除失败，请重试",
        variant: "destructive",
      })
    }
  }

  const handleLike = async (id: string) => {
    if (type !== "snippets") return

    try {
      const response = await fetch(`/api/snippets/${id}/like`, {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "点赞成功",
          description: "感谢您的支持！",
        })
        fetchItems()
      }
    } catch (error) {
      toast({
        title: "点赞失败",
        description: "请稍后再试",
        variant: "destructive",
      })
    }
  }

  const categories =
    type === "articles"
      ? ["frontend", "backend", "fullstack", "devops", "design"]
      : ["utils", "components", "hooks", "algorithms", "patterns"]

  const languages = ["javascript", "typescript", "python", "java", "go", "rust", "css", "html"]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder={`搜索${type === "articles" ? "文章" : "代码片段"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="选择分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部分类</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {userRole === "admin" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="h-4 w-4 mr-2" />
                新建{type === "articles" ? "文章" : "代码片段"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "编辑" : "新建"}
                  {type === "articles" ? "文章" : "代码片段"}
                </DialogTitle>
                <DialogDescription>
                  填写下面的信息来{editingItem ? "更新" : "创建"}
                  {type === "articles" ? "文章" : "代码片段"}
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSave(new FormData(e.currentTarget))
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">标题</Label>
                    <Input id="title" name="title" defaultValue={editingItem?.title || ""} required />
                  </div>

                  {type === "articles" ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="excerpt">摘要</Label>
                        <Textarea
                          id="excerpt"
                          name="excerpt"
                          defaultValue={(editingItem as Article)?.excerpt || ""}
                          rows={3}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="slug">URL别名</Label>
                        <Input
                          id="slug"
                          name="slug"
                          defaultValue={(editingItem as Article)?.slug || ""}
                          placeholder="url-friendly-name"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">内容</Label>
                        <Textarea
                          id="content"
                          name="content"
                          defaultValue={editingItem?.content || ""}
                          rows={10}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          name="published"
                          defaultChecked={(editingItem as Article)?.published || false}
                        />
                        <Label htmlFor="published">发布文章</Label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="description">描述</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={(editingItem as CodeSnippet)?.description || ""}
                          rows={3}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="language">编程语言</Label>
                        <Select name="language" defaultValue={(editingItem as CodeSnippet)?.language || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="选择编程语言" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((lang) => (
                              <SelectItem key={lang} value={lang}>
                                {lang}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="code">代码</Label>
                        <Textarea
                          id="code"
                          name="code"
                          defaultValue={(editingItem as CodeSnippet)?.code || ""}
                          rows={10}
                          className="font-mono"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="category">分类</Label>
                    <Select name="category" defaultValue={editingItem?.category || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="tags">标签</Label>
                    <Input
                      id="tags"
                      name="tags"
                      defaultValue={editingItem?.tags?.join(", ") || ""}
                      placeholder="用逗号分隔多个标签"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    取消
                  </Button>
                  <Button type="submit">{editingItem ? "更新" : "创建"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* 内容列表 */}
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {type === "articles" ? (item as Article).excerpt : (item as CodeSnippet).description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                    {type === "snippets" && <Badge variant="outline">{(item as CodeSnippet).language}</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {type === "snippets" && (
                    <Button variant="ghost" size="sm" onClick={() => handleLike(item.id)}>
                      <Heart className="h-4 w-4 mr-1" />
                      {(item as CodeSnippet).likes}
                    </Button>
                  )}
                  {type === "articles" && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {(item as Article).viewCount}
                    </div>
                  )}
                  {userRole === "admin" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(item)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {item.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                {type === "articles" && (item as Article).published && <Badge variant="default">已发布</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无{type === "articles" ? "文章" : "代码片段"}</p>
        </div>
      )}
    </div>
  )
}
