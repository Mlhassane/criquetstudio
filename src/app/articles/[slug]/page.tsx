import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bookmark, Calendar, ChevronRight, Clock, Share, Share2, User } from "lucide-react"
import { Suspense } from "react"
import { sanityClient } from "@/lib/sanity"
import { urlForImage } from "@/lib/sanity.image"
import { PortableText } from "next-sanity"
import { postBySlugQuery, postsQuery } from "@/lib/querie"
import { Post } from "@/types/post"

// Composant Skeleton pour l'article
const ArticleSkeleton = () => (
  <div className="animate-pulse max-w-4xl mx-auto">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
    <div className="bg-gray-200 w-full h-96 rounded-lg mb-8"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-11/12"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
    <div className="mt-8 h-px bg-gray-200"></div>
    <div className="mt-8">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-3">
          <div className="w-20 h-16 bg-gray-200 rounded"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-20 h-16 bg-gray-200 rounded"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Composant pour le contenu d'un article
const ArticleContent = async ({ params }: { params: { slug: string } }) => {
  const post: Post = await sanityClient.fetch(postBySlugQuery, { slug: params.slug })
  
  // Récupérer des articles similaires en fonction de la catégorie
  let relatedPosts: Post[] = []
  if (post && post.categories && post.categories.length > 0) {
    const categoryIds = post.categories.map(cat => cat._id)
    // Récupérer tous les articles et filtrer ceux qui partagent une catégorie
    const allPosts: Post[] = await sanityClient.fetch(postsQuery)
    relatedPosts = allPosts
      .filter(p => 
        p._id !== post._id && // Exclure l'article actuel
        p.categories?.some(cat => categoryIds.includes(cat._id)) // Inclure ceux qui partagent une catégorie
      )
      .slice(0, 3) // Limiter à 3 articles
  }
  
  // Récupérer des articles récents qui ne sont pas l'article actuel
  const allPosts: Post[] = await sanityClient.fetch(postsQuery)
  const recentPosts = allPosts
    .filter(p => p._id !== post._id)
    .slice(0, 4)
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
        <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const estimatedReadingTime = post.body 
    ? Math.ceil(post.body.reduce((count, block) => 
        block.children ? count + block.children.reduce((sum, child) => 
          sum + (child.text ? child.text.split(' ').length : 0), 0) : count, 0) / 200)
    : 5; // 200 mots par minute en moyenne

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image avec overlay */}
      {post.mainImage && (
        <div className="relative w-full h-[40vh] md:h-[60vh]">
          <Image
            src={urlForImage(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized={false}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="container mx-auto px-4 relative">
        {/* Carte article principale */}
        <div className="bg-white p-6 md:p-10 max-w-4xl mx-auto shadow-lg rounded-lg -mt-20 relative z-10">
          {/* Navigation retour */}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <Link href="/" className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Catégorie et métadonnées */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {post.categories && post.categories[0] && (
              <Link 
                href={`/rubriques/${post.categories[0].slug.current}`}
                className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
              >
                {post.categories[0].title}
              </Link>
            )}
            <span className="flex items-center gap-1 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              {estimatedReadingTime} min de lecture
            </span>
          </div>

          {/* Titre article */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Auteur et actions */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {post.author?.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={urlForImage(post.author.image).width(100).height(100).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized={false}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              )}
              <span className="font-medium">{post.author?.name || 'Rédaction'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 flex items-center gap-1 text-gray-600 text-sm">
                <Share2 className="w-5 h-5" />
                Partager
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 flex items-center gap-1 text-gray-600 text-sm">
                <Bookmark className="w-5 h-5" />
                Sauvegarder
              </button>
            </div>
          </div>

         
          {/* Corps de l'article */}
          <div className="prose max-w-none py-8">
            {post.body && <PortableText value={post.body} />}
          </div>

           {/* Vidéo YouTube (si disponible) */}
            {post.youtubeUrl && (
            <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden shadow-md">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${post.youtubeUrl.split('v=')[1] || ''}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          )}


          {/* Tags/Catégories */}
          {post.categories && post.categories.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Thématiques</h4>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link 
                    href={`/rubriques/${category.slug.current}`} 
                    key={category._id}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Articles liés */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="inline-block w-2 h-6 bg-red-600 mr-3"></span>
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((article) => (
                <Link href={`/articles/${article.slug.current}`} key={article._id} className="group">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <div className="relative w-full h-48 overflow-hidden">
                      {article.mainImage ? (
                        <Image
                          src={urlForImage(article.mainImage).width(400).height(300).url()}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 300px"
                          unoptimized={false}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Image non disponible</span>
                        </div>
                      )}
                      {article.categories && article.categories[0] && (
                        <div className="absolute bottom-0 left-0 m-3">
                          <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {article.categories[0].title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold line-clamp-2 group-hover:text-red-600 transition-colors">{article.title}</h3>
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles récents */}
        <div className="max-w-4xl mx-auto mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span className="inline-block w-2 h-6 bg-red-600 mr-3"></span>
            À ne pas manquer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((article) => (
              <Link href={`/articles/${article.slug.current}`} key={article._id} className="flex gap-4 group p-3 hover:bg-gray-50 rounded-lg transition-colors">
                {article.mainImage ? (
                  <div className="relative w-28 h-24 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                    <Image
                      src={urlForImage(article.mainImage).width(200).height(150).url()}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="100px"
                      unoptimized={false}
                    />
                  </div>
                ) : (
                  <div className="w-28 h-24 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Pas d'image</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    {article.categories && article.categories[0] ? 
                      <span className="text-red-600 mr-2 font-medium">{article.categories[0].title}</span> : null
                    }
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <h3 className="font-medium line-clamp-2 group-hover:text-red-600 transition-colors">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/articles" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
              Voir tous les articles
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-4xl mx-auto mb-16 py-12 px-8 bg-gray-50 rounded-xl shadow-sm">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
            <p className="text-gray-600 mb-6">Abonnez-vous à notre newsletter hebdomadaire et recevez les dernières informations directement dans votre boîte mail</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                required
              />
              <button type="submit" className="bg-red-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                S'abonner
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">En vous inscrivant, vous acceptez notre politique de confidentialité</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export la fonction generateStaticParams pour générer les pages statiques
export async function generateStaticParams() {
  const posts = await sanityClient.fetch(`*[_type == "post"] { slug }`)
  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }))
}

// Page principale avec Suspense pour le chargement
export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <ArticleSkeleton />
          </div>
        }>
          <ArticleContent params={params} />
        </Suspense>
      </main>
    </div>
  )
}

// app/articles/[slug]/page.tsx
// src/app/articles/[slug]/page.tsx


// 'use client';
// import { urlForImage } from '@/lib/sanity.image';
// import { usePost } from '@/hooks/usePost';
// import { notFound } from 'next/navigation';

// type Props = {
//   params: {
//     slug?: string; // 👈 on met en optionnel pour éviter les crashs
//   };
// };

// export default function ArticleDetailPage({ params }: Props) {
//   const slug = params?.slug;

//   const {
//     data: post,
//     isLoading,
//     isError,
//   } = usePost(slug || '');

//   // Gestion chargement
//   if (isLoading) return <div className="p-6">Chargement...</div>;

//   // Gestion erreur ou pas d'article
//   if (isError || !post) return notFound();

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold">{post.title}</h1>
//       <p className="text-sm text-gray-500">
//         Publié le {new Date(post.publishedAt).toLocaleDateString()}
//       </p>

//       <div className="flex items-center gap-4 mt-4">
//   {post.author?.image && (
//     <img
//       src={urlForImage(post.author.image).width(80).height(80).url()}
//       alt={`Photo de ${post.author.name}`}
//       className="w-10 h-10 rounded-full"
//     />
//   )}
//   <span>{post.author?.name}</span>
// </div>
//       <div className="mt-6">
//   {post.mainImage?.asset && (
//     <img
//       src={urlForImage(post.mainImage).url()}
//       alt={post.title}
//       className="rounded-lg"
//     />
//   )}
// </div>

//       <div className="prose mt-6 max-w-none">
//         {/* `body` est un bloc PortableText donc ici tu peux utiliser PortableTextComponent */}
//         {post.body ? (
//           <div>{/* Ajoute ici PortableText si tu veux rendre le contenu */}</div>
//         ) : (
//           <p>Aucun contenu.</p>
//         )}
//       </div>
//     </div>
//   );
// }
