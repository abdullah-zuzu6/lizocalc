// lib/info-content.ts

export interface InfoPage {
  category: string;      // 'physics' | 'health' | 'math' | 'education' ...
  subcategory: string;   // 'density' | 'mechanics' | 'nutrition' ...
  slug: string;           // empty string '' = the subcategory's own index page
  lastModified?: string; // ISO date, optional — falls back to today
}

export const infoPages: InfoPage[] = [
  // physics / density
  { category: 'physics', subcategory: 'density', slug: '', lastModified: '2026-08-14' }, // /info/physics/density itself
  { category: 'physics', subcategory: 'density', slug: 'density-of-air', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'density-of-common-materials', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'density-of-water', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'density-unit-conversion-guide', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'gas-density-formula', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'ideal-gas-law-pv-nrt', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'is-density-a-physical-or-chemical-property', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'mass-volume-density-relationship', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'specific-weight-units-explained', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'what-is-bulk-density', lastModified: '2026-08-14' },
  { category: 'physics', subcategory: 'density', slug: 'what-is-density-altitude', lastModified: '2026-08-14' },

  // health, math, education entries go here later —
  // just add more objects, no new lib file needed
];