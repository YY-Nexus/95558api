"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizedTags } from "@/components/organized-tags"

export default function ReactSnippetsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">React 代码片段</h1>
        <p className="text-muted-foreground mt-2">常用React代码片段和解决方案</p>
      </div>

      <Tabs defaultValue="hooks">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
          <TabsTrigger value="components">组件</TabsTrigger>
          <TabsTrigger value="state">状态管理</TabsTrigger>
          <TabsTrigger value="forms">表单处理</TabsTrigger>
          <TabsTrigger value="patterns">设计模式</TabsTrigger>
        </TabsList>

        <TabsContent value="hooks" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>useState</CardTitle>
                <CardDescription>React状态管理Hook</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { useState } from 'react';

function Counter() {
  // 声明一个名为"count"的状态变量，初始值为0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}

export default Counter;`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/react/use-state" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>useEffect</CardTitle>
                <CardDescription>React副作用Hook</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 定义异步函数
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('网络响应不正常');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    
    // 调用异步函数
    fetchData();
    
    // 清理函数
    return () => {
      // 在组件卸载时执行清理
      console.log('组件卸载，清理资源');
    };
  }, []); // 空依赖数组表示仅在组件挂载时执行一次
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!data) return <div>没有数据</div>;
  
  return (
    <div>
      <h2>数据:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/react/use-effect" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="components" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>函数组件</CardTitle>
                <CardDescription>React函数组件示例</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import React from 'react';

// 简单的函数组件
function Greeting({ name }) {
  return <h1>你好, {name}!</h1>;
}

// 带默认参数的函数组件
function UserProfile({ name = '访客', role = '用户', avatar }) {
  return (
    <div className="user-profile">
      <img 
        src={avatar || '/default-avatar.png'} 
        alt={name} 
        className="avatar"
      />
      <h2>{name}</h2>
      <p>角色: {role}</p>
    </div>
  );
}

// 使用组件
function App() {
  return (
    <div>
      <Greeting name="张三" />
      <UserProfile 
        name="李四" 
        role="管理员" 
        avatar="/avatars/lisi.jpg" 
      />
      <UserProfile /> {/* 使用默认值 */}
    </div>
  );
}

export default App;`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/react/functional-components" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>组件组合</CardTitle>
                <CardDescription>React组件组合模式</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import React from 'react';

// 卡片容器组件
function Card({ children, title, footer }) {
  return (
    <div className="card">
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// 按钮组件
function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button 
      className={\`btn btn-\${variant}\`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// 使用组合模式
function ProductCard({ product }) {
  return (
    <Card
      title={<h2>{product.name}</h2>}
      footer={
        <div className="actions">
          <Button variant="primary">购买</Button>
          <Button variant="secondary">加入购物车</Button>
        </div>
      }
    >
      <div className="product-details">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
        <p>{product.description}</p>
        <p className="price">¥{product.price}</p>
      </div>
    </Card>
  );
}

export default ProductCard;`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/react/component-composition" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 其他标签页内容类似 */}
      </Tabs>

      {/* 标签筛选 */}
      <OrganizedTags />
    </div>
  )
}
