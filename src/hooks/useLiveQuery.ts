import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClient } from '@/lib/sanity.preview'

type UseLiveQueryOptions = {
  initialData: any
  query: string
  params?: Record<string, any>
  enabled?: boolean
}

export function useLiveQuery<T>({
  initialData,
  query,
  params = {},
  enabled = true,
}: UseLiveQueryOptions) {
  const [data, setData] = useState<T>(initialData)
  const router = useRouter()
  const searchParams = new URLSearchParams(window.location.search)
  const isPreview = searchParams.get('preview') === 'true'

  useEffect(() => {
    // Ne pas souscrire si le mode preview n'est pas activé ou si enabled est false
    if (!isPreview || !enabled) return

    const client = getClient(true)
    
    // Fonction pour récupérer les données
    const fetchData = async () => {
      try {
        const result = await client.fetch(query, params)
        setData(result)
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
      }
    }

    // Souscription aux changements
    const subscription = client
      .listen(query, params)
      .subscribe((update) => {
        if (update.transition === 'update' || update.transition === 'appear' || update.transition === 'disappear') {
          fetchData()
        }
      })

    // Nettoyage
    return () => {
      subscription.unsubscribe()
    }
  }, [query, JSON.stringify(params), isPreview, enabled])

  return data
} 