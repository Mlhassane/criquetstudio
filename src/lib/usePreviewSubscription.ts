import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getClient } from './sanity.preview'

export function usePreviewSubscription<T>(
  initialData: T,
  query: string,
  queryParams: Record<string, any> = {}
) {
  const [data, setData] = useState<T>(initialData)
  const router = useRouter()

  useEffect(() => {
    // Ne pas souscrire si nous ne sommes pas en mode preview
    if (!router.isPreview) return

    const client = getClient(true)
    const subscription = client
      .listen(query, queryParams)
      .subscribe((update) => {
        if (update.transition === 'update') {
          // Recharger les données quand il y a une mise à jour
          client.fetch(query, queryParams).then(setData)
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [query, JSON.stringify(queryParams), router.isPreview])

  return data
} 