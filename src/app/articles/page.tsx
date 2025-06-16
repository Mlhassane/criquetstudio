import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { sanityClient } from "@/lib/sanity";
import { postsQuery, categoriesQuery } from "@/lib/querie";
import { Post, Category } from "@/types/post";
import { urlForImage } from "@/lib/sanity.image";

// Skeleton components
const ArticleSkeleton = () => (
  <div className="animate-pulse flex gap-4 p-4 border-b">
    <div className="bg-gray-200 w-24 h-20 rounded"></div>
    <div className="flex-1">
      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-5 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
);

const GridArticleSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 w-full h-52 rounded mb-3"></div>
    <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
    <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

const CategoryFilterSkeleton = () => (
  <div className="flex overflow-x-auto space-x-4 py-4">
    <div className="animate-pulse bg-gray-200 rounded-full h-9 w-24"></div>
    <div className="animate-pulse bg-gray-200 rounded-full h-9 w-20"></div>
    <div className="animate-pulse bg-gray-200 rounded-full h-9 w-28"></div>
    <div className="animate-pulse bg-gray-200 rounded-full h-9 w-24"></div>
    <div className="animate-pulse bg-gray-200 rounded-full h-9 w-32"></div>
  </div>
);

// Main content component
const ArticlesContent = async () => {
  const posts: Post[] = await sanityClient.fetch(postsQuery);
  const categories: Category[] = await sanityClient.fetch(categoriesQuery);

  // Organize articles
  const featuredArticles = posts.slice(0, 4);
  const remainingArticles = posts.slice(4);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/2 to-white fade-in">
      <section className="container mx-auto px-4 py-8">
        {/* En-tête */}
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
              Tous les articles
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Découvrez nos derniers articles et restez informé de l'actualité
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-8"></div>
          </div>
        </div>

        {/* Filtres de catégories */}
        <div className="mb-12 slide-up">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-1">
            <Link
              href="/articles"
              className="whitespace-nowrap px-4 py-2 rounded-full bg-primary text-secondary text-sm font-medium shadow-sm hover:bg-primary/90 transition-all duration-300"
            >
              Tous les articles
            </Link>
            {categories.map((category) => (
              <Link
                href={`/rubriques/${category.slug.current}`}
                key={category._id}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-primary/2 text-primary text-sm font-medium shadow-sm hover:bg-primary/10 transition-all duration-300"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles en vedette */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 slide-up">
          {featuredArticles.map((article) => (
            <Link
              href={`/articles/${article.slug.current}`}
              key={article._id}
              className="group block bg-primary/2 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="relative w-full h-48 overflow-hidden">
                {article.mainImage && (
                  <Image
                    src={urlForImage(article.mainImage).width(500).height(300).url()}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                {article.categories && article.categories[0] && (
                  <div className="absolute top-3 left-3 bg-primary text-secondary text-xs px-3 py-1 rounded-full shadow-sm">
                    {article.categories[0].title}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs text-primary/70 mb-2">
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-primary/80 line-clamp-2 transition-colors">
                  {article.title}
                </h3>
                <p className="text-primary/80 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                <div className="flex items-center">
                  {article.author?.image ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={urlForImage(article.author.image).width(50).height(50).url()}
                        alt={article.author.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-2">
                      {article.author?.name?.charAt(0) || "R"}
                    </div>
                  )}
                  <span className="text-sm text-primary/70">
                    Par {article.author?.name || "Rédaction"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Liste des articles */}
        <div className="grid md:grid-cols-2 gap-8 slide-up">
          {[0, 1].map((column) => (
            <div className="space-y-6" key={column}>
              {remainingArticles
                .filter((_, i) => i % 2 === column)
                .map((article) => (
                  <Link
                    href={`/articles/${article.slug.current}`}
                    key={article._id}
                    className="group block bg-primary/2 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {article.mainImage && (
                        <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={urlForImage(article.mainImage).width(200).height(150).url()}
                            alt={article.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                            sizes="128px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-xs text-primary/70 mb-1">
                          {article.categories && article.categories[0] && (
                            <span className="text-primary mr-2">{article.categories[0].title}</span>
                          )}
                          {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                        </div>
                        <h3 className="font-medium text-lg mb-1 text-primary group-hover:text-primary/80 line-clamp-2 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-primary/80 line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 slide-up">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-primary/2 text-primary rounded-lg shadow-sm hover:bg-primary/10 transition-all duration-300">
              Précédent
            </button>
            <button className="px-4 py-2 bg-primary text-secondary rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-300">
              1
            </button>
            <button className="px-4 py-2 bg-primary/2 text-primary rounded-lg shadow-sm hover:bg-primary/10 transition-all duration-300">
              2
            </button>
            <button className="px-4 py-2 bg-primary/2 text-primary rounded-lg shadow-sm hover:bg-primary/10 transition-all duration-300">
              3
            </button>
            <button className="px-4 py-2 bg-primary/2 text-primary rounded-lg shadow-sm hover:bg-primary/10 transition-all duration-300">
              Suivant
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary/2 py-16 mt-12 slide-up">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary">Restez informé</h3>
            <p className="text-primary/70 mb-6">
              Abonnez-vous à notre newsletter hebdomadaire et recevez les dernières informations
              directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-3 rounded-lg border border-primary/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary text-secondary font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-300"
              >
                S'abonner
              </button>
            </form>
            <p className="text-xs text-primary/60 mt-3">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

// Skeleton component for loading state
const ArticlesSkeleton = () => (
  <>
    <section className="container mx-auto px-4 py-8">
      <div className="animate-pulse h-10 bg-gray-200 w-64 mb-6 rounded"></div>

      {/* Category filters skeleton */}
      <div className="border-y border-gray-200 py-4 mb-8">
        <CategoryFilterSkeleton />
      </div>

      {/* Featured Articles skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <GridArticleSkeleton />
        <GridArticleSkeleton />
        <GridArticleSkeleton />
        <GridArticleSkeleton />
      </div>

      {/* Article list skeleton */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
        </div>
        <div className="space-y-6">
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center mt-12">
        <div className="animate-pulse flex items-center gap-1">
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-300 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </section>
  </>
);

export default function Articles() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/2 to-white">
      <main className="flex-1">
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesContent />
        </Suspense>
      </main>
    </div>
  );
}