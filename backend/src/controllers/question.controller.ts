import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { slugify } from '../utils/helpers';

export const list = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;

    const where: any = {};
    if (search) where.title = { contains: search };

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatar: true, trustScore: true } },
          category: { select: { name: true, slug: true } },
          _count: { select: { answers: true } },
        },
        skip: (page - 1) * limit, take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.question.count({ where }),
    ]);

    res.json({ questions, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const getBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const question = await prisma.question.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: { select: { id: true, name: true, avatar: true, trustScore: true } },
        category: { select: { name: true, slug: true } },
        answers: {
          orderBy: [{ isAccepted: 'desc' }, { voteCount: 'desc' }],
          include: { author: { select: { id: true, name: true, avatar: true, trustScore: true } } },
        },
      },
    });
    if (!question) throw new AppError('Question not found', 404);
    await prisma.question.update({ where: { id: question.id }, data: { viewCount: { increment: 1 } } });
    res.json(question);
  } catch (error) { next(error); }
};

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content, categoryId, tags } = req.body;
    let slug = slugify(title);
    const existing = await prisma.question.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const question = await prisma.question.create({
      data: { title, slug, content, authorId: req.user!.id, categoryId, tags: JSON.stringify(tags || []) },
      include: { author: { select: { name: true, avatar: true } } },
    });
    res.status(201).json(question);
  } catch (error) { next(error); }
};

export const addAnswer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError('Question not found', 404);

    const answer = await prisma.answer.create({
      data: { content, authorId: req.user!.id, questionId: id },
      include: { author: { select: { name: true, avatar: true } } },
    });
    await prisma.question.update({ where: { id }, data: { answerCount: { increment: 1 } } });
    res.status(201).json(answer);
  } catch (error) { next(error); }
};

export const vote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const existing = await prisma.vote.findFirst({
      where: { userId: req.user!.id, questionId: id },
    });

    if (existing) {
      if (existing.value === value) {
        await prisma.vote.delete({ where: { id: existing.id } });
        await prisma.question.update({ where: { id }, data: { voteCount: { increment: -value } } });
        return res.json({ message: 'Vote removed' });
      }
      await prisma.vote.update({ where: { id: existing.id }, data: { value } });
      await prisma.question.update({ where: { id }, data: { voteCount: { increment: value - existing.value } } });
    } else {
      await prisma.vote.create({ data: { userId: req.user!.id, value, questionId: id } });
      await prisma.question.update({ where: { id }, data: { voteCount: { increment: value } } });
    }
    res.json({ message: 'Vote recorded' });
  } catch (error) { next(error); }
};

export const acceptAnswer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { answerId } = req.body;
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question || question.authorId !== req.user!.id) throw new AppError('Not authorized', 403);

    await prisma.answer.updateMany({ where: { questionId: id }, data: { isAccepted: false } });
    await prisma.answer.update({ where: { id: answerId }, data: { isAccepted: true } });
    await prisma.question.update({ where: { id }, data: { status: 'RESOLVED', isResolved: true } });
    res.json({ message: 'Answer accepted' });
  } catch (error) { next(error); }
};
