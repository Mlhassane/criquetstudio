'use client'

import { motion } from "framer-motion"
import { useState } from "react"

// Icônes personnalisées
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  const socialLinks = [
    { name: "YouTube", icon: <YouTubeIcon />, href: "https://www.youtube.com/@CriquetStudio" },
    { name: "Facebook", icon: <FacebookIcon />, href: "https://www.facebook.com/share/1EgUaU4H5n/" },
    { name: "LinkedIn", icon: <LinkedInIcon />, href: "https://www.linkedin.com/company/criquet-studio" },
    { name: "TikTok", icon: <TikTokIcon />, href: "https://www.tiktok.com/@criquetstudio" }
  ]

  const [email, setEmail] = useState("")

  return (
    <footer className="relative overflow-hidden bg-white text-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-2xl mb-4 text-primary">Criquet Broadcast Studio</h3>
            <p className="text-gray-600 leading-relaxed">Le média du bien-être.</p>
            <div className="w-16 h-1 bg-primary rounded-full mt-4"></div>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            aria-label="Liens d’information"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-xl mb-6 text-primary">À propos</h3>
            <ul className="space-y-3">
              {[
                { text: "Qui sommes-nous", href: "/a-propos" },
                { text: "Nous contacter", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="group inline-flex items-center text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Newsletter + Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-xl mb-6 text-primary">Restez connectés</h3>

            {/* Newsletter */}
            <form 
              onSubmit={(e) => { e.preventDefault(); setEmail(""); alert("Merci de votre inscription !") }}
              className="flex gap-2 mb-6"
            >
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email" 
                className="flex-1 px-4 py-2 rounded-lg border focus:ring-primary focus:outline-none"
                required
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80">
                S’abonner
              </button>
            </form>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="group relative p-2 md:p-3 rounded-full bg-primary/5 border border-black/10 text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bas de page */}
        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2025 Criquet Broadcast Studio. Tous droits réservés.</p>
          <p>
            Fait avec 🧡 par{" "}
            <a 
              href="https://sorcidigit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Sorci Digit
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
