import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// 导入新的组织化标签组件
import { OrganizedTags } from "@/components/organized-tags"

export default function SnippetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">代码片段库</h1>
        <p className="text-muted-foreground mt-2">常用代码片段和解决方案</p>
      </div>

      <Tabs defaultValue="javascript">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>

        <TabsContent value="javascript" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>异步/等待函数</CardTitle>
                <CardDescription>使用async/await处理异步操作</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
    throw error;
  }
}`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/async" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数组操作</CardTitle>
                <CardDescription>常用的JavaScript数组方法</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`// 映射数组
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// doubled: [2, 4, 6, 8, 10]

// 过滤数组
const filtered = numbers.filter(num => num > 3);
// filtered: [4, 5]`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/javascript/array" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 其他标签页内容类似 */}
      </Tabs>

      {/* 替换原来的标签云组件 */}
      <OrganizedTags />
    </div>
  )
}
