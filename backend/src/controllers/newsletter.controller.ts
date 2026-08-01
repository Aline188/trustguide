import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export const subscribe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, name, language } = req.body;
    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (existing) {
      if (existing.isActive) throw new AppError('Already subscribed', 409);
      await prisma.newsletter.update({ where: { email }, data: { isActive: true, name, language } });
      return res.json({ message: 'Subscription reactivated' });
    }
    await prisma.newsletter.create({ data: { email, name, language: language || 'en' } });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    await prisma.newsletter.updateMany({ where: { email }, data: { isActive: false } });
    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    next(error);
  }
};
