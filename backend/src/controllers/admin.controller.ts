import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export const getDashboard = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [totalUsers, totalArticles, totalQuestions, totalViews, pendingArticles, recentReports] = await Promise.all([
      prisma.user.count(),
      prisma.article.count(),
      prisma.question.count(),
      prisma.article.aggregate({ _sum: { viewCount: true } }),
      prisma.article.count({ where: { status: 'PENDING_REVIEW' } }),
      prisma.report.count({ where: { isResolved: false } }),
    ]);

    res.json({
      stats: {
        totalUsers,
        totalArticles,
        totalQuestions,
        totalViews: totalViews._sum.viewCount || 0,
        pendingArticles,
        pendingReports: recentReports,
      },
    });
  } catch (error) { next(error); }
};

export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, isBanned: true, trustScore: true, createdAt: true },
      }),
      prisma.user.count(),
    ]);
    res.json({ users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const updateUserRole = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { role: req.body.role }, select: { id: true, name: true, email: true, role: true } });
    res.json(user);
  } catch (error) { next(error); }
};

export const toggleBanUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) throw new AppError('User not found', 404);
    const updated = await prisma.user.update({ where: { id: user.id }, data: { isBanned: !user.isBanned, banReason: req.body.reason }, select: { id: true, name: true, isBanned: true } });
    res.json(updated);
  } catch (error) { next(error); }
};

export const getArticles = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const where: any = {};
    if (status) where.status = status;

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true, email: true } }, category: { select: { name: true } } },
      }),
      prisma.article.count({ where }),
    ]);
    res.json({ articles, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const verifyArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const article = await prisma.article.update({ where: { id: req.params.id }, data: { verified: true, trustScore: 90 } });
    res.json(article);
  } catch (error) { next(error); }
};

export const getReports = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      include: { reporter: { select: { name: true, email: true } }, article: { select: { title: true, slug: true } } },
    });
    res.json(reports);
  } catch (error) { next(error); }
};

export const resolveReport = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const report = await prisma.report.update({ where: { id: req.params.id }, data: { isResolved: true, resolvedBy: req.user!.id, resolution: req.body.resolution } });
    res.json(report);
  } catch (error) { next(error); }
};

export const getAnalytics = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [topArticles, categoryStats] = await Promise.all([
      prisma.article.findMany({ orderBy: { viewCount: 'desc' }, take: 10, select: { title: true, slug: true, viewCount: true } }),
      prisma.category.findMany({ include: { _count: { select: { articles: true } } } }),
    ]);
    res.json({
      topArticles,
      categories: categoryStats.map(c => ({ name: c.name, count: c._count.articles })),
    });
  } catch (error) { next(error); }
};
