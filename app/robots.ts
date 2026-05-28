import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/acceso'],
    },
    sitemap: 'https://tinkilabs.com/sitemap.xml',
  };
}
