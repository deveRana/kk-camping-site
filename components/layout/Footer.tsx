'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/toast/useToast';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast({
      type: 'success',
      message: 'Thank you! You have subscribed to LakeStay weekend offers.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-terracotta-deep text-cream pt-16 pb-12 border-t border-terracotta-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-display text-3xl font-bold text-amber-warm">
              LakeStay
            </Link>
            <p className="text-sm text-cream/80 leading-relaxed max-w-sm">
              Premium lakeside glamping, cozy wooden cottages, and camping tents at Pawna Lake near Lonavala. Bonfires, kayaking, BBQ, and memorable sunsets.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email for deals"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 text-white placeholder:text-cream/50 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-warm border border-white/20 flex-1"
              />
              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-amber-warm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link href="/properties" className="hover:text-amber-warm transition">
                  Browse Stays
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-amber-warm transition">
                  Lake Experiences
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-warm transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-warm transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-amber-warm transition">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Customer Care */}
          <div>
            <h4 className="font-display text-lg font-semibold text-amber-warm mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link href="/my-bookings" className="hover:text-amber-warm transition">
                  Manage Bookings
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-warm transition">
                  FAQs & Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-warm transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-amber-warm transition">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="font-display text-lg font-semibold text-amber-warm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link href="/terms" className="hover:text-amber-warm transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-warm transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-amber-warm transition">
                  Refund Rules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} LakeStay Campsites. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Pawna Lake · Lonavala · Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
