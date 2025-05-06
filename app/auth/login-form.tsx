"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "@/components/theme-provider"

// 定义表单验证模式
const loginSchema = z.object({
  email: z.string().email({ message: "请输入有效的电子邮箱地址" }),
  password: z.string().min(6, { message: "密码至少需要6个字符" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // 初始化表单
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // 表单提交处理
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    // 模拟API请求
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // 这里应该调用实际的登录API
    } catch (error) {
      console.error("登录失败", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">欢迎回来</h1>
        <p className="text-sm text-muted-foreground">请输入您的账号信息登录系统</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>电子邮箱</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    {...field}
                    autoComplete="email"
                    className={isDark ? "bg-secondary border-gray-700" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      autoComplete="current-password"
                      className={isDark ? "bg-secondary border-gray-700" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "隐藏密码" : "显示密码"}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      isDark
                        ? "border-gray-600 data-[state=checked]:bg-sky-blue-500 data-[state=checked]:border-sky-blue-500"
                        : ""
                    }
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    记住我
                  </label>
                </div>
              )}
            />
            <a
              href="#"
              className={`text-sm font-medium ${isDark ? "text-sky-blue-400 hover:text-sky-blue-300" : "text-sky-blue-600 hover:underline"}`}
            >
              忘记密码?
            </a>
          </div>

          <Button
            type="submit"
            className={`w-full ${
              isDark
                ? "tech-button bg-gradient-to-r from-sky-blue-500 to-sky-blue-600 hover:from-sky-blue-600 hover:to-sky-blue-700"
                : "bg-sky-blue-500 hover:bg-sky-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 登录中...
              </>
            ) : (
              "登录"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
