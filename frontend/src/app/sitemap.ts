import { MetadataRoute } from 'next';
import { api } from '@/lib/api/client';

const STATIC_PAGES = [
  '', 'guides', 'categories', 'scam-checker', 'ai-assistant',
  'community', 'community/ask', 'faq', 'glossary', 'trust-score',
  'about', 'contact', 'privacy', 'terms', 'cookies', 'accessibility',
  'auth/login', 'auth/register',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `https://trustguide.com/${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly' as any,
    priority: page === '' ? 1.0 : 0.8,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const data = await api.get<{ articles: any[] }>('/articles', { limit: '100' });
    articleEntries = (data.articles || []).map((article: any) => ({
      url: `https://trustguide.com/guides/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {}

  return [...staticEntries, ...articleEntries];
}
