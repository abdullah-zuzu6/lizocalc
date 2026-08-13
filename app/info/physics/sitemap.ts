// app/info/physics/sitemap.ts
import { MetadataRoute } from 'next';
import { infoPages } from '@/lib/info-content';

const BASE_URL = 'https://www.lizocalc.com';


        

export default function sitemap(): MetadataRoute.Sitemap {
  return infoPages
    .filter((page) => page.category === 'physics')
    .map((page) => ({
      url: page.slug
        ? `${BASE_URL}/info/${page.category}/${page.subcategory}/${page.slug}`
        : `${BASE_URL}/info/${page.category}/${page.subcategory}`,
      lastModified: page.lastModified ? new Date(page.lastModified) : new Date(),
      changeFrequency: 'weekly',
      priority: page.slug ? 0.8 : 0.9, // index page gets a slightly higher priority
    }));
}