import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/booking/confirmed', '/booking/invoice'],
      },
    ],
    sitemap: 'https://lakeorastay.com/sitemap.xml',
  };
}
