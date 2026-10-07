import { getFaqs } from '@/lib/sanity/data';
import { FaqView } from './FaqView';

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await getFaqs();
  return <FaqView faqs={faqs} />;
}
