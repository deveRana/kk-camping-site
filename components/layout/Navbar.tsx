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
      ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-dark'
      : 'bg-transparent'
    : 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-dark sticky top-0';

  const logoColor = isHome && !isScrolled ? 'text-white' : 'text-terracotta';
  const linkColor = isHome && !isScrolled ? 'text-white/90 hover:text-amber-warm' : 'text-terracotta-deep hover:text-terracotta';
  const menuIconColor = isHome && !isScrolled ? 'text-white' : 'text-terracotta-deep';

  return (
    <header className={`${isHome ? 'fixed top-0 left-0 right-0' : 'sticky top-0'} z-40 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className={`font-display text-2xl md:text-3xl font-bold tracking-tight ${logoColor} transition`}>
            LakeStay
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link href="/properties" className={`${linkColor} transition`}>
              Stays
            </Link>
            <Link href="/gallery" className={`${linkColor} transition`}>
              Gallery
            </Link>
            <Link href="/about" className={`${linkColor} transition`}>
              About Us
            </Link>
            <Link href="/blogs" className={`${linkColor} transition`}>
              Blogs
            </Link>
            <Link href="/faq" className={`${linkColor} transition`}>
              FAQ
            </Link>
            <Link href="/contact" className={`${linkColor} transition`}>
              Contact
            </Link>
            <Link href="/my-bookings" className={`${linkColor} transition`}>
              My Bookings
            </Link>
            <Link
              href="/properties"
              className="bg-terracotta hover:bg-terracotta-dark text-white px-5 py-2.5 rounded-xl font-semibold shadow transition active:scale-95"
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
          <div className="md:hidden bg-cream border-t border-cream-dark px-4 py-4 space-y-3 rounded-b-2xl shadow-xl animate-fadeIn">
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              Stays
            </Link>

            <Link
              href="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              About Us
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              Blogs
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              Contact
            </Link>
            <Link
              href="/my-bookings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-terracotta-deep font-semibold"
            >
              My Bookings
            </Link>
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-terracotta text-white py-3 rounded-xl font-semibold shadow mt-2"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
