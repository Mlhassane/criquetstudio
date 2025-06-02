'use client'

import React from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // Ici, vous devrez implémenter la logique d'envoi à votre API
      // Pour l'instant, on simule un délai
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setMessage('Merci pour votre inscription !')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
      <p className="text-gray-600 mb-6">
        Abonnez-vous à notre newsletter hebdomadaire et recevez les dernières informations directement dans votre boîte mail
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email" 
          className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600"
          required 
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          className={`bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors ${
            status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Envoi...' : "S'abonner"}
        </button>
      </form>
      {message && (
        <p className={`text-sm mt-3 ${
          status === 'success' ? 'text-green-600' : 
          status === 'error' ? 'text-red-600' : 
          'text-gray-500'
        }`}>
          {message}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-3">
        En vous inscrivant, vous acceptez notre politique de confidentialité
      </p>
    </div>
  )
} 