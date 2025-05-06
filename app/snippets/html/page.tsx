import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizedTags } from "@/components/organized-tags"

export default function HtmlSnippetsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">HTML 代码片段</h1>
        <p className="text-muted-foreground mt-2">常用HTML代码片段和解决方案</p>
      </div>

      <Tabs defaultValue="structure">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="structure">结构</TabsTrigger>
          <TabsTrigger value="forms">表单</TabsTrigger>
          <TabsTrigger value="semantic">语义化</TabsTrigger>
          <TabsTrigger value="media">媒体</TabsTrigger>
          <TabsTrigger value="meta">元数据</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>基本HTML5模板</CardTitle>
                <CardDescription>HTML5文档基本结构</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>网页标题</title>
  <meta name="description" content="网页描述">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
  <header>
    <h1>网站标题</h1>
    <nav>
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">服务</a></li>
        <li><a href="#">联系我们</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section>
      <h2>主要内容</h2>
      <p>这是网页的主要内容区域。</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 网站名称. 保留所有权利。</p>
  </footer>
</body>
</html>`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/html/basic-template" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>响应式布局结构</CardTitle>
                <CardDescription>常用的响应式布局HTML结构</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<div class="container">
  <!-- 页头 -->
  <header class="header">
    <div class="logo">
      <img src="logo.png" alt="网站Logo">
    </div>
    <nav class="main-nav">
      <button class="mobile-menu-toggle">菜单</button>
      <ul class="nav-list">
        <li><a href="#">首页</a></li>
        <li><a href="#">产品</a></li>
        <li><a href="#">服务</a></li>
        <li><a href="#">关于我们</a></li>
        <li><a href="#">联系我们</a></li>
      </ul>
    </nav>
  </header>

  <!-- 主要内容 -->
  <main class="main-content">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="widget">
        <h3>分类</h3>
        <ul>
          <li><a href="#">分类一</a></li>
          <li><a href="#">分类二</a></li>
          <li><a href="#">分类三</a></li>
        </ul>
      </div>
    </aside>

    <!-- 内容区 -->
    <section class="content">
      <article class="post">
        <h2>文章标题</h2>
        <p>文章内容...</p>
      </article>
    </section>
  </main>

  <!-- 页脚 -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于我们</h3>
        <p>公司简介...</p>
      </div>
      <div class="footer-section">
        <h3>联系方式</h3>
        <p>联系信息...</p>
      </div>
      <div class="footer-section">
        <h3>关注我们</h3>
        <div class="social-links">
          <a href="#">微信</a>
          <a href="#">微博</a>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2023 网站名称. 保留所有权利。</p>
    </div>
  </footer>
</div>`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/html/responsive-layout" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>基本表单</CardTitle>
                <CardDescription>常用表单元素和结构</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<form action="/submit-form" method="post">
  <!-- 文本输入 -->
  <div class="form-group">
    <label for="name">姓名:</label>
    <input type="text" id="name" name="name" placeholder="请输入您的姓名" required>
  </div>
  
  <!-- 电子邮件输入 -->
  <div class="form-group">
    <label for="email">电子邮件:</label>
    <input type="email" id="email" name="email" placeholder="请输入您的电子邮件" required>
  </div>
  
  <!-- 密码输入 -->
  <div class="form-group">
    <label for="password">密码:</label>
    <input type="password" id="password" name="password" placeholder="请输入密码" required>
  </div>
  
  <!-- 下拉选择框 -->
  <div class="form-group">
    <label for="country">国家/地区:</label>
    <select id="country" name="country">
      <option value="">请选择国家/地区</option>
      <option value="cn">中国</option>
      <option value="us">美国</option>
      <option value="jp">日本</option>
      <option value="kr">韩国</option>
    </select>
  </div>
  
  <!-- 单选按钮 -->
  <div class="form-group">
    <p>性别:</p>
    <label>
      <input type="radio" name="gender" value="male"> 男
    </label>
    <label>
      <input type="radio" name="gender" value="female"> 女
    </label>
    <label>
      <input type="radio" name="gender" value="other"> 其他
    </label>
  </div>
  
  <!-- 复选框 -->
  <div class="form-group">
    <p>兴趣爱好:</p>
    <label>
      <input type="checkbox" name="interests" value="sports"> 体育
    </label>
    <label>
      <input type="checkbox" name="interests" value="music"> 音乐
    </label>
    <label>
      <input type="checkbox" name="interests" value="reading"> 阅读
    </label>
  </div>
  
  <!-- 文本区域 -->
  <div class="form-group">
    <label for="message">留言:</label>
    <textarea id="message" name="message" rows="4" placeholder="请输入您的留言"></textarea>
  </div>
  
  <!-- 文件上传 -->
  <div class="form-group">
    <label for="file">上传文件:</label>
    <input type="file" id="file" name="file">
  </div>
  
  <!-- 隐藏字段 -->
  <input type="hidden" name="form_id" value="contact_form">
  
  <!-- 提交按钮 -->
  <div class="form-group">
    <button type="submit">提交</button>
    <button type="reset">重置</button>
  </div>
</form>`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/html/basic-form" className="text-primary hover:underline">
                  查看更多
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>表单验证</CardTitle>
                <CardDescription>HTML5表单验证属性</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`<form action="/submit-form" method="post" novalidate>
  <!-- 必填字段 -->
  <div class="form-group">
    <label for="name">姓名:</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      required 
      aria-required="true"
      placeholder="请输入您的姓名"
    >
    <span class="error" aria-live="polite"></span>
  </div>
  
  <!-- 电子邮件验证 -->
  <div class="form-group">
    <label for="email">电子邮件:</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required 
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      placeholder="请输入有效的电子邮件地址"
    >
    <span class="error" aria-live="polite"></span>
  </div>
  
  <!-- 密码验证 -->
  <div class="form-group">
    <label for="password">密码:</label>
    <input 
      type="password" 
      id="password" 
      name="password" 
      required 
      minlength="8"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
      title="密码必须包含至少8个字符，包括至少一个数字、一个小写字母和一个大写字母"
      placeholder="请输入密码"
    >
    <span class="error" aria-live="polite"></span>
  </div>
  
  <!-- 确认密码 -->
  <div class="form-group">
    <label for="confirm_password">确认密码:</label>
    <input 
      type="password" 
      id="confirm_password" 
      name="confirm_password" 
      required
    >
    <span class="error" aria-live="polite"></span>
  </div>
  
  <!-- 数字范围验证 -->
  <div class="form-group">
    <label for="age">年龄:</label>
    <input 
      type="number" 
      id="age" 
      name="age" 
      min="18" 
      max="120"
      placeholder="请输入您的年龄"
    >
    <span class="error" aria-live="polite"></span>
  </div>
  
  <!-- 日期验证 -->
  <div class="form-group">
    <label for="birthdate">出生日期:</label>
    <input 
      type="date" 
      id="birthdate" 
      name="birthdate" 
      min="1900-01-01" 
      max="2023-12-31"
    >
    <span class="error" aria-live="polite"></span>
  </div>
  
  <!-- 提交按钮 -->
  <div class="form-group">
    <button type="submit">提交</button>
  </div>
</form>`}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <a href="/snippets/html/form-validation" className="text-primary hover:underline">
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
