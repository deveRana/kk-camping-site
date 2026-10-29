import { getFaqs } from '@/lib/sanity/data';
import { FaqView } from './FaqView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs & Help — Lakeora Pawna Lake Camping',
  description:
    'Frequently asked questions about camping at Pawna Lake. Get answers on booking, check-in times, amenities, food, activities, cancellation policy, and everything you need to know.',
};

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await getFaqs();
  return <FaqView faqs={faqs} />;
}
