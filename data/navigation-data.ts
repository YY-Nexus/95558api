// 导航数据结构 / Navigation data structure
export type NavItem = {
  title: string
  href?: string
  icon?: string
  children?: NavItem[]
}

// 主要分类数据 / Main category data
export const mainCategories: NavItem[] = [
  {
    title: "前端开发",
    icon: "Code",
    children: [
      { title: "JavaScript", href: "/frontend/javascript" },
      { title: "React", href: "/frontend/react" },
      { title: "CSS", href: "/frontend/css" },
      { title: "HTML", href: "/frontend/html" },
    ],
  },
  {
    title: "后端开发", // Backend development
    icon: "Server",
    children: [
      { title: "Node.js", href: "/backend/nodejs" },
      { title: "Python", href: "/backend/python" },
      { title: "Java", href: "/backend/java" },
      { title: "Go", href: "/backend/go" },
    ],
  },
  {
    title: "数据库与存储", // Database and storage
    icon: "Database",
    children: [
      { title: "SQL", href: "/database/sql" },
      { title: "NoSQL", href: "/database/nosql" },
      { title: "缓存", href: "/database/cache" }, // Cache
    ],
  },
  {
    title: "开发工具与环境", // Development tools and environment
    icon: "Wrench",
    children: [
      { title: "VS Code", href: "/tools/vscode" },
      { title: "Git", href: "/tools/git" },
      { title: "Docker", href: "/tools/docker" },
    ],
  },
  {
    title: "API 集成库", // API integration library
    icon: "Puzzle",
    children: [
      { title: "认证与授权", href: "/api/auth" }, // Authentication and authorization
      { title: "支付集成", href: "/api/payment" }, // Payment integration
      { title: "存储与数据库", href: "/api/storage" }, // Storage and database
      { title: "消息与通知", href: "/api/notification" }, // Messages and notifications
      { title: "地图与位置", href: "/api/map" }, // Maps and location
    ],
  },
  {
    title: "代码片段库", // Code snippet library
    icon: "FileCode",
    children: [
      { title: "JavaScript", href: "/snippets/javascript" },
      { title: "React", href: "/snippets/react" },
      { title: "CSS", href: "/snippets/css" },
      { title: "HTML", href: "/snippets/html" },
    ],
  },
  {
    title: "DevOps与SRE",
    icon: "Workflow",
    children: [
      { title: "CI/CD", href: "/devops/cicd" },
      { title: "监控", href: "/devops/monitoring" }, // Monitoring
      { title: "容器化", href: "/devops/containerization" }, // Containerization
    ],
  },
  {
    title: "人工智能与机器学习", // Artificial Intelligence and Machine Learning
    icon: "Brain",
    children: [
      { title: "深度学习", href: "/ai/deep-learning" }, // Deep Learning
      { title: "自然语言处理", href: "/ai/nlp" }, // Natural Language Processing
      { title: "计算机视觉", href: "/ai/computer-vision" }, // Computer Vision
    ],
  },
]

// 标签数据 / Tag data
export const tags = [
  "api",
  "array",
  "async",
  "context",
  "css",
  "destructuring",
  "fetch",
  "filter",
  "flexbox",
  "form",
  "grid",
  "hooks",
  "html",
  "html5",
  "layout",
  "localStorage",
  "map",
  "merge",
  "object",
  "promise",
  "react",
  "reduce",
  "sessionStorage",
  "state-management",
  "storage",
  "template",
  "validation",
]

// 底部导航项 / Bottom navigation items
export const bottomNavItems = [
  { title: "首页", href: "/", icon: "Home" }, // Home
  { title: "API", href: "/api", icon: "Puzzle" },
  { title: "代码", href: "/snippets", icon: "FileCode" }, // Code
  { title: "工具", href: "/tools", icon: "Wrench" }, // Tools
  { title: "设置", href: "/settings", icon: "Settings" }, // Settings
]

// 路径到友好名称的映射，用于面包屑导航
export const navPathMap: Record<string, string> = {
  "/api": "API集成库",
  "/api/auth": "认证与授权",
  "/api/payment": "支付集成",
  "/api/storage": "存储与数据库",
  "/api/notification": "消息与通知",
  "/api/map": "地图与位置",

  "/snippets": "代码片段库",
  "/snippets/javascript": "JavaScript",
  "/snippets/react": "React",
  "/snippets/css": "CSS",
  "/snippets/html": "HTML",

  "/tools": "开发工具",
  "/tools/vscode": "VS Code",
  "/tools/git": "Git",
  "/tools/docker": "Docker",
  "/tools/terminal": "终端命令",
  "/tools/terminal/variables": "终端变量",
  "/tools/terminal/basics": "基础命令",
  "/tools/glossary": "术语表",

  "/settings": "设置",
  "/about": "关于",
  "/about/brand": "品牌说明",

  "/frontend": "前端开发",
  "/frontend/javascript": "JavaScript",
  "/frontend/react": "React",
  "/frontend/css": "CSS",
  "/frontend/html": "HTML",

  "/backend": "后端开发",
  "/backend/nodejs": "Node.js",
  "/backend/python": "Python",
  "/backend/java": "Java",
  "/backend/go": "Go",

  "/database": "数据库与存储",
  "/database/sql": "SQL",
  "/database/nosql": "NoSQL",
  "/database/cache": "缓存",

  "/devops": "DevOps与SRE",
  "/devops/cicd": "CI/CD",
  "/devops/monitoring": "监控",
  "/devops/containerization": "容器化",

  "/ai": "人工智能与机器学习",
  "/ai/deep-learning": "深度学习",
  "/ai/nlp": "自然语言处理",
  "/ai/computer-vision": "计算机视觉",
}
