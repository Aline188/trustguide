import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const submitMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const created = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'General inquiry',
        message: message.trim(),
      },
    });
    res.status(201).json({ message: 'Message received. We will reply within 24 hours.', id: created.id });
  } catch (error) { next(error); }
};

export const listMessages = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
    res.json(messages);
  } catch (error) { next(error); }
};
