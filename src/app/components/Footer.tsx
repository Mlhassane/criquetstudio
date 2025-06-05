import Link from 'next/link';
import { FacebookIcon, YoutubeIcon, TikTokIcon, LinkedInIcon } from './SocialIcons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-4">Criquet Studio</h3>
            <p className="text-sm">
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

          {/* Navigation rapide */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/rubriques" className="hover:text-white transition-colors">
                  Rubriques
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories populaires */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rubriques/politique" className="hover:text-white transition-colors">
                  Politique
                </Link>
              </li>
              <li>
                <Link href="/rubriques/economie" className="hover:text-white transition-colors">
                  Économie
                </Link>
              </li>
              <li>
                <Link href="/rubriques/societe" className="hover:text-white transition-colors">
                  Société
                </Link>
              </li>
              <li>
                <Link href="/rubriques/culture" className="hover:text-white transition-colors">
                  Culture
                </Link>
              </li>
              <li>
                <Link href="/rubriques/sport" className="hover:text-white transition-colors">
                  Sport
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Soleil d'Afriques, Niamey, Niger</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@criquetstudio.com" className="hover:text-white transition-colors">
                  contact@criquetstudio.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+22784483737" className="hover:text-white transition-colors">
                  +227 84483737
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Criquet Studio. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
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

// Composant pour les liens sociaux
const SocialLink = ({ href, icon: Icon, color }: { href: string; icon: any; color: string }) => (
  <Link 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full transition-all duration-300 hover:bg-${color}-100 group`}
  >
    <Icon className={`h-5 w-5 text-${color}-500 group-hover:text-${color}-600`} />
  </Link>
);

export default Footer; 