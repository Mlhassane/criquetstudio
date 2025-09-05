import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Share2, ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { sanityClient } from "@/lib/sanity";
import { Post, Category } from "@/types/post";
import { urlForImage } from "@/lib/sanity.image";
import NewsletterForm from "./components/NewsletterForm";
import Breadcrumb from "./components/Breadcrumb";
import ShareButton from "./components/ShareButton";
import CustomImage from '@/components/CustomImage'

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
    <div className="relative w-full h-96 bg-primary/10 rounded-2xl" />
    <div className="h-4 bg-primary/10 rounded w-24" />
    <div className="h-6 bg-primary/10 rounded w-3/4" />
    <div className="h-6 bg-primary/10 rounded w-2/3" />
    <div className="h-4 bg-primary/10 rounded w-full" />
    <div className="h-4 bg-primary/10 rounded w-11/12" />
    <div className="flex items-center mt-4">
      <div className="rounded-full bg-primary/10 h-8 w-8 mr-2" />
      <div className="h-3 bg-primary/10 rounded w-32" />
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
    <section className="container mx-auto px-4 py-8 fade-in">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 slide-down">
          <Link href={`/articles/${featuredArticle.slug.current}`} className="group">
            <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-md">
              <CustomImage
                src={imageUrl}
                alt={featuredArticle.title || "Article mis en avant"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="text-secondary">
                  <div className="text-sm mb-2 opacity-90 flex items-center gap-2">
                    {featuredArticle.categories?.[0] && (
                      <span className="bg-primary px-3 py-1 rounded-full text-xs shadow-sm">
                        {featuredArticle.categories[0].title}
                      </span>
                    )}
                    <span className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-secondary/90 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm opacity-90 line-clamp-2">{featuredArticle.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-secondary">
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
        <div className="md:col-span-2 space-y-4 slide-up">
          {sidebarArticles.map((article, index) => (
            <div key={article._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <ArticleCard article={article} variant="horizontal" />
            </div>
          ))}
          <Link 
            href="/articles" 
            className="inline-flex items-center text-primary text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Voir tous les articles <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ArticleCard = ({ article, variant = "vertical" }: { article: Post; variant?: "vertical" | "horizontal" }) => (
  <Link
    href={`/articles/${article.slug.current}`}
    className={`group block bg-primary/2 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
      variant === "horizontal" ? "p-4" : ""
    }`}
  >
    {variant === "horizontal" ? (
      <div className="flex gap-4">
        <div className="relative w-24 h-20 overflow-hidden rounded-xl flex-shrink-0">
          {article.mainImage && (
            <CustomImage
              src={urlForImage(article.mainImage).width(200).height(150).url()}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="100px"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="text-xs text-primary/70 mb-1">
            {article.categories?.[0] && (
              <span className="text-primary font-medium mr-2">{article.categories[0].title}</span>
            )}
            {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
          </div>
          <h3 className="font-medium text-base text-primary line-clamp-2 group-hover:text-primary/80 transition-colors">
            {article.title}
          </h3>
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        <div className="relative w-full h-52 overflow-hidden">
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
            <div className="absolute top-3 left-3 bg-primary text-secondary text-xs px-3 py-1 rounded-full shadow-sm">
              {article.categories[0].title}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs text-primary/70 mb-2">
            {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
          </div>
          <h3 className="font-medium text-lg text-primary group-hover:text-primary/80 line-clamp-2 transition-colors">
            {article.title}
          </h3>
          <p className="text-primary/70 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
        </div>
      </div>
    )}
  </Link>
);

const CategoriesSection = ({ categories }: { categories: Category[] }) => (
  <section className="border-y border-primary/10 py-4 sticky top-0 bg-white z-10 slide-down">
    <div className="container mx-auto px-4">
      <div className="flex overflow-x-auto gap-4 scrollbar-hide py-1">
        <Link
          href="/articles"
          className="whitespace-nowrap px-4 py-2 rounded-full bg-primary text-secondary text-sm font-medium flex-shrink-0 shadow-sm hover:bg-primary/90 transition-all duration-300"
        >
          À la une
        </Link>
        {categories.map((category) => (
          <Link
            href={`/rubriques/${category.slug.current}`}
            key={category._id}
            className="whitespace-nowrap px-4 py-2 rounded-full bg-primary/2 hover:bg-primary/10 text-primary text-sm font-medium flex-shrink-0 transition-all duration-300 shadow-sm"
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
    <h2 className="text-2xl font-bold text-primary flex items-center">
      <span className="inline-block w-2 h-6 bg-primary mr-3 rounded-full" />
      {title}
    </h2>
    <Link 
      href={link} 
      className="text-sm text-primary/70 flex items-center hover:text-primary transition-colors"
    >
      {linkText} <ChevronRight className="h-4 w-4 ml-1" />
    </Link>
  </div>
);

const TrendingSection = ({ articles }: { articles: Post[] }) => {
  const trendingArticles = articles.filter((post) => 
    post.categories?.some((cat) => cat.title === "Tendances")
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <SectionHeader title="Actualités tendance" link="/rubriques/tendances" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trendingArticles.length > 0 ? (
          trendingArticles.map((article) => (
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
};

const LatestNewsSection = ({ articles }: { articles: Post[] }) => {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 5);

  return (
    <section className="container mx-auto px-4 py-8">
      <SectionHeader title="Dernières nouvelles" link="/articles" />
      <div className="grid md:grid-cols-2 gap-8">
        {featuredArticle && (
          <div>
            <Link href={`/articles/${featuredArticle.slug.current}`} className="group block">
              <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md">
                {featuredArticle.mainImage && (
                  <Image
                    src={urlForImage(featuredArticle.mainImage).width(800).height(600).url()}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {featuredArticle.categories?.[0] && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {featuredArticle.categories[0].title}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {new Date(featuredArticle.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-red-600 transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">{featuredArticle.excerpt}</p>
            </Link>
          </div>
        )}
        <div className="space-y-4">
          {otherArticles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
};


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
  <section className="bg-primary/2 py-16 slide-up">
    <div className="container mx-auto px-4">
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
      {/* Articles */}
{/*       <HeroSection featuredArticle={featuredArticle} sidebarArticles={sidebarArticles} />
      <TrendingSection articles={trendingArticles} />
      <LatestNewsSection articles={latestArticles} />
      <RegionalNewsSection articles={regionalArticles} /> */}

      {/* Catégories */}
{/*       <CategoriesSection categories={categories} /> */}

      {/* Autres */}
      {/* <EventSection /> */}
      <NewsletterSection />
    </>
  );
};

const Banner = () => (
  <div className="w-full bg-gradient-to-r from-primary to-primary/90 py-2 slide-down mt-16 rounded-b-3xl shadow-md">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-secondary/20 flex items-center justify-center shadow-sm">
            <span className="text-secondary text-base">📰</span>
          </div>
          <div>
            <h2 className="text-secondary text-base font-bold">Restez informé de l'actualité</h2>
            <p className="text-secondary/90 text-xs">Les dernières nouvelles et analyses en temps réel</p>
          </div>
        </div>
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-1 bg-secondary text-primary px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-secondary/90 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Découvrir nos articles
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  </div>
);

const HomeSkeleton = () => (
  <>
    <div className="w-full bg-primary/10 py-2 mt-16 rounded-b-3xl animate-pulse">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-primary/20" />
            <div className="space-y-1.5">
              <div className="h-4 bg-primary/20 rounded-xl w-40" />
              <div className="h-3 bg-primary/20 rounded-xl w-56" />
            </div>
          </div>
          <div className="h-8 bg-primary/20 rounded-xl w-40" />
        </div>
      </div>
    </div>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/2 to-white">
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
