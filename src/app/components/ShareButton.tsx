'use client'

import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.share({
      title,
      text,
      url
    })
  }

  return (
    <button 
      className="text-white/80 hover:text-white transition-colors"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
    </button>
  )
} 