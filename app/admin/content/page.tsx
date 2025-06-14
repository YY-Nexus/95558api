"use client"

import { ContentManager } from "@/components/content-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminContentPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">内容管理</h1>
        <p className="text-muted-foreground mt-2">管理文章、代码片段和工具</p>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">文章管理</TabsTrigger>
          <TabsTrigger value="snippets">代码片段管理</TabsTrigger>
          <TabsTrigger value="tools">工具管理</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <ContentManager type="articles" userRole="admin" />
        </TabsContent>

        <TabsContent value="snippets">
          <ContentManager type="snippets" userRole="admin" />
        </TabsContent>

        <TabsContent value="tools">
          <div className="text-center py-12">
            <p className="text-muted-foreground">工具管理功能开发中...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
