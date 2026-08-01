import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { slugify } from '../utils/helpers';

export const list = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { articles: { where: { status: 'PUBLISHED' } } } } },
      orderBy: { order: 'asc' },
    });
    res.json(categories);
  } catch (error) { next(error); }
};

export const getBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        articles: {
          where: { status: 'PUBLISHED' },
          orderBy: { publishedAt: 'desc' },
          select: { id: true, title: true, slug: true, summary: true, imageUrl: true, readingTime: true, verified: true, viewCount: true, publishedAt: true, author: { select: { name: true, avatar: true } } },
        },
      },
    });
    if (!category) throw new AppError('Category not found', 404);
    res.json(category);
  } catch (error) { next(error); }
};

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, icon, color, parentId } = req.body;
    const slug = slugify(name);
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) throw new AppError('Category already exists', 409);
    const category = await prisma.category.create({ data: { name, slug, description, icon, color, parentId } });
    res.status(201).json(category);
  } catch (error) { next(error); }
};

export const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
    res.json(category);
  } catch (error) { next(error); }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.category.update({ where: { id: req.params.id }, data: { isActive: false } });
    res.json({ message: 'Category deactivated' });
  } catch (error) { next(error); }
};
