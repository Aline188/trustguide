import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function timeAgo(date: string | Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getRiskColor(level: string): string {
  switch (level) {
    case 'safe':
    case 'likely_safe':
      return 'text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400';
    case 'suspicious':
      return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 dark:text-yellow-400';
    case 'dangerous':
    case 'high_risk':
      return 'text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400';
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
  }
}

export const siteConfig = {
  name: 'TrustGuide',
  tagline: 'Your Trusted Source for Verified Answers',
  description: 'Find trustworthy, fact-based answers to common online questions. Avoid scams, misinformation, and fake opportunities.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://trustguide.com',
  ogImage: '/images/og.jpg',
  contactEmail: 'hello@trustguide.com',
};
