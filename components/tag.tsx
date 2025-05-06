"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface TagProps {
  children: React.ReactNode
  className?: string
  active?: boolean
  onClick?: () => void
}

export function Tag({ children, className, active, onClick }: TagProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
        active ? "bg-sky-blue-100 text-sky-blue-800" : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
