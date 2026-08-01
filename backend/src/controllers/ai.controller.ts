import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const chat = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });

    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', title: { contains: message } },
      select: { title: true, slug: true, summary: true }, take: 3,
    });

    const faqs = await prisma.fAQ.findMany({
      where: { OR: [{ question: { contains: message } }, { answer: { contains: message } }] }, take: 3,
    });

    const sources: any[] = [];
    const suggestions: string[] = [];
    let reply = '';
    const lower = message.toLowerCase();

    if (lower.includes('scam') || lower.includes('fake') || lower.includes('legit')) {
      reply = 'Try our Scam Checker to verify websites, emails, phones, or businesses. If it seems too good to be true, it probably is.';
      suggestions.push('Use the Scam Checker', 'Read our guide on spotting online scams');
    } else if (lower.includes('money') || lower.includes('income') || lower.includes('job')) {
      reply = 'We have verified guides on legitimate income opportunities. Avoid anything asking for upfront payment or promising unrealistic returns.';
      suggestions.push('Browse Money Online guides', 'See verified freelancing platforms');
    } else if (articles.length > 0) {
      reply = `Found ${articles.length} relevant guide(s):`;
      articles.forEach(a => sources.push({ title: a.title, slug: a.slug, summary: a.summary }));
      suggestions.push('Read featured guides', 'Search for more topics');
    } else {
      reply = 'Try using our search with different keywords, browse categories, or ask the community.';
      suggestions.push('Try Search', 'Browse Categories', 'Visit Community');
    }

    res.json({ reply, sources, suggestions });
  } catch (error) { next(error); }
};

export const suggestGuides = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { query } = req.body;
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', title: { contains: query } },
      select: { id: true, title: true, slug: true, summary: true, readingTime: true }, take: 5,
    });
    res.json(articles);
  } catch (error) { next(error); }
};

export const explainConcept = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { concept } = req.body;
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', title: { contains: concept } },
      select: { id: true, title: true, summary: true }, take: 3,
    });
    res.json({ concept, explanation: `Guides explaining "${concept}":`, guides: articles });
  } catch (error) { next(error); }
};
