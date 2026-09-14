'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-terracotta-deep">
        Terms &amp; Conditions
      </h1>

      <div className="bg-white rounded-2xl p-8 border border-cream-dark space-y-6 text-sm text-terracotta-deep/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-terracotta-deep">1. Campsite House Rules</h2>
          <p>
            Guests are expected to respect quiet hours after 10:00 PM in consideration of fellow campers. Loud speaker music must be turned off or lowered after 10:00 PM.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-terracotta-deep">2. ID Verification at Check-in</h2>
          <p>
            All adult guests must produce valid government-issued photo identification (Aadhaar, Passport, Driving License) at check-in as mandated by local tourism regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-terracotta-deep">3. Property Safety &amp; Damage</h2>
          <p>
            Guests are responsible for exercising due care around lake shorelines and campfire zones. Any willful damage to tents, furniture, or equipment will be billed at repair cost.
          </p>
        </section>
      </div>
    </div>
  );
}
