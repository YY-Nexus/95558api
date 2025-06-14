import Link from "next/link"
import { DynamicIcon } from "@/components/dynamic-icon"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  link: string
}

export function FeatureCard({ title, description, icon, link }: FeatureCardProps) {
  return (
    <Link href={link}>
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        <div className="mb-4 text-vibrant-cyan-500">
          <DynamicIcon name={icon} className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
        <div className="mt-4 text-vibrant-cyan-500 font-medium flex items-center">
          <span>了解更多</span>
          <DynamicIcon name="arrow-right" className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
