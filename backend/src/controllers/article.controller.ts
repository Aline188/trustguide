import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { slugify } from '../utils/helpers';

export const list = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;
    const search = req.query.search as string;

    const where: any = { status: 'PUBLISHED' };
    if (category) where.category = { slug: category };
    if (search) where.title = { contains: search };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        select: {
          id: true, title: true, slug: true, summary: true, imageUrl: true,
          readingTime: true, verified: true, trustScore: true, featured: true,
          viewCount: true, publishedAt: true, createdAt: true, tags: true,
          author: { select: { id: true, name: true, avatar: true } },
          category: { select: { id: true, name: true, slug: true } },
          _count: { select: { comments: true } },
        },
        skip: (page - 1) * limit, take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.article.count({ where }),
    ]);

    res.json({ articles, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const getBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: { select: { id: true, name: true, avatar: true, bio: true, trustScore: true } },
        category: { select: { id: true, name: true, slug: true } },
        comments: {
          where: { parentId: null },
          include: {
            author: { select: { id: true, name: true, avatar: true, role: true } },
            replies: { include: { author: { select: { id: true, name: true, avatar: true, role: true } } } },
          },
        },
      },
    });

    if (!article) throw new AppError('Article not found', 404);
    if (article.status !== 'PUBLISHED' && !req.user?.role?.includes('ADMIN')) throw new AppError('Article not found', 404);

    await prisma.article.update({ where: { id: article.id }, data: { viewCount: { increment: 1 } } });

    const result = {
      ...article,
      tags: article.tags ? JSON.parse(article.tags) : [],
      sources: article.sources ? JSON.parse(article.sources) : [],
      faqs: article.faqs ? JSON.parse(article.faqs) : [],
    };

    res.json(result);
  } catch (error) { next(error); }
};

export const getFeatured = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const articles = await prisma.article.findMany({
      where: { featured: true, status: 'PUBLISHED' },
      take: 10, orderBy: { publishedAt: 'desc' },
      include: { author: { select: { name: true, avatar: true } }, category: { select: { name: true, slug: true } } },
    });
    res.json(articles);
  } catch (error) { next(error); }
};

export const getTrending = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' }, orderBy: { viewCount: 'desc' }, take: 10,
      select: { id: true, title: true, slug: true, summary: true, imageUrl: true, viewCount: true, publishedAt: true, category: { select: { name: true, slug: true } } },
    });
    res.json(articles);
  } catch (error) { next(error); }
};

export const getRelated = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const article = await prisma.article.findUnique({ where: { id: req.params.id } });
    if (!article) throw new AppError('Article not found', 404);
    const related = await prisma.article.findMany({
      where: { categoryId: article.categoryId, id: { not: article.id }, status: 'PUBLISHED' },
      take: 6,
      select: { id: true, title: true, slug: true, summary: true, imageUrl: true, readingTime: true, publishedAt: true, author: { select: { name: true } } },
    });
    res.json(related);
  } catch (error) { next(error); }
};

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, summary, content, categoryId, tags, imageUrl, imageAlt, sources, warnings, faqs, status, language, isPremium } = req.body;

    let slug = slugify(title);
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const article = await prisma.article.create({
      data: {
        title, slug, summary, content,
        readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        authorId: req.user!.id, categoryId,
        tags: JSON.stringify(tags || []),
        imageUrl, imageAlt,
        metaTitle: title.substring(0, 70),
        metaDesc: summary.substring(0, 160),
        sources: JSON.stringify(sources || []),
        warnings, faqs: JSON.stringify(faqs || []),
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        language: language || 'en', isPremium: isPremium || false,
      },
      include: { author: { select: { id: true, name: true } }, category: { select: { id: true, name: true } } },
    });
    res.status(201).json(article);
  } catch (error) { next(error); }
};

export const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.tags) data.tags = JSON.stringify(data.tags);
    if (data.sources) data.sources = JSON.stringify(data.sources);
    if (data.faqs) data.faqs = JSON.stringify(data.faqs);
    if (data.title) {
      data.slug = slugify(data.title);
      const existing = await prisma.article.findUnique({ where: { slug: data.slug } });
      if (existing && existing.id !== id) data.slug = `${data.slug}-${Date.now()}`;
    }
    const updated = await prisma.article.update({ where: { id }, data });
    res.json(updated);
  } catch (error) { next(error); }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ message: 'Article deleted' });
  } catch (error) { next(error); }
};

export const updateStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const article = await prisma.article.update({ where: { id }, data: { status, publishedAt: status === 'PUBLISHED' ? new Date() : undefined } });
    res.json(article);
  } catch (error) { next(error); }
};
