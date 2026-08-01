import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const list = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const lang = (req.query.lang as string) || 'en';
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true, language: lang },
      orderBy: { order: 'asc' },
    });
    res.json(faqs);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const faq = await prisma.fAQ.findUnique({ where: { id: req.params.id } });
    res.json(faq);
  } catch (error) {
    next(error);
  }
};
