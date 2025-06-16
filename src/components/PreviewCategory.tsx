'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CategoryWithPosts } from '@/types/post'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

interface PreviewCategoryProps {
  initialData: CategoryWithPosts
  slug: string
}

export default function PreviewCategory({ initialData, slug }: PreviewCategoryProps) {
  const { data: category, isLoading } = useQuery<CategoryWithPosts>({
    queryKey: ['category', slug],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${slug}`)
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de la catégorie')
      }
      return response.json()
    },
    initialData,
    refetchInterval: 2000, // Rafraîchir toutes les 2 secondes en mode preview
  })

  if (isLoading) {
    return null // Le skeleton est géré par le dynamic import
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.posts?.map((post) => (
          <Link
            key={post._id}
            href={`/articles/${post.slug.current}`}
            className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {post.mainImage && (
              <div className="relative h-48">
                <Image
                  src={urlForImage(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 