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
    <>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <span className="inline-block w-2 h-8 bg-red-600 mr-3"></span>
          Tous les articles
        </h1>

        {/* Category filters */}
        <div className="border-y border-gray-200 py-4 mb-8">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-1">
            <Link
              href="/articles"
              className="whitespace-nowrap px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium"
            >
              Tous les articles
            </Link>
            {categories.map((category) => (
              <Link
                href={`/rubriques/${category.slug.current}`}
                key={category._id}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredArticles.map((article) => (
            <Link
              href={`/articles/${article.slug.current}`}
              key={article._id}
              className="group flex flex-col h-full"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-lg mb-3">
                {article.mainImage && (
                  <Image
                    src={urlForImage(article.mainImage).width(500).height(300).url()}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                {article.categories && article.categories[0] && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {article.categories[0].title}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-red-600 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{article.excerpt}</p>
                <div className="mt-auto flex items-center">
                  {article.author?.image && (
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={urlForImage(article.author.image).width(50).height(50).url()}
                        alt={article.author.name}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
                    Par {article.author?.name || "Rédaction"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Article list */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {remainingArticles.filter((_, i) => i % 2 === 0).map((article) => (
              <Link
                href={`/articles/${article.slug.current}`}
                key={article._id}
                className="flex gap-4 group p-2 hover:bg-gray-50 rounded-lg"
              >
                {article.mainImage && (
                  <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={urlForImage(article.mainImage).width(200).height(150).url()}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">
                    {article.categories && article.categories[0] ? (
                      <span className="text-red-600 mr-2">{article.categories[0].title}</span>
                    ) : null}
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </div>
                  <h3 className="font-medium text-lg mb-1 line-clamp-2 group-hover:text-red-600">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="space-y-6">
            {remainingArticles.filter((_, i) => i % 2 === 1).map((article) => (
              <Link
                href={`/articles/${article.slug.current}`}
                key={article._id}
                className="flex gap-4 group p-2 hover:bg-gray-50 rounded-lg"
              >
                {article.mainImage && (
                  <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={urlForImage(article.mainImage).width(200).height(150).url()}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">
                    {article.categories && article.categories[0] ? (
                      <span className="text-red-600 mr-2">{article.categories[0].title}</span>
                    ) : null}
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </div>
                  <h3 className="font-medium text-lg mb-1 line-clamp-2 group-hover:text-red-600">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-1">
            <button className="px-4 py-2 bg-gray-200 rounded">Précédent</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded">1</button>
            <button className="px-4 py-2 bg-gray-200 rounded">2</button>
            <button className="px-4 py-2 bg-gray-200 rounded">3</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Suivant</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-10 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
            <p className="text-gray-600 mb-6">
              Abonnez-vous à notre newsletter hebdomadaire et recevez les dernières informations
              directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="submit"
                className="bg-red-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-700 transition"
              >
                S'abonner
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </div>
        </div>
      </section>
    </>
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
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesContent />
        </Suspense>
      </main>
    </div>
  );
}