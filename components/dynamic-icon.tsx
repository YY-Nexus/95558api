"use client"

import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"

interface DynamicIconProps {
  name: string
  className?: string
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = LucideIcons[name as keyof typeof LucideIcons] || LucideIcons.Circle

  return <Icon className={cn("h-5 w-5", className)} />
}
