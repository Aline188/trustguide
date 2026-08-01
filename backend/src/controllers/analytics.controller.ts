import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getPopularSearches = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const searches = await prisma.searchHistory.groupBy({
      by: ['query'],
      _count: { query: true },
      orderBy: { _count: { query: 'desc' } },
      take: 20,
    });
    res.json(searches.map(s => ({ query: s.query, count: s._count.query })));
  } catch (error) {
    next(error);
  }
};

export const getPopularArticles = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { viewCount: 'desc' },
      take: 10,
      select: { id: true, title: true, slug: true, viewCount: true, category: { select: { name: true } } },
    });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const getTrendingTopics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { viewCount: 'desc' },
      take: 10,
      select: { id: true, title: true, slug: true, viewCount: true, tags: true },
    });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};
