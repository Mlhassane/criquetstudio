"use client";
import { fr } from "date-fns/locale"; // 👈 Import de la locale française

import { motion } from "framer-motion";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bookmark, Calendar, Clock, Share, User } from "lucide-react";

interface AnimatedPostContentProps {
  post: {
    title: string;
    publishedAt: string;
    author: string;
    mainImage?: {
      asset: {
        url: string;
      };
    };
    body: any;
    category?: {
      title: string;
    };
  };
}

export default function AnimatedPostContent({ post }: AnimatedPostContentProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <article className=" pb-16">
          {post.mainImage && (
            <div className="relative w-full h-[40vh] md:h-[60vh]">
              <Image
                src={post.mainImage.asset.url || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}

          <header className="container mx-auto px-6 -mt-20 relative z-10">
            <div className="bg-white p-6 md:p-10 max-w-4xl mx-auto shadow-sm rounded-lg">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-black/60 hover:text-black mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Page Accueil
              </button>

              <div className="flex items-center gap-3 mb-4">
                {post.category?.title && (
                  <span className="bg-black text-white px-3 py-1 rounded-full">
                    {post.category.title}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.publishedAt), "dd MMMM yyyy", { locale: fr })}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Temps de lecture
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6">{post.title}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="font-semibold">{post.author}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-6 py-10">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <PortableText value={post.body} />
            </div>
          </div>
        </article>
      </motion.div>
    </main>
  );
}
