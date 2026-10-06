'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-deep text-paper pt-16 pb-12 border-t border-forest-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-paper/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="Lakeora home">
              <img src="/logos/lakeora-light.png" alt="Lakeora Cafe logo" className="h-44 w-auto" />
            </Link>
            <p className="text-sm text-paper/80 leading-relaxed max-w-sm">
              Premium lakeside glamping, cozy wooden cottages, and camping tents at Pawna Lake near Lonavala. Bonfires, kayaking, BBQ, and memorable sunsets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-sage mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>
                <Link href="/properties" className="hover:text-sage transition">
                  Browse Stays
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sage transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sage transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-sage transition">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Customer Care */}
          <div>
            <h4 className="font-display text-lg font-semibold text-sage mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>
                <Link href="/my-bookings" className="hover:text-sage transition">
                  Manage Bookings
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sage transition">
                  FAQs & Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sage transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-sage transition">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="font-display text-lg font-semibold text-sage mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>
                <Link href="/terms" className="hover:text-sage transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sage transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-sage transition">
                  Refund Rules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-paper/60">
          <p>© {new Date().getFullYear()} Lakeora Campsites. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Pawna Lake · Lonavala · Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
