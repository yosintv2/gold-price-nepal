import type { MetadataRoute } from 'next';
import { fetchAllGoldDays } from '@/lib/api';
import { apiDateToUrlParams } from '@/lib/utils';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.goldnepal.com';

const STATIC_PAGES = [
  { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { url: '/gold-price-nepal/', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/gold-price-nepal-today/', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/hallmark-gold-price-nepal/', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/fine-gold-9999-price-nepal/', priority: 0.85, changeFrequency: 'daily' as const },
  { url: '/24k-gold-price-nepal/', priority: 0.85, changeFrequency: 'daily' as const },
  { url: '/tajabi-gold-price-nepal/', priority: 0.85, changeFrequency: 'daily' as const },
  { url: '/silver-price-nepal/', priority: 0.85, changeFrequency: 'daily' as const },
  { url: '/gold-price-nepal-per-tola/', priority: 0.8, changeFrequency: 'daily' as const },
  { url: '/gold-price-nepal-per-10gm/', priority: 0.8, changeFrequency: 'daily' as const },
  { url: '/history/', priority: 0.7, changeFrequency: 'daily' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allDays = await fetchAllGoldDays();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(p => ({
    url: SITE_URL + p.url,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const dayEntries: MetadataRoute.Sitemap = allDays
    .map(d => {
      const p = apiDateToUrlParams(d.date);
      if (!p) return null;
      return {
        url: `${SITE_URL}/${p.year}/${p.month}/${p.day}/`,
        lastModified: new Date(`${p.year}-${p.month}-${p.day}`),
        changeFrequency: 'never' as const,
        priority: 0.5,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return [...staticEntries, ...dayEntries];
}
