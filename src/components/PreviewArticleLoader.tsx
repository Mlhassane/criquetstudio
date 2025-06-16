'use client'

import dynamic from 'next/dynamic'
import { Post } from '@/types/post'

// Skeleton component
const ArticleSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-200 rounded w-1/4" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="relative w-full h-[400px] bg-gray-200 rounded-lg" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-4/6" />
    </div>
  </div>
)

// Composant client pour la preview
const PreviewArticle = dynamic(() => import('@/components/PreviewArticle'), {
  ssr: false,
  loading: () => <ArticleSkeleton />
})

interface PreviewArticleLoaderProps {
  initialData: Post
  slug: string
}

export default function PreviewArticleLoader({ initialData, slug }: PreviewArticleLoaderProps) {
  return <PreviewArticle initialData={initialData} slug={slug} />
} 