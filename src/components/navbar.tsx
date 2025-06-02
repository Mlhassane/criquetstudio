'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <div className="relative">
      {isSearchOpen ? (
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-gray-100 py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          <Search size={20} />
        </button>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="py-4 bg-white shadow-sm sticky top-0 z-50 relative flex items-center justify-between mx-auto px-4 py-5">
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
            <Image
                  src='/logo_black.png'
                  alt='Logo'
                  width={50}
                  height={50}
                  priority
                />
            </Link>
          </div>
          
          {/* Desktop Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Articles
            </Link>
            <Link href="/rubriques" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Rubriques
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              À propos
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchBar />
            
            {/* Mobile Menu Button - Hidden on desktop */}
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - Only visible when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-4 animate-fadeIn">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/articles" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-lg hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link 
                href="/rubriques" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-lg hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Rubriques
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-lg hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/a-propos" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-lg hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;