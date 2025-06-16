import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, Calendar, ChevronRight, Clock, Share2, User } from "lucide-react";
import { Suspense } from "react";
import { sanityClient } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity.image";
import { PortableText } from "next-sanity";
import { postBySlugQuery, postsQuery } from "@/lib/querie";
import { Post } from "@/types/post";
import { notFound } from "next/navigation";

// Define the props type for the dynamic route
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Skeleton component for article loading state
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
);

// Main content component
const ArticleContent = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post: Post = await sanityClient.fetch(postBySlugQuery, { slug });

  // Handle case where post is not found
  if (!post) {
    notFound();
  }

  // Fetch related posts based on categories
  let relatedPosts: Post[] = [];
  if (post.categories && post.categories.length > 0) {
    const categoryIds = post.categories.map((cat) => cat._id);
    const allPosts: Post[] = await sanityClient.fetch(postsQuery);
    relatedPosts = allPosts
      .filter(
        (p) =>
          p._id !== post._id &&
          p.categories?.some((cat) => categoryIds.includes(cat._id))
      )
      .slice(0, 3);
  }

  // Fetch recent posts excluding the current post
  const allPosts: Post[] = await sanityClient.fetch(postsQuery);
  const recentPosts = allPosts.filter((p) => p._id !== post._id).slice(0, 4);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const estimatedReadingTime = post.body
    ? Math.ceil(
        post.body.reduce(
          (count, block) =>
            block.children
              ? count +
                block.children.reduce(
                  (sum, child) => sum + (child.text ? child.text.split(" ").length : 0),
                  0
                )
              : count,
          0
        ) / 200
      )
    : 5; // 200 words per minute average

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/2 to-white fade-in">
      {/* Hero Image avec overlay */}
      {post.mainImage && (
        <div className="relative w-full h-[40vh] md:h-[60vh] group">
          <Image
            src={urlForImage(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/60" />
        </div>
      )}

      <div className="container mx-auto px-4 relative">
        {/* Carte principale de l'article */}
        <div className="bg-white p-6 md:p-10 max-w-4xl mx-auto shadow-lg rounded-2xl -mt-20 relative z-10 slide-up">
          {/* Navigation retour */}
          <div className="flex items-center text-sm text-primary/70 mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Catégorie et métadonnées */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {post.categories && post.categories[0] && (
              <Link
                href={`/rubriques/${post.categories[0].slug.current}`}
                className="bg-primary text-secondary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                {post.categories[0].title}
              </Link>
            )}
            <span className="flex items-center gap-1 text-primary/70 text-sm bg-primary/2 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-primary/70 text-sm bg-primary/2 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              {estimatedReadingTime} min de lecture
            </span>
          </div>

          {/* Titre de l'article */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary tracking-tight">
            {post.title}
          </h1>

          {/* Auteur et actions */}
          <div className="flex items-center justify-between pb-6 border-b border-primary/10">
            <div className="flex items-center gap-3">
              {post.author?.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
                  <Image
                    src={urlForImage(post.author.image).width(100).height(100).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
              )}
              <span className="font-medium text-primary">{post.author?.name || "Rédaction"}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-primary/2 hover:bg-primary/10 flex items-center gap-1 text-primary text-sm transition-all duration-300 hover:scale-105 shadow-sm">
                <Share2 className="w-5 h-5" />
                Partager
              </button>
              {/* <button className="p-2 rounded-full bg-primary/2 hover:bg-primary/10 flex items-center gap-1 text-primary text-sm transition-all duration-300 hover:scale-105 shadow-sm">
                <Bookmark className="w-5 h-5" />
                Sauvegarder
              </button> */}
            </div>
          </div>

          {/* Corps de l'article */}
          <div className="prose prose-lg max-w-none py-8 prose-headings:text-primary prose-p:text-primary/80 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:shadow-md">
            {post.body && <PortableText value={post.body} />}
          </div>

          {/* Vidéo YouTube (si disponible) */}
          {post.youtubeUrl && (
            <div className="relative w-full aspect-video my-8 group">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(post.youtubeUrl)}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <a
                  href={post.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-primary text-secondary px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                      Voir sur YouTube
                    </span>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Tags/Catégories */}
          {post.categories && post.categories.length > 0 && (
            <div className="pt-6 border-t border-primary/10">
              <h4 className="text-sm font-medium text-primary/70 mb-3">Thématiques</h4>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    href={`/rubriques/${category.slug.current}`}
                    key={category._id}
                    className="bg-primary/2 hover:bg-primary/10 text-primary text-sm px-3 py-1 rounded-full transition-colors shadow-sm"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Articles similaires */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16 slide-up">
            <h2 className="text-2xl font-bold mb-8 text-primary flex items-center">
              <span className="inline-block w-2 h-6 bg-primary mr-3 rounded-full"></span>
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((article) => (
                <Link
                  href={`/articles/${article.slug.current}`}
                  key={article._id}
                  className="group block bg-primary/2 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    {article.mainImage ? (
                      <Image
                        src={urlForImage(article.mainImage).width(400).height(300).url()}
                        alt={article.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary/50">Image non disponible</span>
                      </div>
                    )}
                    {article.categories && article.categories[0] && (
                      <div className="absolute bottom-0 left-0 m-3">
                        <span className="bg-primary text-secondary text-xs px-3 py-1 rounded-full shadow-sm">
                          {article.categories[0].title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary line-clamp-2 group-hover:text-primary/80 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center mt-3 text-xs text-primary/70">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles récents */}
        <div className="max-w-4xl mx-auto mt-16 mb-16 slide-up">
          <h2 className="text-2xl font-bold mb-8 text-primary flex items-center">
            <span className="inline-block w-2 h-6 bg-primary mr-3 rounded-full"></span>
            À ne pas manquer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((article) => (
              <Link
                href={`/articles/${article.slug.current}`}
                key={article._id}
                className="group block bg-primary/2 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-4">
                  {article.mainImage ? (
                    <div className="relative w-28 h-24 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
                      <Image
                        src={urlForImage(article.mainImage).width(200).height(150).url()}
                        alt={article.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                        sizes="100px"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-24 bg-primary/10 flex-shrink-0 rounded-xl flex items-center justify-center">
                      <span className="text-primary/50 text-xs">Pas d'image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center text-xs text-primary/70 mb-1">
                      {article.categories && article.categories[0] && (
                        <span className="text-primary mr-2 font-medium">
                          {article.categories[0].title}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <h3 className="font-medium text-primary line-clamp-2 group-hover:text-primary/80 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/articles"
              className="inline-block bg-primary text-secondary px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              Voir tous les articles
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-4xl mx-auto mb-16 py-12 px-8 bg-primary/2 rounded-2xl shadow-md slide-up">
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
    </div>
  );
};

// Generate static parameters for the dynamic route
export async function generateStaticParams() {
  const posts: Post[] = await sanityClient.fetch(`*[_type == "post"]{ slug }`);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Ajoutez cette fonction utilitaire en haut du fichier
const getYoutubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default async function ArticlePage({ params }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/2 to-white">
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-8">
              <ArticleSkeleton />
            </div>
          }
        >
          <ArticleContent params={params} />
        </Suspense>
      </main>
    </div>
  );
}