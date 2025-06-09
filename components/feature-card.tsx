import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  gradient?: string
  className?: string
}

export function FeatureCard({
  title,
  description,
  href,
  icon,
  gradient = "from-vibrant-blue-500 to-vibrant-cyan-500",
  className,
}: FeatureCardProps) {
  return (
    <Card className={cn("card-hover overflow-hidden border-2 border-white/20 bg-white/80 backdrop-blur-sm", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn("p-3 rounded-xl bg-gradient-to-br", gradient, "text-white shadow-lg")}>{icon}</div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-3 border-t bg-gradient-to-r from-gray-50 to-white">
        <Link href={href} className="w-full">
          <Button
            className={cn(
              "w-full bg-gradient-to-r text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg",
              gradient,
            )}
          >
            浏览{title}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
