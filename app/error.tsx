'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by error boundary:', error);
    }

    // TODO: Log to Sentry or other error tracking service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="space-y-3">
          <div className="text-6xl">😕</div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-forest-deep">
            Oops! Something went wrong
          </h1>
          <p className="text-forest-deep/70 max-w-md mx-auto">
            We&apos;re sorry, but something unexpected happened. Our team has been notified and we&apos;re working on a fix.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <p className="font-mono text-xs text-red-900 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Go to Homepage</Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-mist max-w-md mx-auto">
          <p className="text-sm text-forest-deep/60">
            If this problem persists, please{' '}
            <Link href="/contact" className="text-forest hover:underline font-semibold">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
