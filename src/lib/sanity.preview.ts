import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './sanity.config'

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Important pour le mode preview
  token: process.env.SANITY_API_TOKEN, // Token avec accès en lecture
  perspective: 'previewDrafts', // Active le mode preview
})

// Fonction utilitaire pour basculer entre preview et production
export function getClient(preview = false) {
  const client = preview ? previewClient : createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
  return client
} 