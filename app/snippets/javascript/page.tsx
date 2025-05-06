import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizedTags } from "@/components/organized-tags"

export default function JavaScriptSnippetsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">JavaScript 代码片段</h1>
        <p className="text-muted-foreground mt-2">常用JavaScript代码片段和解决方案</p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basics">基础</TabsTrigger>
          <TabsTrigger value="array">数组操作</TabsTrigger>
          <TabsTrigger value="async">异步处理</TabsTrigger>
          <TabsTrigger value="dom">DOM操作</TabsTrigger>
          <TabsTrigger value="utils">工具函数</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>变量声明</CardTitle>
                <CardDescription>JavaScript中的变量声明方式</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 使用let声明变量（推荐）
let count = 0;
count = 1; // 可以重新赋值

// 使用const声明常量（推荐）
const PI = 3.14159;
// PI = 3; // 错误：常量不能重新赋值

// 使用var声明变量（不推荐）
var name = "John";
name = "Jane"; // 可以重新赋值`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/variables" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数据类型</CardTitle>
                <CardDescription>JavaScript的基本数据类型</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 原始类型
const num = 42;           // 数字
const text = "Hello";     // 字符串
const isActive = true;    // 布尔值
const nothing = null;     // 空值
let undefined_var;        // undefined
const uniqueId = Symbol('id'); // Symbol

// 引用类型
const obj = { name: "John", age: 30 }; // 对象
const arr = [1, 2, 3, 4];              // 数组
const func = function() { return 42; }; // 函数`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/data-types" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="array" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>数组映射</CardTitle>
                <CardDescription>使用map()方法转换数组</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 将数字数组中的每个元素翻倍
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// doubled: [2, 4, 6, 8, 10]

// 从对象数组中提取特定属性
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 }
];
const names = users.map(user => user.name);
// names: ["Alice", "Bob", "Charlie"]`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/array-map" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数组过滤</CardTitle>
                <CardDescription>使用filter()方法筛选数组</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 过滤出大于3的数字
const numbers = [1, 2, 3, 4, 5];
const filtered = numbers.filter(num => num > 3);
// filtered: [4, 5]

// 过滤出年龄大于等于30的用户
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 }
];
const adults = users.filter(user => user.age >= 30);
// adults: [{ id: 2, name: "Bob", age: 30 }, { id: 3, name: "Charlie", age: 35 }]`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/array-filter" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="async" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Promise</CardTitle>
                <CardDescription>使用Promise处理异步操作</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 创建一个Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
      const data = { id: 1, name: "Product" };
      // 成功时调用resolve
      resolve(data);
      // 失败时调用reject
      // reject(new Error('Failed to fetch data'));
    }, 1000);
  });
};

// 使用Promise
fetchData()
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Operation completed');
  });`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/promise" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Async/Await</CardTitle>
                <CardDescription>使用async/await简化异步代码</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 使用async/await处理异步操作
async function fetchUserData(userId) {
  try {
    // 等待Promise完成
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    // 如果响应不成功，抛出错误
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // 解析JSON响应
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}

// 调用异步函数
async function displayUser() {
  try {
    const user = await fetchUserData(123);
    console.log('用户数据:', user);
  } catch (error) {
    console.error('显示用户失败:', error);
  }
}`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/async-await" className="text-primary hover:underline">
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
