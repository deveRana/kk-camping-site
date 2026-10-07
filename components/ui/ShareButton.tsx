'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/toast/useToast';

export const ShareButton: React.FC<{ label?: string }> = ({ label = 'Share Article' }) => {
  const { showToast } = useToast();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href);
        showToast({ type: 'success', message: 'Link copied to clipboard!' });
      }}
    >
      {label}
    </Button>
  );
};
