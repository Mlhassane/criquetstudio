// frontend/lib/sanity.image.ts
import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { projectId, dataset } from './sanity.config'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source)
}
