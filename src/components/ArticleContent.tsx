import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bookmark, Calendar, ChevronRight, Clock, Share2, User } from "lucide-react"
import { PortableText } from "next-sanity"
import { urlForImage } from "@/lib/sanity.image"
import { Post } from "@/types/post"
import YouTubeButton from "./YouTubeButton"

interface ArticleContentProps {
  post: Post
}

export default function ArticleContent({ post }: ArticleContentProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articleUrl = `${siteUrl}/articles/${post.slug.current}`
  const shareTitle = `${post.title} | Criquet Broadcast Studio`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: post.excerpt || '',
          url: articleUrl,
        })
      } catch (error) {
        console.error('Erreur lors du partage:', error)
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard.writeText(articleUrl)
      alert('Lien copié dans le presse-papiers !')
    }
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const estimatedReadingTime = post.body
    ? Math.ceil(
        post.body.reduce(
          (count, block) =>
            block.children
              ? count +
                block.children.reduce(
                  (sum, child) => sum + (child.text ? child.text.split(" ").length : 0),
                  0
                )
              : count,
          0
        ) / 200
      )
    : 5

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de l'article */}
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{estimatedReadingTime} min de lecture</span>
            </div>
            {post.author && (
              <div className="flex items-center">
                {post.author.image ? (
                  <Image
                    src={urlForImage(post.author.image).url()}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <User className="w-4 h-4 mr-2" />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              title="Partager l'article"
            >
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              title="Sauvegarder l'article"
            >
              <Bookmark className="w-5 h-5" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </header>

        {/* Image principale */}
        {post.mainImage && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Bouton YouTube si une URL est disponible */}
        {post.youtubeUrl && (
          <div className="mb-8">
            <YouTubeButton videoUrl={post.youtubeUrl} />
          </div>
        )}

        {/* Contenu de l'article */}
        {post.body && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>
        )}

        {/* Catégories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Catégories</h2>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/rubriques/${category.slug.current}`}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
} 