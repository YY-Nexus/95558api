"use client"

// 简化的内存数据库
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  provider: string
}

export interface Article {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface Snippet {
  id: string
  title: string
  code: string
  language: string
  description: string
  author: string
  createdAt: string
  likes: number
  tags: string[]
}

export interface Tool {
  id: string
  name: string
  description: string
  url: string
  category: string
  tags: string[]
}

// 内存数据存储
const users: User[] = [
  {
    id: "admin",
    name: "管理员",
    email: "admin@example.com",
    role: "admin",
    provider: "local",
  },
]

const articles: Article[] = [
  {
    id: "1",
    title: "API集成指南",
    content: "这是一篇关于API集成的详细指南...",
    author: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["API", "集成", "指南"],
  },
]

const snippets: Snippet[] = [
  {
    id: "1",
    title: "React Hooks示例",
    code: "const [state, setState] = useState(initialState);",
    language: "javascript",
    description: "React useState Hook的基本用法",
    author: "admin",
    createdAt: new Date().toISOString(),
    likes: 5,
    tags: ["React", "Hooks", "JavaScript"],
  },
]

const tools: Tool[] = [
  {
    id: "1",
    name: "VS Code",
    description: "强大的代码编辑器",
    url: "https://code.visualstudio.com",
    category: "编辑器",
    tags: ["编辑器", "开发工具"],
  },
]

// 数据库操作
export const db = {
  // 用户操作
  getUserById: (id: string) => users.find((user) => user.id === id) || null,
  getUserByEmail: (email: string) => users.find((user) => user.email === email) || null,
  createUser: (user: Omit<User, "id">) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newUser = { ...user, id }
    users.push(newUser)
    return newUser
  },

  // 文章操作
  getArticles: () => articles,
  getArticleById: (id: string) => articles.find((article) => article.id === id) || null,
  createArticle: (article: Omit<Article, "id" | "createdAt" | "updatedAt">) => {
    const id = Math.random().toString(36).substring(2, 15)
    const now = new Date().toISOString()
    const newArticle = { ...article, id, createdAt: now, updatedAt: now }
    articles.push(newArticle)
    return newArticle
  },
  updateArticle: (id: string, data: Partial<Omit<Article, "id" | "createdAt">>) => {
    const index = articles.findIndex((article) => article.id === id)
    if (index === -1) return null
    articles[index] = { ...articles[index], ...data, updatedAt: new Date().toISOString() }
    return articles[index]
  },
  deleteArticle: (id: string) => {
    const index = articles.findIndex((article) => article.id === id)
    if (index === -1) return false
    articles.splice(index, 1)
    return true
  },

  // 代码片段操作
  getSnippets: () => snippets,
  getSnippetById: (id: string) => snippets.find((snippet) => snippet.id === id) || null,
  createSnippet: (snippet: Omit<Snippet, "id" | "createdAt" | "likes">) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newSnippet = { ...snippet, id, createdAt: new Date().toISOString(), likes: 0 }
    snippets.push(newSnippet)
    return newSnippet
  },
  updateSnippet: (id: string, data: Partial<Omit<Snippet, "id" | "createdAt">>) => {
    const index = snippets.findIndex((snippet) => snippet.id === id)
    if (index === -1) return null
    snippets[index] = { ...snippets[index], ...data }
    return snippets[index]
  },
  deleteSnippet: (id: string) => {
    const index = snippets.findIndex((snippet) => snippet.id === id)
    if (index === -1) return false
    snippets.splice(index, 1)
    return true
  },
  likeSnippet: (id: string) => {
    const snippet = snippets.find((snippet) => snippet.id === id)
    if (!snippet) return null
    snippet.likes += 1
    return snippet
  },

  // 工具操作
  getTools: () => tools,
  getToolById: (id: string) => tools.find((tool) => tool.id === id) || null,
  createTool: (tool: Omit<Tool, "id">) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newTool = { ...tool, id }
    tools.push(newTool)
    return newTool
  },
  updateTool: (id: string, data: Partial<Omit<Tool, "id">>) => {
    const index = tools.findIndex((tool) => tool.id === id)
    if (index === -1) return null
    tools[index] = { ...tools[index], ...data }
    return tools[index]
  },
  deleteTool: (id: string) => {
    const index = tools.findIndex((tool) => tool.id === id)
    if (index === -1) return false
    tools.splice(index, 1)
    return true
  },
}

// 数据库管理类
export class Database {
  private static instance: Database

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // 初始化数据库连接
  async initialize() {
    console.log("数据库初始化完成")
    return true
  }

  // 执行查询
  async query(sql: string, params?: any[]) {
    console.log("执行查询:", sql, params)
    return { success: true, data: [] }
  }

  // 事务处理
  async transaction(callback: () => Promise<any>) {
    try {
      const result = await callback()
      console.log("事务提交成功")
      return result
    } catch (error) {
      console.error("事务回滚:", error)
      throw error
    }
  }

  // 关闭连接
  async close() {
    console.log("数据库连接已关闭")
  }
}
