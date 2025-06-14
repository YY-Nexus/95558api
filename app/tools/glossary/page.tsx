"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // 术语数据
  const glossaryItems = [
    {
      term: "API",
      english: "Application Programming Interface",
      chinese: "应用程序接口",
      description: "允许不同软件应用程序相互通信的接口或协议。",
    },
    {
      term: "AJAX",
      english: "Asynchronous JavaScript and XML",
      chinese: "异步JavaScript和XML",
      description: "一种使用现有标准的客户端技术，用于创建异步Web应用程序。",
    },
    {
      term: "CDN",
      english: "Content Delivery Network",
      chinese: "内容分发网络",
      description: "一种分布式服务器系统，根据用户的地理位置分发内容，提高加载速度。",
    },
    {
      term: "CI/CD",
      english: "Continuous Integration/Continuous Deployment",
      chinese: "持续集成/持续部署",
      description: "一种软件开发实践，团队成员频繁地将代码集成到共享存储库中，并自动部署到生产环境。",
    },
    {
      term: "DOM",
      english: "Document Object Model",
      chinese: "文档对象模型",
      description: "一种跨平台和语言无关的接口，允许程序和脚本动态访问和更新文档的内容、结构和样式。",
    },
    {
      term: "ES6",
      english: "ECMAScript 2015",
      chinese: "ECMAScript 2015",
      description: "JavaScript语言的第6版标准，引入了许多新特性，如箭头函数、类、模块等。",
    },
    {
      term: "IIFE",
      english: "Immediately Invoked Function Expression",
      chinese: "立即调用函数表达式",
      description: "一种JavaScript设计模式，创建一个函数并立即执行它，用于创建私有作用域。",
    },
    {
      term: "JWT",
      english: "JSON Web Token",
      chinese: "JSON网络令牌",
      description: "一种开放标准，用于在各方之间安全地传输信息，可用于身份验证和信息交换。",
    },
    {
      term: "ORM",
      english: "Object-Relational Mapping",
      chinese: "对象关系映射",
      description: "一种编程技术，用于在不兼容的类型系统之间转换数据，特别是在关系型数据库和面向对象编程语言之间。",
    },
    {
      term: "PWA",
      english: "Progressive Web Application",
      chinese: "渐进式网络应用",
      description: "一种使用现代Web技术创建的应用程序，可在任何设备上提供类似应用的体验。",
    },
    {
      term: "REST",
      english: "Representational State Transfer",
      chinese: "表现层状态转换",
      description: "一种软件架构风格，定义了一组创建Web服务的约束，使系统具有良好的性能、可扩展性和简单性。",
    },
    {
      term: "SPA",
      english: "Single Page Application",
      chinese: "单页应用",
      description: "一种Web应用或网站，通过动态重写当前页面而不是从服务器加载整个新页面来与用户交互。",
    },
    {
      term: "SSR",
      english: "Server-Side Rendering",
      chinese: "服务器端渲染",
      description: "在服务器上渲染网页，然后将完全渲染的页面发送到客户端，提高首次加载性能和SEO。",
    },
    {
      term: "CORS",
      english: "Cross-Origin Resource Sharing",
      chinese: "跨源资源共享",
      description: "一种HTTP头机制，允许服务器指定除自己以外的其他源（域、协议或端口），浏览器可以从这些源加载资源。",
    },
    {
      term: "XSS",
      english: "Cross-Site Scripting",
      chinese: "跨站脚本攻击",
      description: "一种安全漏洞，攻击者可以将恶意脚本注入到网页中，当其他用户浏览该页面时执行。",
    },
  ]

  // 根据搜索词过滤术语
  const filteredItems = glossaryItems.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.chinese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">开发术语表</h1>
        <p className="text-muted-foreground mt-2">常用开发术语中英文对照和解释</p>
      </div>

      <div className="relative max-w-md mx-auto mb-8">
        <Input
          type="search"
          placeholder="搜索术语..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.term} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex justify-between items-start">
                <span>{item.term}</span>
                <span className="text-xs px-2 py-1 bg-blue-accent-100 text-blue-accent-800 rounded-full">
                  {item.term.length <= 4 ? item.term : item.term.substring(0, 4)}
                </span>
              </CardTitle>
              <CardDescription>
                {item.english} / {item.chinese}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">���有找到匹配的术语</p>
        </div>
      )}
    </div>
  )
}
