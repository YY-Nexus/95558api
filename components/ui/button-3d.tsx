"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const button3dVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-1 active:translate-y-0 transition-all",
        sky: "bg-gradient-to-b from-sky-blue-500 to-sky-blue-600 text-white shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-1 active:translate-y-0 transition-all",
        grass:
          "bg-gradient-to-b from-grass-green-500 to-grass-green-600 text-white shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-1 active:translate-y-0 transition-all",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md active:shadow-xs transform hover:-translate-y-1 active:translate-y-0 transition-all",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:shadow-md active:shadow-xs transform hover:-translate-y-1 active:translate-y-0 transition-all",
        ghost:
          "hover:bg-accent hover:text-accent-foreground transform hover:-translate-y-1 active:translate-y-0 transition-all",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface Button3dProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3dVariants> {
  asChild?: boolean
}

const Button3d = React.forwardRef<HTMLButtonElement, Button3dProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 按钮点击动画
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      button.classList.add("button-press")
      setTimeout(() => {
        button.classList.remove("button-press")
      }, 200)
    }

    return (
      <button
        className={cn(button3dVariants({ variant, size, className }))}
        ref={ref}
        onClick={(e) => {
          handleButtonClick(e)
          if (props.onClick) {
            props.onClick(e)
          }
        }}
        {...props}
      >
        {props.children}
        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </button>
    )
  },
)
Button3d.displayName = "Button3d"

export { Button3d, button3dVariants }
