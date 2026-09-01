// app/info/days/sitemap.ts

import { MetadataRoute } from 'next';
import { daysInfo } from '@/lib/days-info';

const BASE_URL = 'https://www.lizocalc.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return daysInfo.map((page) => ({
    url: page.slug
      ? `${BASE_URL}/info/${page.category}/${page.subcategory}/${page.slug}`
      : `${BASE_URL}/info/${page.category}/${page.subcategory}`,
    lastModified: page.lastModified
      ? new Date(page.lastModified)
      : new Date(),
    changeFrequency: 'weekly',
    priority: page.slug ? 0.8 : 0.9,
  }));
}