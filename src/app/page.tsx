import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Share2 } from "lucide-react";
import { Suspense } from "react";
import { sanityClient } from "@/lib/sanity";
import { Post, Category } from "@/types/post";
import { urlForImage } from "@/lib/sanity.image";
import NewsletterForm from "./components/NewsletterForm";
import QuickSearch from "./components/QuickSearch";
import Breadcrumb from "./components/Breadcrumb";
import ShareButton from "./components/ShareButton";

// ======================================================================
// Sanity Queries (GROQ)
// ======================================================================

const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    excerpt,
    slug,
    youtubeUrl,
    mainImage,
    "author": author->{_id, name, image, bio},
    "categories": categories[]->{_id, title}
  }
`;

const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    description,
    slug
  }
`;

// ======================================================================
// Skeleton Components
// ======================================================================

const HeroSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="relative w-full h-96 bg-gray-200 rounded-lg" />
    <div className="h-4 bg-gray-200 rounded w-24" />
    <div className="h-6 bg-gray-300 rounded w-3/4" />
    <div className="h-6 bg-gray-300 rounded w-2/3" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-11/12" />
    <div className="flex items-center mt-4">
      <div className="rounded-full bg-gray-200 h-8 w-8 mr-2" />
      <div className="h-3 bg-gray-200 rounded w-32" />
    </div>
  </div>
);

const ArticleSkeleton = ({ count = 1 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse flex gap-4 p-3 border-b">
        <div className="bg-gray-200 w-24 h-20 rounded-md" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-5 bg-gray-300 rounded w-full" />
          <div className="h-5 bg-gray-300 rounded w-3/4" />
        </div>
      </div>
    ))}
  </>
);

const GridArticleSkeleton = ({ count = 3 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse space-y-3">
        <div className="bg-gray-200 w-full h-52 rounded-md" />
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-5 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    ))}
  </>
);

const CategoriesSkeleton = () => (
  <div className="flex overflow-x-auto gap-4 py-1 scrollbar-hide">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-gray-200 rounded-full h-9"
        style={{ width: `${Math.random() * 60 + 60}px` }}
      />
    ))}
  </div>
);

// ======================================================================
// Section Components
// ======================================================================

const HeroSection = ({
  featuredArticle,
  sidebarArticles,
}: {
  featuredArticle: Post;
  sidebarArticles: Post[];
}) => {
  if (!featuredArticle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-2">Aucun article mis en avant</h2>
        <p>Veuillez sélectionner un article à mettre en avant.</p>
      </div>
    );
  }

  const imageUrl = featuredArticle.mainImage
    ? urlForImage(featuredArticle.mainImage).width(1200).height(800).url()
    : "/placeholder-image.jpg";

  const authorImageUrl = featuredArticle.author?.image
    ? urlForImage(featuredArticle.author.image).width(100).height(100).url()
    : "/placeholder-avatar.jpg";

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <QuickSearch />
      </div>
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Link href={`/articles/${featuredArticle.slug.current}`} className="group">
            <div className="relative w-full h-96 overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={featuredArticle.title || "Article mis en avant"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="text-white">
                  <div className="text-sm mb-2 opacity-90 flex items-center gap-2">
                    {featuredArticle.categories?.[0] && (
                      <span className="bg-red-600 px-2 py-1 rounded text-xs">
                        {featuredArticle.categories[0].title}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm opacity-90 line-clamp-2">{featuredArticle.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-white">
                        <Image
                          src={authorImageUrl}
                          alt={featuredArticle.author?.name || "Auteur"}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">Par {featuredArticle.author?.name || "Rédaction"}</span>
                    </div>
                    <ShareButton
                      title={featuredArticle.title || "Article"}
                      text={featuredArticle.excerpt || ""}
                      url={`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/articles/${featuredArticle.slug.current}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="md:col-span-2 space-y-4">
          {sidebarArticles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="horizontal" />
          ))}
          <Link href="/articles" className="text-red-600 text-sm font-medium flex items-center hover:underline">
            Voir tous les articles <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ArticleCard = ({
  article,
  variant = "vertical",
}: {
  article: Post;
  variant?: "vertical" | "horizontal";
}) => (
  <Link
    href={`/articles/${article.slug.current}`}
    className={`group ${variant === "horizontal" ? "flex gap-4 p-3 border-b" : "block"}`}
  >
    {variant === "horizontal" ? (
      <>
        <div className="relative w-24 h-20 overflow-hidden rounded-md flex-shrink-0">
          {article.mainImage && (
            <Image
              src={urlForImage(article.mainImage).width(200).height(150).url()}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="100px"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">
            {article.categories?.[0] && (
              <span className="text-red-600 font-medium mr-2">{article.categories[0].title}</span>
            )}
            {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
          </div>
          <h3 className="font-medium text-base line-clamp-2 group-hover:text-red-600">
            {article.title}
          </h3>
        </div>
      </>
    ) : (
      <div className="space-y-3">
        <div className="relative w-full h-52 overflow-hidden rounded-md">
          {article.mainImage && (
            <Image
              src={urlForImage(article.mainImage).width(500).height(300).url()}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {article.categories?.[0] && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {article.categories[0].title}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-2">
            {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
          </div>
          <h3 className="font-medium text-lg group-hover:text-red-600 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
        </div>
      </div>
    )}
  </Link>
);

const CategoriesSection = ({ categories }: { categories: Category[] }) => (
  <section className="border-y border-gray-200 py-4 sticky top-0 bg-white z-10">
    <div className="container mx-auto px-4">
      <div className="flex overflow-x-auto gap-4 scrollbar-hide py-1">
        <Link
          href="/articles"
          className="whitespace-nowrap px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium flex-shrink-0"
        >
          À la une
        </Link>
        {categories.map((category) => (
          <Link
            href={`/rubriques/${category.slug.current}`}
            key={category._id}
            className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium flex-shrink-0 transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const SectionHeader = ({
  title,
  link,
  linkText = "Voir plus",
}: {
  title: string;
  link: string;
  linkText?: string;
}) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold flex items-center">
      <span className="inline-block w-2 h-6 bg-red-600 mr-3" />
      {title}
    </h2>
    <Link href={link} className="text-sm text-gray-500 flex items-center hover:text-red-600 transition-colors">
      {linkText} <ChevronRight className="h-4 w-4" />
    </Link>
  </div>
);

const TrendingSection = ({ articles }: { articles: Post[] }) => (
  <section className="container mx-auto px-4 py-8">
    <SectionHeader title="Actualités tendance" link="/rubriques/tendance" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard key={article._id} article={article} variant="vertical" />
        ))
      ) : (
        <div className="md:col-span-3 text-center py-8 text-gray-500">
          Aucun article tendance disponible
        </div>
      )}
    </div>
  </section>
);

const LatestNewsSection = ({ articles }: { articles: Post[] }) => (
  <section className="container mx-auto px-4 py-8">
    <SectionHeader title="Dernières nouvelles" link="/articles" />
    <div className="grid md:grid-cols-2 gap-8">
      {articles[0] && (
        <div>
          <Link href={`/articles/${articles[0].slug.current}`} className="group block">
            <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md">
              {articles[0].mainImage && (
                <Image
                  src={urlForImage(articles[0].mainImage).width(800).height(600).url()}
                  alt={articles[0].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              {articles[0].categories?.[0] && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {articles[0].categories[0].title}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {new Date(articles[0].publishedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <h3 className="font-bold text-xl mb-2 group-hover:text-red-600 transition-colors">
              {articles[0].title}
            </h3>
            <p className="text-gray-600 line-clamp-3">{articles[0].excerpt}</p>
          </Link>
        </div>
      )}
      <div className="space-y-4">
        {articles.slice(1, 5).map((article) => (
          <ArticleCard key={article._id} article={article} variant="horizontal" />
        ))}
      </div>
    </div>
  </section>
);

const EventSection = () => (
  <section className="container mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg text-white relative overflow-hidden">
      <div className="relative z-10 md:w-2/3">
        <div className="text-sm text-red-400 mb-2 font-medium">ÉVÉNEMENT À VENIR</div>
        <h2 className="text-2xl font-bold mb-2">Conférence sur les enjeux médiatiques en Afrique</h2>
        <p className="text-gray-300 mb-4">
          Du 15 au 20 Juin 2025 | Centre de conférences internationales, Niamey
        </p>
        <Link
          href="/evenements"
          className="inline-block bg-red-600 px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
        >
          En savoir plus
        </Link>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 md:opacity-40">
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-right-top"
          style={{ backgroundImage: "url('/event-illustration.svg')" }}
        />
      </div>
    </div>
  </section>
);

const RegionalNewsSection = ({ articles }: { articles: Post[] }) => (
  <section className="container mx-auto px-4 py-8">
    <SectionHeader title="Actualités régionales" link="/rubriques/regional" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id} className="border-b pb-4 hover:border-red-600 transition-colors">
            <Link href={`/articles/${article.slug.current}`} className="group block space-y-2">
              <div className="text-xs text-gray-500">
                {article.categories?.[0] && (
                  <span className="text-red-600 mr-2">{article.categories[0].title}</span>
                )}
                {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
              </div>
              <h3 className="font-medium group-hover:text-red-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
            </Link>
          </div>
        ))
      ) : (
        <div className="md:col-span-4 text-center py-8 text-gray-500">
          Aucune actualité régionale disponible
        </div>
      )}
    </div>
  </section>
);

const NewsletterSection = () => (
  <section className="bg-gray-100 py-10">
    <div className="container mx-auto px-4">
      <NewsletterForm />
    </div>
  </section>
);

// ======================================================================
// Main Component
// ======================================================================

const HomeContent = async () => {
  const [posts, categories] = await Promise.all([
    sanityClient.fetch<Post[]>(postsQuery, {}, { next: { revalidate: 60 } }),
    sanityClient.fetch<Category[]>(categoriesQuery, {}, { next: { revalidate: 3600 } }),
  ]);

  if (!posts || !categories) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-2">Erreur de chargement</h2>
        <p>Impossible de charger les données. Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  const featuredArticle = posts[0];
  const sidebarArticles = posts.slice(1, 4);
  const trendingArticles = posts
    .filter((post) => post.categories?.some((cat) => cat.title === "Tendance"))
    .slice(0, 3);
  const latestArticles = posts.slice(0, 5);
  const regionalArticles = posts
    .filter((post) => post.categories?.some((cat) => cat.title === "Régional"))
    .slice(0, 4);

  if (!featuredArticle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-2">Aucun article disponible</h2>
        <p>Il n'y a pas encore d'articles publiés.</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection featuredArticle={featuredArticle} sidebarArticles={sidebarArticles} />
      <CategoriesSection categories={categories} />
      <TrendingSection articles={trendingArticles} />
      <LatestNewsSection articles={latestArticles} />
      <EventSection />
      {regionalArticles.length > 0 && <RegionalNewsSection articles={regionalArticles} />}
      <NewsletterSection />
    </>
  );
};

const HomeSkeleton = () => (
  <>
    <section className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <HeroSkeleton />
        </div>
        <div className="md:col-span-2 space-y-4">
          <ArticleSkeleton count={3} />
        </div>
      </div>
    </section>
    <section className="border-y border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <CategoriesSkeleton />
      </div>
    </section>
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="animate-pulse h-7 bg-gray-200 rounded w-48" />
        <div className="animate-pulse h-4 bg-gray-200 rounded w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GridArticleSkeleton count={3} />
      </div>
    </section>
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="animate-pulse h-7 bg-gray-200 rounded w-48" />
        <div className="animate-pulse h-4 bg-gray-200 rounded w-24" />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="animate-pulse space-y-3">
            <div className="bg-gray-200 w-full h-80 rounded-md" />
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-7 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
          </div>
        </div>
        <div className="space-y-4">
          <ArticleSkeleton count={4} />
        </div>
      </div>
    </section>
    <section className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="animate-pulse space-y-3">
          <div className="h-3 bg-gray-600 rounded w-32" />
          <div className="h-7 bg-gray-600 rounded w-2/3" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
          <div className="h-10 bg-gray-600 rounded w-32" />
        </div>
      </div>
    </section>
  </>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: "Accueil" }]} />
        </div>
        <Suspense fallback={<HomeSkeleton />}>
          <HomeContent />
        </Suspense>
      </main>
    </div>
  );
}