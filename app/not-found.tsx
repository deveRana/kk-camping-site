'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-mist mx-auto flex items-center justify-center text-4xl text-forest">
        ⛺
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
        404 — Page Not Found
      </h1>

      <p className="text-base text-forest-deep/75 max-w-md mx-auto leading-relaxed">
        Looks like you wandered off the campsite trail! The page or stay you are looking for doesn&apos;t exist or has moved.
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link href="/">
          <Button variant="primary" size="md">
            Return to Home Page
          </Button>
        </Link>

        <Link href="/properties">
          <Button variant="outline" size="md">
            Browse Stays
          </Button>
        </Link>
      </div>
    </div>
  );
}
