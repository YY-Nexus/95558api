import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizedTags } from "@/components/organized-tags"

export default function CssSnippetsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">CSS 代码片段</h1>
        <p className="text-muted-foreground mt-2">常用CSS代码片段和解决方案</p>
      </div>

      <Tabs defaultValue="layout">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="layout">布局</TabsTrigger>
          <TabsTrigger value="animation">动画</TabsTrigger>
          <TabsTrigger value="responsive">响应式</TabsTrigger>
          <TabsTrigger value="effects">特效</TabsTrigger>
          <TabsTrigger value="utils">工具类</TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Flexbox布局</CardTitle>
                <CardDescription>弹性盒子布局</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`.flex-container {
  display: flex;
  flex-direction: row; /* 或 column */
  flex-wrap: wrap; /* 或 nowrap */
  justify-content: space-between; /* 主轴对齐方式 */
  align-items: center; /* 交叉轴对齐方式 */
  gap: 1rem; /* 项目之间的间距 */
}

.flex-item {
  flex: 1; /* 项目放大比例 */
  /* 或使用以下三个属性的组合 */
  flex-grow: 1; /* 放大比例 */
  flex-shrink: 1; /* 缩小比例 */
  flex-basis: auto; /* 初始大小 */
}`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/css/flexbox" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grid布局</CardTitle>
                <CardDescription>网格布局</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列等宽 */
  grid-template-rows: 100px 200px; /* 2行固定高度 */
  grid-gap: 1rem; /* 网格间距 */
  /* 或使用以下两个属性 */
  column-gap: 1rem; /* 列间距 */
  row-gap: 1rem; /* 行间距 */
}

.grid-item {
  grid-column: 1 / 3; /* 从第1列线到第3列线 */
  grid-row: 1 / 2; /* 从第1行线到第2行线 */
  /* 或使用以下简写 */
  grid-area: 1 / 1 / 2 / 3; /* 行开始/列开始/行结束/列结束 */
}`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/css/grid" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="animation" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CSS动画</CardTitle>
                <CardDescription>使用@keyframes创建动画</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`/* 定义动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* 应用动画 */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}

/* 动画属性 */
.animated-element {
  animation-name: fadeIn; /* 动画名称 */
  animation-duration: 1s; /* 动画持续时间 */
  animation-timing-function: ease-in-out; /* 动画速度曲线 */
  animation-delay: 0.5s; /* 动画延迟 */
  animation-iteration-count: infinite; /* 动画重复次数 */
  animation-direction: alternate; /* 动画方向 */
  animation-fill-mode: forwards; /* 动画结束后的状态 */
  animation-play-state: running; /* 动画播放状态 */
  
  /* 简写形式 */
  animation: fadeIn 1s ease-in-out 0.5s infinite alternate forwards;
}`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/css/animations" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSS过渡</CardTitle>
                <CardDescription>平滑的状态变化</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`.transition-element {
  /* 单个属性过渡 */
  transition-property: opacity; /* 过渡属性 */
  transition-duration: 0.3s; /* 过渡持续时间 */
  transition-timing-function: ease; /* 过渡速度曲线 */
  transition-delay: 0s; /* 过渡延迟 */
  
  /* 简写形式 */
  transition: opacity 0.3s ease 0s;
  
  /* 多个属性过渡 */
  transition: opacity 0.3s ease, transform 0.5s ease-out;
  
  /* 所有属性过渡 */
  transition: all 0.3s ease;
}

/* 悬停时改变状态 */
.transition-element:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

/* 常用过渡速度曲线 */
.linear { transition-timing-function: linear; }
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.custom { transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); }`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/css/transitions" className="text-primary hover:underline">
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
