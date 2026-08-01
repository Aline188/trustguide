import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, name: true, avatar: true, bio: true, trustScore: true, reputation: true, createdAt: true, _count: { select: { articles: true, questions: true, answers: true } } },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) { next(error); }
};

export const getUserArticles = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const articles = await prisma.article.findMany({
      where: { authorId: req.params.id, status: 'PUBLISHED' },
      select: { id: true, title: true, slug: true, summary: true, publishedAt: true, viewCount: true, category: { select: { name: true, slug: true } } },
      orderBy: { publishedAt: 'desc' },
    });
    res.json(articles);
  } catch (error) { next(error); }
};
