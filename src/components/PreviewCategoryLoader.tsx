'use client'

import dynamic from 'next/dynamic'
import { CategoryWithPosts } from '@/types/post'

// Skeleton component
const CategorySkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-200 rounded w-1/4" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="h-48 bg-gray-200 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  </div>
)

// Composant client pour la preview
const PreviewCategory = dynamic(() => import('@/components/PreviewCategory'), {
  ssr: false,
  loading: () => <CategorySkeleton />
})

interface PreviewCategoryLoaderProps {
  initialData: CategoryWithPosts
  slug: string
}

export default function PreviewCategoryLoader({ initialData, slug }: PreviewCategoryLoaderProps) {
  return <PreviewCategory initialData={initialData} slug={slug} />
} 