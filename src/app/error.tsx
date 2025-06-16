'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8 text-red-600">
      <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
      <p className="mb-4">{error.message}</p>
      <button 
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Réessayer encore
      </button>
    </div>
  )
} 