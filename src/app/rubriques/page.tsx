import { sanityClient } from "@/lib/sanity"
import { categoriesQuery } from "@/lib/querie"
import { Category } from "@/types/post"
import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import "@/style/animation.css" // Assurez-vous que ce fichier existe
import { Suspense } from "react"

// Composant skeleton pour une catégorie
function CategorySkeleton() {
  return (
    <div className="p-8 rounded-2xl bg-white shadow-md animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-xl bg-gray-200 h-12 w-12"></div>
        <div className="h-7 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      <div className="h-5 bg-gray-200 rounded w-4/5 mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      
      <div className="pt-4 border-t border-gray-100 mt-6">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-28"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

// Composant skeleton pour le header
function HeaderSkeleton() {
  return (
    <div className="mb-16 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-12"></div>
      
      <div className="text-center mt-12">
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
        <div className="w-24 h-1 bg-gray-200 mx-auto mt-8"></div>
      </div>
    </div>
  )
}

// Composant skeleton pour la page entière
function CategoriesPageSkeleton() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <HeaderSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <CategorySkeleton key={index} />
        ))}
      </div>
    </main>
  )
}

// Composant principal avec les données chargées
async function CategoriesContent() {
  let categories: Category[] = []

  try {
    categories = await sanityClient.fetch(categoriesQuery)
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error)
  }

  return (
    <main className="p-6 max-w-7xl mx-auto fade-in">
      <div className="mb-16 slide-down">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </Link>
        
        <div className="text-center mt-12">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 tracking-tight">Explorez nos rubriques</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plongez dans nos différentes catégories pour découvrir les derniers articles.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-8"></div>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl text-gray-500 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-2xl font-medium">Aucune catégorie disponible</p>
          <p className="mt-3 text-lg">Nos équipes travaillent à ajouter du contenu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link
              href={`/rubriques/${cat.slug?.current}`}
              key={cat._id}
              className="group block p-8 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 category-card overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-5 transition-all duration-700"></div>
              
              <div className="flex items-center gap-3 mb-5 relative">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors duration-300">
                  <BadgeCheck className="h-7 w-7 group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                  {cat.title}
                </h2>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">
                {cat.description ?? "Découvrez tous les articles de cette rubrique."}
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                    Articles disponibles
                  </span>
                  
                  <span className="flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform duration-300">
                    Explorer
                    <svg 
                      className="w-5 h-5 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<CategoriesPageSkeleton />}>
      <CategoriesContent />
    </Suspense>
  )
}