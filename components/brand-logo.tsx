"use client"

import { Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

interface BrandLogoProps {
  showIcon?: boolean
  showSuperscript?: boolean
  showTagline?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
  taglineClassName?: string
}

export function BrandLogo({
  showIcon = true,
  showSuperscript = true,
  showTagline = false,
  className,
  iconClassName,
  textClassName,
  taglineClassName,
}: BrandLogoProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-2">
        {showIcon && (
          <Database className={cn("h-6 w-6", isDark ? "text-sky-blue-400" : "text-sky-blue-500", iconClassName)} />
        )}
        <span className={cn("font-bold text-xl", isDark ? "text-pure-white-50" : "text-sky-blue-600", textClassName)}>
          启智云枢{showSuperscript && <sup className="text-xs">3</sup>}
        </span>
      </div>

      {showTagline && (
        <div className={cn("text-xs mt-1", isDark ? "text-sky-blue-200" : "text-sky-blue-600/70", taglineClassName)}>
          智联万物丨枢启未来
        </div>
      )}
    </div>
  )
}

export function BrandLogoEn({
  showIcon = true,
  showSuperscript = true,
  showTagline = false,
  className,
  iconClassName,
  textClassName,
  taglineClassName,
}: BrandLogoProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-2">
        {showIcon && (
          <Database className={cn("h-6 w-6", isDark ? "text-sky-blue-400" : "text-sky-blue-500", iconClassName)} />
        )}
        <span className={cn("font-bold text-xl", isDark ? "text-pure-white-50" : "text-sky-blue-600", textClassName)}>
          IntelliCloudHub{showSuperscript && <sup className="text-xs">3</sup>}
        </span>
      </div>

      {showTagline && (
        <div className={cn("text-xs mt-1", isDark ? "text-sky-blue-200" : "text-sky-blue-600/70", taglineClassName)}>
          Connect Intelligence, Hub the Future
        </div>
      )}
    </div>
  )
}

export function BrandLogoShort({
  showIcon = true,
  showSuperscript = true,
  className,
  iconClassName,
  textClassName,
}: {
  showIcon?: boolean
  showSuperscript?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={cn("flex items-center", className)}>
      {showIcon && (
        <Database className={cn("h-6 w-6", isDark ? "text-sky-blue-400" : "text-sky-blue-500", iconClassName)} />
      )}
      <span className={cn("font-bold text-xl", isDark ? "text-pure-white-50" : "text-sky-blue-600", textClassName)}>
        CH{showSuperscript && <sup className="text-xs">3</sup>}
      </span>
    </div>
  )
}
