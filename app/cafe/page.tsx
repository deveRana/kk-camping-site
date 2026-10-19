import React from 'react';
import { CafeView } from './CafeView';
import type { Metadata } from 'next';
import { getCafeMenu } from '@/lib/sanity/data';

export const metadata: Metadata = {
  title: 'Lakeside Cafe — Fresh Coffee & Food at Lakeora',
  description:
    'Enjoy fresh coffee, delicious meals, and stunning lake views at Lakeora Cafe. Open all day for breakfast, lunch, snacks, and dinner with indoor & outdoor seating.',
};

export const revalidate = 60;

export default async function CafePage() {
  const menuItems = await getCafeMenu();

  return <CafeView menuItems={menuItems} />;
}
