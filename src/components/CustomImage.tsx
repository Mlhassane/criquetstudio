'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CustomImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

const CustomImage = ({ src, alt, ...props }: CustomImageProps) => {
  const [error, setError] = useState(false)
  const fallbackImage = '/placeholder-image.jpg' // Add this image to your public folder

  return (
    <Image
      src={error ? fallbackImage : src}
      alt={alt}
      {...props}
      onError={() => setError(true)}
    />
  )
}

export default CustomImage