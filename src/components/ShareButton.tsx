'use client'

import { FC, memo } from 'react'

interface ShareButtonProps {
  title: string
  className?: string
}

const ShareButton: FC<ShareButtonProps> = memo(({ title, className }) => {
  const handleShare = async () => {
    if (typeof navigator.share !== 'undefined') {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        })
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Lien copié dans le presse-papier !')
      } catch (error) {
        console.error('Error copying to clipboard:', error)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={className}
      title="Partager cet article"
    >
      Partager
    </button>
  )
})

ShareButton.displayName = 'ShareButton'

export default ShareButton