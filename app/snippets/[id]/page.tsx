"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CommentSection } from "@/components/feedback/comment-section"
import { RatingSystem } from "@/components/feedback/rating-system"
import { CollectionButton } from "@/components/personalization/collection-button"
import { ShareButton } from "@/components/community/share-button"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface SnippetPageProps {
  params: {
    id: string
  }
}

export default function SnippetPage({ params }: SnippetPageProps) {
  const { id } = params
  const [activeTab, setActiveTab] = useState("code")
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  // 模拟代码片段数据
  const snippetData = {
    id,
    title: "useLocalStorage Hook",
    description: "一个用于管理localStorage的自定义React Hook",
    language: "typescript",
    category: "react",
    tags: ["React", "Hooks", "localStorage", "TypeScript"],
    code: `import { useState, useEffect } from 'react';

/**
 * 使用localStorage存储和管理状态的Hook
 * @param key localStorage键名
 * @param initialValue 初始值
 * @returns [存储的值, 设置值的函数, 重置值的函数]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 获取初始值
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  };

  // 状态管理
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // 设置值函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许函数式更新
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // 保存到state
      setStoredValue(valueToStore);
      
      // 保存到localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // 触发自定义事件，便于跨组件同步
        window.dispatchEvent(new Event('local-storage-change'));
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  // 重置函数
  const resetValue = () => {
    setValue(initialValue);
  };

  // 监听storage事件，保持跨标签页同步
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    // 监听自定义事件，保持同一页面内同步
    const handleCustomEvent = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-change', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change', handleCustomEvent);
    };
  }, [key]);

  return [storedValue, setValue, resetValue];
}`,
    usage: `import { useLocalStorage } from './useLocalStorage';

function App() {
  const [name, setName, resetName] = useLocalStorage('name', '');
  const [theme, setTheme, resetTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入您的名字"
      />
      <button onClick={resetName}>重置名字</button>
      
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          切换主题
        </button>
        <p>当前主题: {theme}</p>
      </div>
    </div>
  );
}`,
    explanation: `
## 功能说明

这个\`useLocalStorage\` Hook提供了一种简单的方式来使用localStorage持久化React组件的状态。它具有以下特点：

1. **类型安全**：使用TypeScript泛型确保类型安全
2. **函数式更新**：支持类似于React的setState的函数式更新
3. **跨标签页同步**：当localStorage在其他标签页中更改时，会自动同步状态
4. **错误处理**：包含完善的错误处理机制
5. **重置功能**：提供重置为初始值的功能

## 工作原理

1. 初始化时，Hook会尝试从localStorage读取值，如果不存在则使用提供的初始值
2. 当调用setValue时，新值会同时更新到React状态和localStorage
3. 通过监听storage事件，当其他标签页更改相同的localStorage项时，组件状态会自动更新
4. 通过自定义事件，确保同一页面内的多个组件使用相同的localStorage键时能保持同步

## 使用场景

- 用户偏好设置（如主题、语言等）
- 表单数据的临时保存
- 应用状态的持久化
- 用户会话信息的管理
`,
  }

  // 复制代码
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippetData.code)
      setIsCopied(true)

      toast({
        title: "代码已复制",
        description: "代码片段已复制到剪贴板",
      })

      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("复制失败", error)
      toast({
        title: "复制失败",
        description: "请手动复制代码",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 主内容区 */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{snippetData.title}</h1>
              <p className="text-muted-foreground mt-2">{snippetData.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <CollectionButton contentId={snippetData.id} contentType="snippet" contentTitle={snippetData.title} />
              <ShareButton contentId={snippetData.id} contentType="snippet" contentTitle={snippetData.title} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline">{snippetData.language}</Badge>
            {snippetData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="code" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger value="code">代码</TabsTrigger>
                  <TabsTrigger value="usage">使用示例</TabsTrigger>
                  <TabsTrigger value="explanation">说明</TabsTrigger>
                  <TabsTrigger value="comments">评论</TabsTrigger>
                </TabsList>
                <div className="p-6">
                  <TabsContent value="code" className="mt-0">
                    <div className="relative">
                      <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={handleCopyCode}>
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">复制代码</span>
                      </Button>
                      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                        <code>{snippetData.code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="usage" className="mt-0">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code>{snippetData.usage}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="explanation" className="mt-0">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: snippetData.explanation }} />
                    </div>
                  </TabsContent>
                  <TabsContent value="comments" className="mt-0">
                    <CommentSection contentId={snippetData.id} contentType="snippet" />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="w-full md:w-80 space-y-6">
          <RatingSystem contentId={snippetData.id} contentType="snippet" />

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">相关代码片段</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:underline">
                    useDebounce Hook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:underline">
                    useTheme Hook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:underline">
                    useMediaQuery Hook
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
