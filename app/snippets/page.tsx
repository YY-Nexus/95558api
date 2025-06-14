"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { DynamicIcon } from "@/components/dynamic-icon"
import { snippetCategories } from "@/data/snippet-data"

export default function SnippetsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">代码片段库</h1>
        <p className="text-muted-foreground">实用的代码片段集合，帮助您快速解决常见开发问题</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧分类导航 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle>代码分类</CardTitle>
              <CardDescription>按语言和功能浏览代码片段</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                {snippetCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/snippets/${category.id}`}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <DynamicIcon name={category.icon} className="h-5 w-5 text-vibrant-cyan-500" />
                    <span>{category.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {category.snippets.length}
                    </Badge>
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* 右侧代码片段展示 */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
            </TabsList>

            {/* JavaScript 代码片段 */}
            <TabsContent value="javascript" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">JavaScript 代码片段</h2>
                <Button asChild variant="outline">
                  <Link href="/snippets/javascript">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* 防抖函数 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>防抖函数 (Debounce)</CardTitle>
                      <Badge>实用工具</Badge>
                    </div>
                    <CardDescription>限制函数的执行频率，防止函数在短时间内被多次调用</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{`/**
 * 防抖函数 - 延迟执行函数，如果在延迟时间内再次调用则重新计时
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 延迟时间(毫秒)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} - 包装后的函数
 */
function debounce(func, wait = 300, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}`}</code>
                    </pre>

                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="font-medium mb-2">使用示例</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 搜索输入防抖
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
  // 执行搜索操作
  searchApi(query);
}, 500);

// 监听输入事件
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">性能优化</Badge>
                    </div>
                    <Button asChild variant="default">
                      <Link href="/snippets/javascript/debounce">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* 节流函数 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>节流函数 (Throttle)</CardTitle>
                      <Badge>实用工具</Badge>
                    </div>
                    <CardDescription>限制函数在一定时间内只执行一次</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{`/**
 * 节流函数 - 限制函数在一定时间内只执行一次
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制(毫秒)
 * @returns {Function} - 包装后的函数
 */
function throttle(func, limit = 300) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}`}</code>
                    </pre>

                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="font-medium mb-2">使用示例</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`// 滚动事件节流
const throttledScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
  // 执行滚动相关操作
}, 200);

// 监听滚动事件
window.addEventListener('scroll', throttledScroll);`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">性能优化</Badge>
                    </div>
                    <Button asChild variant="default">
                      <Link href="/snippets/javascript/throttle">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* React 代码片段 */}
            <TabsContent value="react" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">React 代码片段</h2>
                <Button asChild variant="outline">
                  <Link href="/snippets/react">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {/* useLocalStorage Hook */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>useLocalStorage Hook</CardTitle>
                      <Badge>自定义Hook</Badge>
                    </div>
                    <CardDescription>在React组件中使用localStorage的自定义Hook</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{`import { useState, useEffect } from 'react';

/**
 * 使用localStorage的自定义Hook
 * @param {string} key - localStorage的键名
 * @param {any} initialValue - 初始值
 * @returns {[any, Function]} - 存储的值和更新函数
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 更新localStorage和状态
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`}</code>
                    </pre>

                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="font-medium mb-2">使用示例</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`import { useLocalStorage } from '../hooks/useLocalStorage';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button onClick={toggleTheme}>
      当前主题: {theme}
    </button>
  );
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">自定义Hook</Badge>
                    </div>
                    <Button asChild variant="default">
                      <Link href="/snippets/react/use-local-storage">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* CSS 代码片段 */}
            <TabsContent value="css" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">CSS 代码片段</h2>
                <Button asChild variant="outline">
                  <Link href="/snippets/css">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Flexbox 居中布局</CardTitle>
                      <Badge>布局</Badge>
                    </div>
                    <CardDescription>使用Flexbox实现完美的水平垂直居中</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{`.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 或者使用简写 */
.flex-center-short {
  display: flex;
  place-items: center;
  min-height: 100vh;
}`}</code>
                    </pre>
                  </CardContent>
                  <CardFooter className="pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">CSS</Badge>
                      <Badge variant="outline">布局</Badge>
                    </div>
                    <Button asChild variant="default">
                      <Link href="/snippets/css/flexbox-center">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* HTML 代码片段 */}
            <TabsContent value="html" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">HTML 代码片段</h2>
                <Button asChild variant="outline">
                  <Link href="/snippets/html">查看全部</Link>
                </Button>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>响应式图片</CardTitle>
                      <Badge>媒体</Badge>
                    </div>
                    <CardDescription>使用picture元素实现响应式图片</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{`<picture>
  <source media="(min-width: 768px)" srcset="large-image.jpg">
  <source media="(min-width: 480px)" srcset="medium-image.jpg">
  <img src="small-image.jpg" alt="响应式图片示例">
</picture>`}</code>
                    </pre>
                  </CardContent>
                  <CardFooter className="pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">HTML</Badge>
                      <Badge variant="outline">响应式</Badge>
                    </div>
                    <Button asChild variant="default">
                      <Link href="/snippets/html/responsive-image">查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
