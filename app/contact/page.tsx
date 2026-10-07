import { getSiteSettings } from '@/lib/sanity/data';
import { ContactView } from './ContactView';

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactView settings={settings} />;
}
