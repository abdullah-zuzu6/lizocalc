// app/sitemap.ts
import { MetadataRoute } from 'next';
import { calculators } from '@/lib/calculators'; // Assuming this is where your data lives

export default function sitemap(): MetadataRoute.Sitemap {
//   const BASE_URL = 'https://lizocalc.com';

const BASE_URL = 'http://localhost:3000';
  // 1. Static Pages
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.6 },
    { url: '/contact', priority: 0.6 },
    { url: '/privacy', priority: 0.6 },
    { url: '/terms', priority: 0.6 },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page.priority,
  }));

  // 2. Dynamic Calculator Pages
  calculators.forEach((calc) => {
    sitemapEntries.push({
      url: `${BASE_URL}/calculators/${calc.category}/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  return sitemapEntries;
}