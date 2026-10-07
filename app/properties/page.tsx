import { getProperties } from '@/lib/sanity/data';
import { PropertiesView } from './PropertiesView';

export const revalidate = 60;

export default async function PropertiesPage() {
  const properties = await getProperties();
  return <PropertiesView properties={properties} />;
}
