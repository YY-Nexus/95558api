"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DynamicIcon } from "./dynamic-icon"
import { bottomNavItems } from "@/data/navigation-data"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <div className="grid h-16 grid-cols-5">
        {bottomNavItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              // 检查子路径是否匹配
              pathname.startsWith(item.href) && item.href !== "/" ? "text-primary" : "",
            )}
          >
            <DynamicIcon
              name={item.icon}
              className={cn(
                pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/") ? "text-primary" : "",
              )}
            />
            <span className="text-xs">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
