import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

/** Optimised Sanity image URL. Returns '' when the image field is empty. */
export function urlFor(source: SanityImageSource | null | undefined, width = 1200): string {
  if (!source) return '';
  return builder.image(source).width(width).auto('format').fit('max').url();
}
