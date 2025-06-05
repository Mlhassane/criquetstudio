import Link from 'next/link';

// Icônes sociales
const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const LinkedInIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Composant pour les liens sociaux
const SocialLink = ({ href, icon: Icon, color }: { href: string; icon: any; color: string }) => (
  <Link 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full transition-all duration-300 hover:bg-${color}-100/10 group`}
  >
    <Icon className={`h-5 w-5 text-${color}-500 group-hover:text-${color}-400`} />
  </Link>
);

// Composant pour les liens de navigation
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="hover:text-white transition-colors text-sm">
      {children}
    </Link>
  </li>
);

// Composant pour les informations de contact
const ContactItem = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <li className="flex items-start space-x-3">
    <Icon className="w-5 h-5 mt-0.5 text-gray-400" />
    {children}
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos - élargir légèrement */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-white text-lg font-bold">Criquet Studio</h3>
            <p className="text-sm text-gray-400 max-w-md">
              Votre source d'information fiable sur l'actualité nigérienne et internationale.
              Nous vous apportons des nouvelles fraîches et pertinentes chaque jour.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://www.facebook.com/share/1EgUaU4H5n/" icon={FacebookIcon} color="blue" />
              <SocialLink href="https://www.tiktok.com/@criquet_broadcast_studio" icon={TikTokIcon} color="black" />
              <SocialLink href="https://www.linkedin.com/posts/criquetbroadcaststudio_paixducagbur-respectavanttout-activity-7334212291971756032-11r5" icon={LinkedInIcon} color="blue" />
              <SocialLink href="https://www.youtube.com/@CriquetStudio" icon={YoutubeIcon} color="red" />
            </div>
          </div>

          {/* Navigation rapide - centrer */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <NavLink href="/articles">Articles</NavLink>
              <NavLink href="/rubriques">Rubriques</NavLink>
              <NavLink href="/a-propos">À propos</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </ul>
          </div>

          {/* Contact - élargir légèrement */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <ContactItem icon={MapPinIcon}>
                <span className="text-sm">Soleil d'Afriques, Niamey, Niger</span>
              </ContactItem>
              <ContactItem icon={MailIcon}>
                <a href="mailto:contact@criquetstudio.com" className="text-sm hover:text-white transition-colors">
                  contact@criquetstudio.com
                </a>
              </ContactItem>
              <ContactItem icon={PhoneIcon}>
                <a href="tel:+22784483737" className="text-sm hover:text-white transition-colors">
                  +227 84483737
                </a>
              </ContactItem>
            </ul>
          </div>
        </div>

        {/* Barre de séparation - ajuster l'espacement */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Criquet Studio. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="text-sm text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-sm text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/conditions-utilisation" className="text-sm text-gray-400 hover:text-white transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Icônes pour les informations de contact
const MapPinIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MailIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default Footer;