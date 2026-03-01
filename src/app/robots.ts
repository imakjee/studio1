import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/checkout/', '/login/', '/register/'],
    },
    sitemap: 'https://hostxeon.com/sitemap.xml',
  };
}
