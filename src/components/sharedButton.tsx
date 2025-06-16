// src/components/ShareButtons.tsx
"use client"

import { useEffect, useState } from "react"

type Props = {
  title: string
}

export default function ShareButtons({ title }: Props) {
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex flex-wrap gap-4 pt-6 border-t mt-10">
      <button onClick={handleCopy} className="px-4 py-2 border rounded text-sm hover:bg-gray-100">
        Copier le lien
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-red-500 hover:underline"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-red-600 hover:underline"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-red-700 hover:underline"
      >
        LinkedIn
      </a>
    </div>
  )
}
