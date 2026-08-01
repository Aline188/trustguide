import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export const list = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.user!.id },
      include: {
        article: {
          select: {
            id: true, title: true, slug: true, summary: true, imageUrl: true,
            readingTime: true, publishedAt: true,
            author: { select: { name: true } },
            category: { select: { name: true, slug: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

export const add = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { articleId, note } = req.body;
    const existing = await prisma.bookmark.findFirst({
      where: { userId: req.user!.id, articleId },
    });
    if (existing) throw new AppError('Already bookmarked', 409);

    const bookmark = await prisma.bookmark.create({
      data: { userId: req.user!.id, articleId, note },
    });
    res.status(201).json(bookmark);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.bookmark.deleteMany({
      where: { userId: req.user!.id, articleId: req.params.articleId },
    });
    res.json({ message: 'Bookmark removed' });
  } catch (error) {
    next(error);
  }
};
