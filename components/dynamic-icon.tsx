import {
  ArrowRight,
  Code,
  BookOpen,
  PenToolIcon as Tool,
  Search,
  Settings,
  Home,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Github,
  Terminal,
  Database,
  CreditCard,
  Bell,
  Map,
  FileCode,
  Cpu,
  type LightbulbIcon as LucideProps,
  type LucideIcon,
} from "lucide-react"

// 图标映射
const icons: Record<string, LucideIcon> = {
  "arrow-right": ArrowRight,
  code: Code,
  book: BookOpen,
  tool: Tool,
  search: Search,
  settings: Settings,
  home: Home,
  menu: Menu,
  close: X,
  moon: Moon,
  sun: Sun,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  user: User,
  logout: LogOut,
  github: Github,
  terminal: Terminal,
  database: Database,
  "credit-card": CreditCard,
  bell: Bell,
  map: Map,
  "file-code": FileCode,
  api: Cpu,
}

interface DynamicIconProps extends LucideProps {
  name: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = icons[name] || icons["code"]
  return <IconComponent {...props} />
}
