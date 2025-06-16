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
    <article className="min-h-screen bg-gradient-to-b from-primary/2 to-white fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de l'article */}
          <header className="mb-12 slide-down">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300 mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour à l'accueil
            </Link>

            {/* Catégorie principale */}
            {post.categories && post.categories[0] && (
              <Link
                href={`/rubriques/${post.categories[0].slug.current}`}
                className="inline-block bg-primary text-secondary px-4 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors mb-4"
              >
                {post.categories[0].title}
              </Link>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-primary/80 mb-6">
              <div className="flex items-center bg-primary/2 px-3 py-1 rounded-full shadow-sm">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                {formattedDate}
              </div>
              <div className="flex items-center bg-primary/2 px-3 py-1 rounded-full shadow-sm">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>{estimatedReadingTime} min de lecture</span>
              </div>
              {post.author && (
                <div className="flex items-center bg-primary/2 px-3 py-1 rounded-full shadow-sm">
                  {post.author.image ? (
                    <Image
                      src={urlForImage(post.author.image).url()}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium mr-2">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <span>Par <span className="font-medium text-primary">{post.author.name}</span></span>
                </div>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-primary/2 text-primary rounded-lg shadow-sm hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                title="Partager l'article"
              >
                <Share2 className="w-5 h-5" />
                <span>Partager</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-primary/2 text-primary rounded-lg shadow-sm hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                title="Sauvegarder l'article"
              >
                <Bookmark className="w-5 h-5" />
                <span>Sauvegarder</span>
              </button>
            </div>
          </header>

          {/* Image principale */}
          {post.mainImage && (
            <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-md group">
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute top-0 right-0 bg-primary text-secondary px-3 py-1 text-xs m-3 rounded-full">
                {formattedDate}
              </div>
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
            <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-primary/80 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:shadow-md slide-up bg-primary/2 p-8 rounded-2xl shadow-md">
              <PortableText value={post.body} />
            </div>
          )}

          {/* Catégories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-8 border-t border-primary/10 slide-up">
              <h2 className="text-xl font-semibold text-primary mb-4">Catégories</h2>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/rubriques/${category.slug.current}`}
                    className="bg-primary/2 text-primary px-4 py-2 rounded-full text-sm shadow-sm hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
} 