import { sanityClient } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity.image";
import { categoryWithPostsQuery } from "@/lib/querie";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/style/animation.css";
import { Suspense } from "react";
import { Post } from "@/types/post";

// Define the props type for the dynamic route
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Skeleton component for a single post
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
  );
}

// Skeleton component for the header
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
  );
}

// Skeleton component for the entire page
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
  );
}

// Main content component
async function CategoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await sanityClient.fetch(categoryWithPostsQuery(slug));

  if (!data) return notFound();

  const { title, description, posts } = data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/2 to-white fade-in">
      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation retour */}
        <Link
          href="/rubriques"
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
          Retour aux rubriques
        </Link>

        {/* En-tête de la catégorie */}
        <div className="text-center mt-12 mb-16 slide-down">
          <h1 className="text-5xl font-bold mb-6 text-primary tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <div className="w-24 h-1 bg-primary mx-auto mt-8"></div>
        </div>

        {/* Liste des articles */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-primary/2 rounded-2xl text-primary/70 shadow-md slide-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-primary mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-2xl font-medium text-primary">Aucun article pour cette rubrique</p>
            <p className="mt-3 text-lg text-primary/70">
              Revenez bientôt pour découvrir du nouveau contenu
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 slide-up">
            {posts.map((post: Post, index: number) => (
              <Link
                key={post._id}
                href={`/articles/${post.slug.current}`}
                className="group block bg-primary/2 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
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
                    <div className="w-full h-full bg-gradient-to-br from-primary/2 to-secondary flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-primary/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-primary text-secondary px-3 py-1 text-xs m-3 rounded-full shadow-sm">
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-primary/70 mt-3 line-clamp-2">{post.excerpt}</p>
                  )}
                  {post.author?.name && (
                    <div className="flex items-center mt-4 pt-4 border-t border-primary/10">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                        {post.author.name.charAt(0)}
                      </div>
                      <p className="ml-2 text-sm text-primary/70">
                        Par <span className="font-medium text-primary">{post.author.name}</span>
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300">
                      Lire l'article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 mb-8 py-12 px-8 bg-primary/2 rounded-2xl shadow-md slide-up">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-primary text-sm font-medium mb-2 block">NEWSLETTER</span>
            <h3 className="text-2xl font-bold mb-4 text-primary">Restez informé</h3>
            <p className="text-primary/70 mb-6">
              Abonnez-vous à notre newsletter hebdomadaire et recevez les dernières informations
              directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-3 rounded-lg border border-primary/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary text-secondary font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                S'abonner
              </button>
            </form>
            <p className="text-xs text-primary/60 mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate static parameters for the dynamic route
export async function generateStaticParams() {
  const categories: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "category"]{ slug }`
  );
  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

export default async function RubriqueDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/2 to-white">
      <main className="flex-1">
        <Suspense fallback={<CategoryDetailSkeleton />}>
          <CategoryDetail params={params} />
        </Suspense>
      </main>
    </div>
  );
}