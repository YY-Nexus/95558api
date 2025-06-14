import { BrandLogo } from "@/components/brand-logo"
import { TagCloud } from "@/components/tag-cloud"
import { OrganizedTags } from "@/components/organized-tags"
import { FeatureCard } from "@/components/feature-card"

export default function Home() {
  // 定义特性卡片数据
  const features = [
    {
      title: "API集成",
      description: "快速接入各类服务API，支持OAuth认证、支付、存储等核心功能",
      icon: "api",
      link: "/api",
    },
    {
      title: "代码片段",
      description: "常用代码片段库，涵盖前端、后端、数据处理等多种场景",
      icon: "code",
      link: "/snippets",
    },
    {
      title: "开发工具",
      description: "高效开发工具推荐与使用指南，提升开发效率",
      icon: "tool",
      link: "/tools",
    },
    {
      title: "术语表",
      description: "技术术语中英对照与解释，帮助理解复杂概念",
      icon: "book",
      link: "/tools/glossary",
    },
  ]

  // 安全的标签数据
  const safeTags = {
    popular: ["React", "Next.js", "TypeScript", "API", "OAuth", "存储", "支付"],
    categories: {
      frontend: ["React", "Vue", "Angular", "CSS", "HTML"],
      backend: ["Node.js", "Express", "NestJS", "Django"],
      database: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
      devops: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    },
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 品牌展示区 */}
      <section className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <BrandLogo showTagline size="xl" />
        </div>
        <h2 className="text-2xl font-bold mb-4">智能生产力导航体系</h2>
        <p className="text-lg max-w-2xl mx-auto">深度融合生产力要素与AI赋能体系，形成螺旋式效能增长模型</p>
      </section>

      {/* 标签云 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">热门标签</h2>
        <TagCloud tags={safeTags.popular} />
      </section>

      {/* 分类标签 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">按类别浏览</h2>
        <OrganizedTags categories={safeTags.categories} />
      </section>

      {/* 特性卡片 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
          />
        ))}
      </section>
    </main>
  )
}
