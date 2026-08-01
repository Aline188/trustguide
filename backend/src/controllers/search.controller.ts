import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const search = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const q = (req.query.q as string) || '';
    const type = req.query.type as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!q.trim()) return res.json({ results: [], pagination: { page: 1, limit, total: 0, pages: 0 } });

    let results: any[] = [];
    let total = 0;

    if (type === 'articles' || !type) {
      const [articles, aTotal] = await Promise.all([
        prisma.article.findMany({
          where: { status: 'PUBLISHED', title: { contains: q } },
          select: {
            id: true, title: true, slug: true, summary: true, imageUrl: true,
            readingTime: true, verified: true, trustScore: true, publishedAt: true,
            category: { select: { name: true, slug: true } },
            author: { select: { name: true } },
          },
          skip: (page - 1) * limit, take: limit,
          orderBy: [{ viewCount: 'desc' }, { publishedAt: 'desc' }],
        }),
        prisma.article.count({ where: { status: 'PUBLISHED', title: { contains: q } } }),
      ]);
      results = articles;
      total = aTotal;
    }

    if (type === 'questions' || !type) {
      const [questions, qTotal] = await Promise.all([
        prisma.question.findMany({
          where: { title: { contains: q } },
          include: { _count: { select: { answers: true } }, category: { select: { name: true, slug: true } } },
          skip: (page - 1) * limit, take: limit,
          orderBy: [{ voteCount: 'desc' }, { createdAt: 'desc' }],
        }),
        prisma.question.count({ where: { title: { contains: q } } }),
      ]);
      results = [...results, ...questions];
      total += qTotal;
    }

    if (req.user) {
      await prisma.searchHistory.create({ data: { userId: req.user.id, query: q, results: total } });
    }

    res.json({ results, query: q, total, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const suggestions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const q = (req.query.q as string) || '';
    if (!q.trim()) return res.json([]);

    const [articles, questions] = await Promise.all([
      prisma.article.findMany({ where: { status: 'PUBLISHED', title: { contains: q } }, select: { title: true, slug: true }, take: 5 }),
      prisma.question.findMany({ where: { title: { contains: q } }, select: { title: true, slug: true }, take: 5 }),
    ]);
    res.json([...articles, ...questions].slice(0, 8));
  } catch (error) { next(error); }
};

export const saveHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { query, category } = req.body;
    await prisma.searchHistory.create({ data: { userId: req.user!.id, query, category } });
    res.json({ message: 'Saved' });
  } catch (error) { next(error); }
};

export const getHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const history = await prisma.searchHistory.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' }, take: 50,
    });
    const unique = history.filter((h, i, arr) => arr.findIndex(x => x.query === h.query) === i);
    res.json(unique);
  } catch (error) { next(error); }
};

export const clearHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.searchHistory.deleteMany({ where: { userId: req.user!.id } });
    res.json({ message: 'History cleared' });
  } catch (error) { next(error); }
};
