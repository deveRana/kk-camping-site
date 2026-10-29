import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — Lakeora',
  description:
    'Learn about how Lakeora uses cookies and similar technologies on our website. Understand what cookies we use and how to control them.',
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
        Cookie Policy
      </h1>

      <div className="bg-white rounded-2xl p-8 border border-mist space-y-6 text-sm text-forest-deep/85 leading-relaxed">
        <p className="text-xs text-forest-deep/60">
          <strong>Last Updated:</strong> October 29, 2026
        </p>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            Cookies We Use
          </h2>

          <h3 className="font-semibold text-forest-deep mt-4 mb-2">1. Essential Cookies (Always Active)</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation, booking flow, and access to secure areas. The website cannot function properly without these cookies.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Session management</li>
            <li>Security and authentication</li>
            <li>Shopping cart functionality</li>
          </ul>

          <h3 className="font-semibold text-forest-deep mt-4 mb-2">2. Analytics Cookies (Optional)</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Google Analytics (if enabled)</li>
            <li>Page visit statistics</li>
            <li>User behavior tracking</li>
          </ul>

          <h3 className="font-semibold text-forest-deep mt-4 mb-2">3. Functional Cookies (Optional)</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering your preferences and choices.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Language preferences</li>
            <li>Region settings</li>
            <li>Accessibility settings</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            Third-Party Cookies
          </h2>
          <p>
            We may use third-party services that set cookies on your device:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Payment Gateway (Razorpay):</strong> For secure payment processing</li>
            <li><strong>Content Management (Sanity):</strong> For managing our content</li>
            <li><strong>Maps (Google Maps):</strong> For displaying location information</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            How to Control Cookies
          </h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies.
            </li>
            <li>
              <strong>Cookie Preferences:</strong> When you first visit our website, you can choose which types of cookies to accept through our cookie consent banner.
            </li>
            <li>
              <strong>Opt-Out Links:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">Google Analytics Opt-out</a></li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            Do Not Track Signals
          </h2>
          <p>
            Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites you do not want your online activities tracked. We respect DNT signals and will not track users who have enabled this setting.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-3">
            Contact Us
          </h2>
          <p>
            If you have any questions about our use of cookies, please contact us:
          </p>
          <ul className="list-none mt-2 space-y-1">
            <li>📧 Email: <a href="mailto:info@lakeorastay.com" className="text-forest hover:underline">info@lakeorastay.com</a></li>
            <li>📞 Phone: <a href="tel:+917499757607" className="text-forest hover:underline">+91 74997 57607</a></li>
            <li>📍 Address: Lakeora, Pawna Lake, Lonavala, Maharashtra</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-mist">
          <p className="text-xs text-forest-deep/60">
            For more information about our data practices, please see our{' '}
            <Link href="/privacy" className="text-forest hover:underline font-semibold">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
