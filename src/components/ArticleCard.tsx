'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity.image'
import { Calendar } from 'lucide-react'
import { Post } from '@/types/post'

interface ArticleCardProps {
  article: Post
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/articles/${article.slug.current}`}
      className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        {article.mainImage ? (
          <Image
            src={urlForImage(article.mainImage).width(800).height(450).url()}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Pas d'image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Categories */}
        {article.categories && article.categories.length > 0 && (
          <div className="mb-3">
            <span className="text-red-600 text-sm font-medium">
              {article.categories[0].title}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt if available */}
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <Calendar className="w-4 h-4 mr-2" />
          <time dateTime={article.publishedAt}>{formattedDate}</time>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard