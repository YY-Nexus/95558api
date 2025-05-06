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
const registerSchema = z
  .object({
    username: z.string().min(3, { message: "用户名至少需要3个字符" }).max(20, { message: "用户名最多20个字符" }),
    email: z.string().email({ message: "请输入有效的电子邮箱地址" }),
    password: z
      .string()
      .min(8, { message: "密码至少需要8个字符" })
      .regex(/[A-Z]/, { message: "密码需要至少一个大写字母" })
      .regex(/[a-z]/, { message: "密码需要至少一个小写字母" })
      .regex(/[0-9]/, { message: "密码需要至少一个数字" }),
    confirmPassword: z.string(),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "您必须同意服务条款和隐私政策" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不匹配",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // 初始化表单
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  })

  // 表单提交处理
  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)

    // 模拟API请求
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // 这里应该调用实际的注册API
    } catch (error) {
      console.error("注册失败", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">创建新账号</h1>
        <p className="text-sm text-muted-foreground">填写以下信息创建您的账号</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your_username"
                    {...field}
                    autoComplete="username"
                    className={isDark ? "bg-secondary border-gray-700" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      autoComplete="new-password"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      autoComplete="new-password"
                      className={isDark ? "bg-secondary border-gray-700" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "隐藏密码" : "显示密码"}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      isDark
                        ? "border-gray-600 data-[state=checked]:bg-sky-blue-500 data-[state=checked]:border-sky-blue-500"
                        : ""
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    我同意{" "}
                    <a
                      href="#"
                      className={
                        isDark ? "text-sky-blue-400 hover:text-sky-blue-300" : "text-sky-blue-600 hover:underline"
                      }
                    >
                      服务条款
                    </a>{" "}
                    和{" "}
                    <a
                      href="#"
                      className={
                        isDark ? "text-sky-blue-400 hover:text-sky-blue-300" : "text-sky-blue-600 hover:underline"
                      }
                    >
                      隐私政策
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 注册中...
              </>
            ) : (
              "创建账号"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
