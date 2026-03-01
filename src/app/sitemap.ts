import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hostxeon.com';

  const pages = [
    '',
    '/hosting',
    '/vps',
    '/wordpress',
    '/dedicated',
    '/cloud',
    '/about',
    '/blog',
    '/contact',
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }));
}
