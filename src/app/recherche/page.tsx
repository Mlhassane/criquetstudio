import { groq } from "next-sanity";
import Link from "next/link";
import { Suspense } from "react";
import { sanityClient } from "@/lib/sanity";
import { Post } from "@/types/post";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";
import SearchBar from "@/components/search-bar";
import { Clock, Filter, Calendar } from 'lucide-react';

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

const FilterBar = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => (
  <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-gray-500" />
      <select 
        className="text-sm border rounded-md px-3 py-1"
        onChange={(e) => onFilterChange({ category: e.target.value })}
      >
        <option value="">Toutes les catégories</option>
        <option value="actualite">Actualité</option>
        <option value="politique">Politique</option>
        <option value="economie">Économie</option>
        {/* Ajouter d'autres catégories */}
      </select>
    </div>
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-gray-500" />
      <select 
        className="text-sm border rounded-md px-3 py-1"
        onChange={(e) => onFilterChange({ date: e.target.value })}
      >
        <option value="">Toutes les dates</option>
        <option value="today">Aujourd'hui</option>
        <option value="week">Cette semaine</option>
        <option value="month">Ce mois</option>
        <option value="year">Cette année</option>
      </select>
    </div>
  </div>
);

const SearchContent = async ({ searchParams }: { searchParams: Promise<{ q?: string; page?: string; category?: string; date?: string }> }) => {
  const { q = "", page = "1", category = "", date = "" } = await searchParams;
  const query = q.trim();
  const currentPage = parseInt(page);
  const itemsPerPage = 9;
  
  let articles: Post[] = [];
  let totalResults = 0;

  if (query) {
    try {
      // Modifier la requête pour inclure les filtres
      const filterConditions = [];
      if (category) filterConditions.push(`categories[]->title match "${category}"`);
      if (date) {
        const dateFilter = getDateFilter(date);
        if (dateFilter) filterConditions.push(dateFilter);
      }

      const filterQuery = filterConditions.length > 0 
        ? `&& (${filterConditions.join(" && ")})` 
        : "";

      const searchQueryWithFilters = groq`
        *[_type == "post" && (title match $query || excerpt match $query) ${filterQuery}] | order(publishedAt desc) {
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

      articles = await sanityClient.fetch<Post[]>(
        searchQueryWithFilters, 
        { 
          query: `${query}*`,
          start: (currentPage - 1) * itemsPerPage,
          limit: itemsPerPage
        }
      );

      // Obtenir le nombre total de résultats
      const countQuery = groq`count(*[_type == "post" && (title match $query || excerpt match $query) ${filterQuery}])`;
      totalResults = await sanityClient.fetch<number>(countQuery, { query: `${query}*` });
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">Résultats de recherche</h1>
            <p className="text-gray-500">
              {totalResults} résultat{totalResults !== 1 ? "s" : ""} pour "{query}"
            </p>
          </div>

          <FilterBar onFilterChange={(filters) => {
            console.log('Filtres appliqués:', filters);
          }} />

          {articles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/articles/${article.slug.current}`}
                    className="group block p-4 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-full h-48 overflow-hidden rounded-md mb-4">
                      {article.mainImage ? (
                        <Image
                          src={urlForImage(article.mainImage).width(500).height(300).url()}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Aucune image</span>
                        </div>
                      )}
                      {article.categories?.[0] && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          {article.categories[0].title}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-red-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.excerpt}</p>
                    {article.author?.name && (
                      <div className="mt-3 flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-medium">
                          {article.author.name.charAt(0)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          Par <span className="font-medium">{article.author.name}</span>
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/recherche?q=${query}&page=${pageNum}${category ? `&category=${category}` : ''}${date ? `&date=${date}` : ''}`}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucun résultat trouvé pour votre recherche.</p>
              <div className="space-y-2">
                <p className="text-gray-500">Suggestions :</p>
                <ul className="text-sm text-gray-600">
                  <li>• Vérifiez l'orthographe des mots</li>
                  <li>• Utilisez des termes plus généraux</li>
                  <li>• Essayez d'autres mots-clés</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Criquet Studio</h3>
              <p className="text-sm text-gray-600">
                Votre source d'information fiable sur l'actualité nigérienne et internationale.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">À propos</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/a-propos" className="hover:text-gray-900">
                    Qui sommes-nous
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="hover:text-gray-900">
                    Notre équipe
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    Nous contacter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8 19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218.075-.441 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.362 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.01-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.001-.882-.3-1.857-.005-1.023-.008-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-sm text-gray-500 text-center">
            <p>© 2025 Niger Info. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Fonction utilitaire pour les filtres de date
const getDateFilter = (dateRange: string) => {
  const now = new Date();
  switch (dateRange) {
    case 'today':
      const today = new Date(now.setHours(0, 0, 0, 0));
      return `publishedAt >= "${today.toISOString()}"`;
    case 'week':
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return `publishedAt >= "${weekAgo.toISOString()}"`;
    case 'month':
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return `publishedAt >= "${monthAgo.toISOString()}"`;
    case 'year':
      const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      return `publishedAt >= "${yearAgo.toISOString()}"`;
    default:
      return null;
  }
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string; category?: string; date?: string }> }) {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}