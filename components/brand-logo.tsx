"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  showIcon?: boolean
  showSuperscript?: boolean
  showTagline?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
  taglineClassName?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function BrandLogo({
  showIcon = true,
  showSuperscript = true,
  showTagline = false,
  className,
  iconClassName,
  textClassName,
  taglineClassName,
  size = "md",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: { logo: "h-6 w-6", text: "text-sm", tagline: "text-xs" },
    md: { logo: "h-8 w-8", text: "text-xl", tagline: "text-sm" },
    lg: { logo: "h-10 w-10", text: "text-2xl", tagline: "text-base" },
    xl: { logo: "h-12 w-12", text: "text-3xl", tagline: "text-lg" },
  }

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-3">
        {showIcon && (
          <div className={cn("relative", sizeClasses[size].logo, iconClassName)}>
            <Image
              src="/images/yanyu-cloud-logo.png"
              alt="言语云³ Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className={cn("font-bold rainbow-text", sizeClasses[size].text, textClassName)}>
            言语云{showSuperscript && <sup className="text-xs">3</sup>}
          </span>
          <span className={cn("text-xs text-vibrant-cyan-600 font-medium -mt-1", textClassName)}>YanYu Cloud</span>
        </div>
      </div>

      {showTagline && (
        <div className={cn("mt-2 text-vibrant-cyan-500 font-medium", sizeClasses[size].tagline, taglineClassName)}>
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
  size = "md",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: { logo: "h-6 w-6", text: "text-sm", tagline: "text-xs" },
    md: { logo: "h-8 w-8", text: "text-xl", tagline: "text-sm" },
    lg: { logo: "h-10 w-10", text: "text-2xl", tagline: "text-base" },
    xl: { logo: "h-12 w-12", text: "text-3xl", tagline: "text-lg" },
  }

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-3">
        {showIcon && (
          <div className={cn("relative", sizeClasses[size].logo, iconClassName)}>
            <Image
              src="/images/yanyu-cloud-logo.png"
              alt="YanYu Cloud³ Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className={cn("font-bold rainbow-text", sizeClasses[size].text, textClassName)}>
            YanYu Cloud{showSuperscript && <sup className="text-xs">3</sup>}
          </span>
          <span className={cn("text-xs text-vibrant-cyan-600 font-medium -mt-1", textClassName)}>言语云³</span>
        </div>
      </div>

      {showTagline && (
        <div className={cn("mt-2 text-vibrant-cyan-500 font-medium", sizeClasses[size].tagline, taglineClassName)}>
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
  size = "md",
}: {
  showIcon?: boolean
  showSuperscript?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
  size?: "sm" | "md" | "lg" | "xl"
}) {
  const sizeClasses = {
    sm: { logo: "h-6 w-6", text: "text-sm" },
    md: { logo: "h-8 w-8", text: "text-xl" },
    lg: { logo: "h-10 w-10", text: "text-2xl" },
    xl: { logo: "h-12 w-12", text: "text-3xl" },
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div className={cn("relative", sizeClasses[size].logo, iconClassName)}>
          <Image
            src="/images/yanyu-cloud-logo.png"
            alt="YC³ Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      )}
      <span className={cn("font-bold rainbow-text", sizeClasses[size].text, textClassName)}>
        YC{showSuperscript && <sup className="text-xs">3</sup>}
      </span>
    </div>
  )
}
