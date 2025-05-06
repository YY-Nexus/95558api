import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  content: string
  icon: React.ReactNode
  href: string
  className?: string
}

export function FeatureCard({ title, description, content, icon, href, className }: FeatureCardProps) {
  return (
    <Card className={cn("card-hover overflow-hidden", className)}>
      <CardHeader className="pb-3 flex flex-row items-center gap-2">
        <div className="rounded-full p-2 bg-sky-blue-50 text-sky-blue-600">{icon}</div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
      <CardFooter className="pt-3 border-t bg-muted/50">
        <Link href={href} className="w-full">
          <Button className="w-full" variant="outline">
            浏览{title}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
