'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine styling based on page and scroll
  const navBg = isHome
    ? isScrolled
      ? 'bg-paper/95 backdrop-blur-md shadow-sm border-b border-mist'
      : 'bg-transparent'
    : 'bg-paper/95 backdrop-blur-md shadow-sm border-b border-mist sticky top-0';

  const logoColor = isHome && !isScrolled ? 'text-white' : 'text-forest';
  const linkColor = isHome && !isScrolled ? 'text-white/90 hover:text-sage' : 'text-forest-deep hover:text-forest';
  const menuIconColor = isHome && !isScrolled ? 'text-white' : 'text-forest-deep';

  return (
    <header className={`${isHome ? 'fixed top-0 left-0 right-0' : 'sticky top-0'} z-40 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2.5 font-display text-3xl md:text-4xl font-semibold tracking-wide ${logoColor} transition`}>
            <img
              src={isHome && !isScrolled ? '/logos/lakeora-mark-light.png' : '/logos/lakeora-mark-dark.png'}
              alt="Lakeora logo"
              className="h-10 md:h-12 w-auto"
            />
            Lakeora
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link href="/properties" className={`${linkColor} transition`}>
              Stays
            </Link>
            <Link href="/gallery" className={`${linkColor} transition`}>
              Gallery
            </Link>
            <Link href="/my-bookings" className={`${linkColor} transition`}>
              My Bookings
            </Link>
            <Link
              href="/properties"
              className="bg-forest hover:bg-forest-dark text-white px-5 py-2.5 rounded-xl font-semibold shadow transition active:scale-95"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${menuIconColor} focus:outline-none`}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-paper border-t border-mist px-4 py-4 space-y-3 rounded-b-2xl shadow-xl animate-fadeIn">
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-forest-deep font-semibold"
            >
              Stays
            </Link>

            <Link
              href="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-forest-deep font-semibold"
            >
              Gallery
            </Link>
            <Link
              href="/my-bookings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-forest-deep font-semibold"
            >
              My Bookings
            </Link>
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-forest text-white py-3 rounded-xl font-semibold shadow mt-2"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
