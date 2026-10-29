import { getSiteSettings } from '@/lib/sanity/data';
import { ContactView } from './ContactView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Lakeora Pawna Lake',
  description:
    'Get in touch with Lakeora for bookings, group camping inquiries, or special requests. Phone, email, and location details. We are here to help plan your perfect lakeside getaway.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactView settings={settings} />;
}
