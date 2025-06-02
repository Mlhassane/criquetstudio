import { sanityClient } from "@/lib/sanity"
import { urlForImage } from "@/lib/sanity.image"
import { categoryWithPostsQuery } from "@/lib/querie"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import "@/style/animation.css" // Assurez-vous de créer ce fichier
import { Suspense } from "react"

type Props = {
  params: { slug: string }
}

// Composant skeleton pour un article
function PostSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm bg-white animate-pulse">
      <div className="aspect-video w-full bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="ml-2 h-4 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

// Composant skeleton pour le header
function HeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
      <div className="mt-8 mb-12">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="w-20 h-1 bg-gray-200 mt-6"></div>
      </div>
    </div>
  )
}

// Composant skeleton pour la page entière
function CategoryDetailSkeleton() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <HeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </main>
  )
}

// Composant principal avec les données chargées
async function CategoryDetail({ slug }: { slug: string }) {
  const data = await sanityClient.fetch(categoryWithPostsQuery(slug))

  if (!data) return notFound()

  const { title, description, posts } = data

  return (
    <main className="max-w-7xl mx-auto p-6 fade-in">
      <Link 
        href="/rubriques" 
        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour aux rubriques
      </Link>

      <div className="mt-8 mb-12 slide-down">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        {description && (
          <p className="text-xl text-gray-600 max-w-3xl">{description}</p>
        )}
        <div className="w-20 h-1 bg-indigo-600 mt-6"></div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-xl font-medium">Aucun article pour cette rubrique.</p>
          <p className="mt-2">Revenez bientôt pour découvrir du nouveau contenu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, index: number) => (
            <Link
              key={post._id}
              href={`/articles/${post.slug.current}`}
              className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white post-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video w-full relative overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={urlForImage(post.mainImage).width(800).height(450).url()}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs m-3 rounded-full">
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mt-3 line-clamp-2">{post.excerpt}</p>
                )}
                
                {post.author?.name && (
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-medium">
                      {post.author.name.charAt(0)}
                    </div>
                    <p className="ml-2 text-sm text-gray-600">
                      Par <span className="font-medium">{post.author.name}</span>
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform duration-300">
                    Lire l'article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

export default async function RubriqueDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<CategoryDetailSkeleton />}>
      <CategoryDetail slug={params.slug} />
    </Suspense>
  )
}



// app/rubriques/[slug]/page.tsx

// 'use client';

// import { useParams } from 'next/navigation';
// import { useCategoryWithPosts } from '@/hooks/useCategoryWithPosts';
// import Link from 'next/link';

// export default function RubriqueDetailPage() {
//   const { slug } = useParams();
//   const { data: category, isLoading, isError } = useCategoryWithPosts(slug as string);

//   if (isLoading) return <p>Chargement des articles...</p>;
//   if (isError || !category) return <p>Erreur ou rubrique introuvable.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Rubrique : {category.title}</h1>
//       <p className="mb-6 text-gray-600">{category.description}</p>

//       {category.posts.length === 0 ? (
//         <p>Aucun article dans cette rubrique.</p>
//       ) : (
//         <ul className="grid gap-4">
//           {category.posts.map((post) => (
//             <li key={post._id}>
//               <Link
//                 href={`/articles/${post.slug.current}`}
//                 className="block p-4 border rounded hover:bg-gray-100"
//               >
//                 <h2 className="text-xl font-semibold">{post.title}</h2>
//                 <p className="text-sm text-gray-500">{post.author?.name}</p>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
