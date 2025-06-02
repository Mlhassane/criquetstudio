'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'

export default function QuickSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un article..."
          className="bg-transparent border-none outline-none w-full text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-4 z-50">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Résultats pour "{query}"</p>
            <div className="space-y-1">
              {/* Ici, vous pouvez ajouter la logique de recherche réelle */}
              <Link 
                href={`/recherche?q=${encodeURIComponent(query)}`}
                className="block p-2 hover:bg-gray-50 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                Voir tous les résultats pour "{query}"
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 