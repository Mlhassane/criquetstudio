import { groq } from "next-sanity";
import Link from "next/link";
import { Suspense } from "react";
import { sanityClient } from "@/lib/sanity";
import { Post } from "@/types/post";
import ArticleCard from "@/components/ArticleCard";

// ======================================================================
// Sanity Query
// ======================================================================

const searchQuery = groq`
  *[_type == "post" && (title match $query || excerpt match $query)] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    excerpt,
    slug,
    mainImage,
    "author": author->{_id, name},
    "categories": categories[]->{_id, title}
  }
`;

// ======================================================================
// Skeleton Components
// ======================================================================

const ArticleSkeleton = () => (
  <div className="animate-pulse bg-primary/2 rounded-2xl overflow-hidden shadow-md">
    <div className="aspect-video w-full bg-primary/10" />
    <div className="p-6">
      <div className="h-6 bg-primary/10 rounded w-3/4 mb-4" />
      <div className="h-4 bg-primary/10 rounded w-full mb-2" />
      <div className="h-4 bg-primary/10 rounded w-4/5 mb-4" />
      <div className="flex items-center gap-2 pt-4 border-t border-primary/10">
        <div className="w-8 h-8 bg-primary/10 rounded-full" />
        <div className="h-4 bg-primary/10 rounded w-24" />
      </div>
    </div>
  </div>
);

const SearchPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-primary/2 to-white">
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse mb-16">
        <div className="h-4 bg-primary/10 rounded w-32 mb-4" />
        <div className="h-10 bg-primary/10 rounded w-1/2 mb-2" />
        <div className="h-4 bg-primary/10 rounded w-1/3" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// ======================================================================
// Main Component
// ======================================================================

const SearchContent = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {
  const { q = "" } = await searchParams;
  const query = q.trim();
  let articles: Post[] = [];

  if (query) {
    try {
      articles = await sanityClient.fetch<Post[]>(searchQuery, { query: `${query}*` } as Record<string, unknown>);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/2 to-white fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de recherche */}
        <div className="mb-16 slide-down">
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

          <div className="text-center mt-12">
            <h1 className="text-5xl font-bold mb-6 text-primary tracking-tight">
              Résultats de recherche
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              {query ? `Résultats pour "${query}"` : "Commencez votre recherche"}
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-8"></div>
          </div>
        </div>

        {/* Résultats de recherche */}
        {articles.length === 0 ? (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-2xl font-medium text-primary">Aucun résultat trouvé</p>
            <p className="mt-3 text-lg text-primary/70">
              Essayez d'autres termes de recherche ou explorez nos rubriques
            </p>
            <div className="mt-8">
              <Link
                href="/rubriques"
                className="inline-block bg-primary text-secondary px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Explorer les rubriques
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 slide-up">
            {articles.map((article, index) => (
              <div
                key={article._id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArticleCard article={article} />
              </div>
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
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/2 to-white">
      <main className="flex-1">
        <Suspense fallback={<SearchPageSkeleton />}>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}