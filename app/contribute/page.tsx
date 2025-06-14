"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContributionForm } from "@/components/community/contribution-form"

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState("article")

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">贡献内容</h1>
      <p className="text-muted-foreground mb-6">分享您的知识和经验，帮助其他开发者。您的贡献将在审核后发布。</p>

      <Tabs defaultValue="article" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="article">文章</TabsTrigger>
          <TabsTrigger value="snippet">代码片段</TabsTrigger>
          <TabsTrigger value="api">API文档</TabsTrigger>
          <TabsTrigger value="tool">工具</TabsTrigger>
        </TabsList>

        <TabsContent value="article">
          <ContributionForm contentType="article" />
        </TabsContent>

        <TabsContent value="snippet">
          <ContributionForm contentType="snippet" />
        </TabsContent>

        <TabsContent value="api">
          <ContributionForm contentType="api" />
        </TabsContent>

        <TabsContent value="tool">
          <ContributionForm contentType="tool" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
