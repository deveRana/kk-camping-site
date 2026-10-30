import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

/**
 * Checks whether the source object is a valid, resolvable Sanity image.
 */
export function isValidSanityImage(source: unknown): boolean {
  if (!source) return false;
  if (typeof source === 'string') return source.trim().length > 0;
  if (typeof source === 'object') {
    const s = source as Record<string, unknown>;
    // Direct reference or document id
    if (typeof s._ref === 'string' && s._ref.length > 0) return true;
    if (typeof s._id === 'string' && s._id.length > 0) return true;
    // Nested asset with _ref, _id, or url
    if (s.asset && typeof s.asset === 'object') {
      const asset = s.asset as Record<string, unknown>;
      if (typeof asset._ref === 'string' && asset._ref.length > 0) return true;
      if (typeof asset._id === 'string' && asset._id.length > 0) return true;
      if (typeof asset.url === 'string' && asset.url.length > 0) return true;
    }
  }
  return false;
}

/** Optimised Sanity image URL. Returns '' when the image field is empty or invalid. */
export function urlFor(source: SanityImageSource | null | undefined, width = 1200): string {
  if (!isValidSanityImage(source)) return '';
  try {
    return builder.image(source!).width(width).auto('format').fit('max').url();
  } catch (error) {
    console.warn('Unable to resolve image URL from source:', source, error);
    return '';
  }
}
