"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { LoginFrom } from "./login-form"
import { RegisterForm } from "./register-form"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGitHubLogin = () => {
    setIsLoading(true)
    window.location.href = "/api/auth/github"
  }

  const handleWeChatLogin = () => {
    setIsLoading(true)
    window.location.href = "/api/auth/wechat"
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">欢迎回来</h1>
          <p className="text-sm text-muted-foreground">选择登录方式继续使用</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <LoginFrom />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">或者使用</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" onClick={handleGitHubLogin} disabled={isLoading} className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub 登录
                  </Button>

                  <Button variant="outline" onClick={handleWeChatLogin} disabled={isLoading} className="w-full">
                    微信登录
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
