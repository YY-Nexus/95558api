"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { BrandLogo, BrandLogoEn } from "@/components/brand-logo"
import { useTheme } from "@/components/theme-provider"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login")
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 确保组件挂载后再渲染，避免服务端渲染与客户端渲染不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* 左侧品牌展示区 */}
      <div className={`relative hidden w-full md:flex md:w-1/2 ${isDark ? "bg-sky-blue-900" : "bg-sky-blue-500"}`}>
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <Image src="/abstract-blue-green.png" alt="启智云枢³ 背景" fill className="object-cover" priority />
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-sky-blue-900/90 via-sky-blue-800/80 to-grass-green-900/70 backdrop-blur-sm"
                : "bg-gradient-to-br from-sky-blue-500/80 via-sky-blue-400/70 to-grass-green-500/60 backdrop-blur-sm"
            }`}
          ></div>

          {/* 深色模式下添加科技感网格 */}
          {isDark && (
            <div
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            ></div>
          )}
        </div>

        {/* 品牌内容 */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-pure-white-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center brand-glow ${isDark ? "text-pure-white-50" : ""}`}
          >
            <BrandLogo
              showIcon={true}
              showSuperscript={true}
              textClassName={`text-5xl ${isDark ? "text-pure-white-50" : "text-pure-white-50"}`}
              iconClassName={`h-12 w-12 ${isDark ? "text-sky-blue-300" : "text-pure-white-50"}`}
            />
            <div className="mt-4">
              <BrandLogoEn
                showIcon={false}
                showSuperscript={true}
                textClassName={`text-3xl ${isDark ? "text-pure-white-50/90" : "text-pure-white-50/90"}`}
              />
            </div>
            <p className="mt-6 text-xl font-light tracking-wide text-pure-white-50/80">智联万物丨枢启未来</p>
            <p className="mt-2 text-lg font-light tracking-wide text-pure-white-50/70">
              Connect Intelligence, Hub the Future
            </p>
          </motion.div>

          {/* 品牌价值主张 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-12 left-0 right-0 text-center"
          >
            <div className="grid grid-cols-3 gap-4 px-12">
              <div className="flex flex-col items-center">
                <div className={`font-medium text-lg ${isDark ? "text-sky-blue-300" : "text-pure-white-50/90"}`}>
                  智能 (AI)
                </div>
                <p className="text-pure-white-50/70 text-sm">智能决策支持</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`font-medium text-lg ${isDark ? "text-sky-blue-200" : "text-pure-white-50/90"}`}>
                  连接 (Connect)
                </div>
                <p className="text-pure-white-50/70 text-sm">无缝资源整合</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`font-medium text-lg ${isDark ? "text-grass-green-300" : "text-pure-white-50/90"}`}>
                  安全 (Secure)
                </div>
                <p className="text-pure-white-50/70 text-sm">全方位数据保护</p>
              </div>
            </div>
            <div className="mt-8 text-sm text-pure-white-50/50">Copyright© YanYu IntelliCloudHub³</div>
          </motion.div>
        </div>
      </div>

      {/* 右侧功能区 */}
      <div className={`flex w-full flex-col justify-center md:w-1/2 ${isDark ? "bg-background" : ""}`}>
        <div className="mx-auto w-full max-w-md p-8">
          {/* 移动端品牌标志 */}
          <div className="mb-8 flex justify-center md:hidden">
            <BrandLogo
              showIcon={true}
              showSuperscript={true}
              iconClassName={isDark ? "text-sky-blue-400" : ""}
              textClassName={isDark ? "text-pure-white-50" : ""}
            />
          </div>

          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full grid-cols-2 mb-8 ${isDark ? "bg-secondary" : ""}`}>
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="mt-0">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                  <RegisterForm />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          {/* 社交媒体登录 */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? "border-gray-700" : "border-gray-300"}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`bg-background px-2 text-muted-foreground`}>
                  或通过以下方式{activeTab === "login" ? "登录" : "注册"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                className={`flex justify-center items-center rounded-md border py-2 px-3 text-sm font-medium ${
                  isDark
                    ? "border-gray-700 bg-secondary hover:bg-secondary/80 text-gray-300"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </button>
              <button
                className={`flex justify-center items-center rounded-md border py-2 px-3 text-sm font-medium ${
                  isDark
                    ? "border-gray-700 bg-secondary hover:bg-secondary/80 text-gray-300"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              <button
                className={`flex justify-center items-center rounded-md border py-2 px-3 text-sm font-medium ${
                  isDark
                    ? "border-gray-700 bg-secondary hover:bg-secondary/80 text-gray-300"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-5.5L12 9.25l3.5-1.25v5.5L12 15.75l-1.75-1.25V13.5l1.5 1.25 1.5-1.25v-2.5L12 12l-1.75-1v3.5l1.5 1 1-3.5v-3L10.5 9.5V11l1.25 1.25z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 底部链接 */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <a href="#" className={`hover:text-primary ${isDark ? "text-gray-400 hover:text-sky-blue-400" : ""}`}>
              使用条款
            </a>{" "}
            ·{" "}
            <a href="#" className={`hover:text-primary ${isDark ? "text-gray-400 hover:text-sky-blue-400" : ""}`}>
              隐私政策
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
