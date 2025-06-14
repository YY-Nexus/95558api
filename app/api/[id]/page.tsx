"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CommentSection } from "@/components/feedback/comment-section"
import { RatingSystem } from "@/components/feedback/rating-system"
import { CollectionButton } from "@/components/personalization/collection-button"
import { ShareButton } from "@/components/community/share-button"

interface ApiPageProps {
  params: {
    id: string
  }
}

export default function ApiPage({ params }: ApiPageProps) {
  const { id } = params
  const [activeTab, setActiveTab] = useState("overview")

  // 模拟API数据
  const apiData = {
    id,
    title: "GitHub OAuth 集成",
    description: "使用GitHub账号登录您的应用",
    category: "auth",
    tags: ["认证", "OAuth", "GitHub"],
    content: `
      # GitHub OAuth 集成

      本文档介绍如何在您的应用中集成GitHub OAuth认证。

      ## 前提条件

      1. 在GitHub上注册一个OAuth应用
      2. 获取Client ID和Client Secret
      3. 设置回调URL

      ## 实现步骤

      ### 1. 配置环境变量

      \`\`\`
      GITHUB_CLIENT_ID=your_client_id
      GITHUB_CLIENT_SECRET=your_client_secret
      \`\`\`

      ### 2. 创建授权URL

      \`\`\`typescript
      const authUrl = \`https://github.com/login/oauth/authorize?client_id=\${process.env.GITHUB_CLIENT_ID}&redirect_uri=\${encodeURIComponent(redirectUri)}\`;
      \`\`\`

      ### 3. 处理回调

      \`\`\`typescript
      // 在回调路由中
      const code = req.query.code;
      
      // 交换访问令牌
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        })
      });
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      \`\`\`

      ### 4. 获取用户信息

      \`\`\`typescript
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': \`Bearer \${accessToken}\`
        }
      });
      
      const userData = await userResponse.json();
      \`\`\`
    `,
    examples: [
      {
        title: "基础示例",
        code: `
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: '缺少授权码' });
  }

  try {
    // 交换访问令牌
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || '授权失败' });
    }

    const accessToken = tokenData.access_token;

    // 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    });

    const userData = await userResponse.json();

    // 创建会话或JWT
    // ...

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error('GitHub OAuth错误:', error);
    return res.status(500).json({ error: '服务器错误' });
  }
}
`,
      },
      {
        title: "Next.js App Router",
        code: `
// app/api/auth/github/callback/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: '缺少授权码' }, { status: 400 });
  }

  try {
    // 交换访问令牌
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description || '授权失败' }, { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    });

    const userData = await userResponse.json();

    // 设置会话Cookie
    cookies().set('session', JSON.stringify({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar_url
      }
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: '/'
    });

    // 重定向到首页
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('GitHub OAuth错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
`,
      },
    ],
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 主内容区 */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{apiData.title}</h1>
              <p className="text-muted-foreground mt-2">{apiData.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <CollectionButton contentId={apiData.id} contentType="api" contentTitle={apiData.title} />
              <ShareButton contentId={apiData.id} contentType="api" contentTitle={apiData.title} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {apiData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger value="overview">概述</TabsTrigger>
                  <TabsTrigger value="examples">示例代码</TabsTrigger>
                  <TabsTrigger value="comments">评论</TabsTrigger>
                </TabsList>
                <div className="p-6">
                  <TabsContent value="overview" className="mt-0">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: apiData.content }} />
                    </div>
                  </TabsContent>
                  <TabsContent value="examples" className="mt-0">
                    <Tabs defaultValue={apiData.examples[0].title}>
                      <TabsList className="mb-4">
                        {apiData.examples.map((example) => (
                          <TabsTrigger key={example.title} value={example.title}>
                            {example.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {apiData.examples.map((example) => (
                        <TabsContent key={example.title} value={example.title}>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </TabsContent>
                  <TabsContent value="comments" className="mt-0">
                    <CommentSection contentId={apiData.id} contentType="api" />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="w-full md:w-80 space-y-6">
          <RatingSystem contentId={apiData.id} contentType="api" />

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">相关API</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:underline">
                    微信OAuth集成
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:underline">
                    Google OAuth集成
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:underline">
                    JWT认证实现
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
