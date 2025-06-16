'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type PreviewContextType = {
  isPreview: boolean
  togglePreview: () => void
}

const PreviewContext = createContext<PreviewContextType>({
  isPreview: false,
  togglePreview: () => {},
})

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si nous sommes en mode preview au chargement
    const checkPreview = async () => {
      try {
        const response = await fetch('/api/preview/status')
        const { isPreview } = await response.json()
        setIsPreview(isPreview)
      } catch (error) {
        console.error('Erreur lors de la vérification du mode preview:', error)
      }
    }

    checkPreview()
  }, [])

  const togglePreview = async () => {
    try {
      const response = await fetch('/api/preview/toggle')
      const { isPreview: newPreviewState } = await response.json()
      setIsPreview(newPreviewState)
      router.refresh() // Rafraîchir la page pour recharger les données
    } catch (error) {
      console.error('Erreur lors du basculement du mode preview:', error)
    }
  }

  return (
    <PreviewContext.Provider value={{ isPreview, togglePreview }}>
      {children}
      {isPreview && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={togglePreview}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
          >
            Quitter le mode Preview
          </button>
        </div>
      )}
    </PreviewContext.Provider>
  )
}

export const usePreview = () => useContext(PreviewContext) 