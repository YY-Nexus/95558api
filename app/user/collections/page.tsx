import { UserCollections } from "@/components/personalization/user-collections"

export default function CollectionsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">我的收藏</h1>
      <UserCollections />
    </div>
  )
}
