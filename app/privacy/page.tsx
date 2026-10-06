'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
        Privacy Policy
      </h1>

      <div className="bg-white rounded-2xl p-8 border border-mist space-y-6 text-sm text-forest-deep/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">1. Information We Collect</h2>
          <p>
            We collect guest contact details (name, email address, phone number) when you make a campsite reservation or send an inquiry. We use this data solely to process your booking and communicate arrival details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">2. Payment Security</h2>
          <p>
            Payment transactions are processed securely through PCI-DSS compliant payment gateways (Razorpay/UPI). Lakeora does not store raw credit card numbers or banking PINs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">3. Data Sharing &amp; Third Parties</h2>
          <p>
            Your information is never sold to third-party advertisers. Property host managers receive relevant contact data only for check-in verification.
          </p>
        </section>
      </div>
    </div>
  );
}
