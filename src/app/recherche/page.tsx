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
  <div className="animate-pulse space-y-3 p-4 border rounded">
    <div className="relative w-full h-48 bg-gray-200 rounded-md" />
    <div className="h-6 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-4/5" />
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
      <div className="h-4 bg-gray-200 rounded w-24" />
    </div>
  </div>
);

const SearchPageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse mb-8">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Résultats pour "{q}"</h1>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucun résultat trouvé pour votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}