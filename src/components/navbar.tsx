'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Gestion du scroll avec debounce
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrolled(window.scrollY > 20);
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Fermeture du menu/recherche avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isMenuOpen || isSearchOpen)) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isSearchOpen]);

  const navLinks: NavLink[] = [
    { name: 'Articles', href: '/articles' },
    { name: 'Rubriques', href: '/rubriques' },
    { name: 'Contact', href: '/contact' },
    { name: 'À propos', href: '/a-propos' },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/95 dark:bg-gray-900/95  shadow-lg' 
          : 'py-4 bg-white dark:bg-gray-900'
      }`}
    >
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg"
      >
        Aller au contenu principal
      </a>

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    src="/logo_black.png"
                    alt="Logo Criquet Studio"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                  Criquet Studio
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Le média du bien-être
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className="relative px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <span>{link.name}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 to-primary/10"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search and Menu Buttons */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '16rem', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button - Mobile & Desktop */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }
              }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Search Bar - Mobile (below navbar) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-2 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay avec animation de fondu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Modal avec animation de scale et fade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                duration: 0.3,
                bounce: 0.1
              }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-[101] overflow-hidden border border-gray-200/50 dark:border-gray-800/50"
              style={{
                maxHeight: 'calc(100vh - 40%)',
                overflowY: 'auto'
              }}
            >
              {/* Header du modal avec gradient */}
              <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/95 dark:from-gray-900 dark:to-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/10 flex items-center justify-center">
                      <Image
                        src="/logo_black.png"
                        alt="Logo"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </div>
                    <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                      Menu
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Contenu du modal */}
              <div className="p-4">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-200">
                            {/* Vous pouvez ajouter des icônes ici pour chaque lien */}
                          </div>
                          <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {link.name}
                          </span>
                        </div>
                        <motion.div
                          className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer du modal */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        © 2024 Criquet Studio
                      </p>
                      <div className="flex items-center gap-4">
                        <Link 
                          href="/contact"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Contact
                        </Link>
                        <Link 
                          href="/a-propos"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          À propos
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <Link href="/mentions-legales" onClick={() => setIsMenuOpen(false)}>
                        Mentions légales
                      </Link>
                      <span>•</span>
                      <Link href="/politique-confidentialite" onClick={() => setIsMenuOpen(false)}>
                        Confidentialité
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;