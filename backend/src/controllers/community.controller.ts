import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getQuestions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        include: { author: { select: { id: true, name: true, avatar: true, trustScore: true } }, _count: { select: { answers: true } }, category: { select: { name: true, slug: true } } },
        skip: (page - 1) * limit, take: limit, orderBy: [{ voteCount: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.question.count(),
    ]);
    res.json({ questions, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const getQuestion = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const question = await prisma.question.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { id: true, name: true, avatar: true, trustScore: true } },
        category: { select: { name: true, slug: true } },
        answers: { orderBy: [{ isAccepted: 'desc' }, { voteCount: 'desc' }], include: { author: { select: { id: true, name: true, avatar: true, trustScore: true } } } },
      },
    });
    res.json(question);
  } catch (error) { next(error); }
};

export const createQuestion = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content, categoryId, tags } = req.body;
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();

    let resolvedCategoryId: string | undefined;
    if (categoryId) {
      if (categoryId.includes('-')) {
        const cat = await prisma.category.findUnique({ where: { slug: categoryId } });
        resolvedCategoryId = cat?.id;
      } else {
        resolvedCategoryId = categoryId;
      }
    }

    const question = await prisma.question.create({
      data: { title, slug, content, authorId: req.user!.id, categoryId: resolvedCategoryId, tags: JSON.stringify(tags || []) },
      include: { author: { select: { name: true, avatar: true } } },
    });
    res.status(201).json(question);
  } catch (error) { next(error); }
};

export const addAnswer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const answer = await prisma.answer.create({
      data: { content, authorId: req.user!.id, questionId: req.params.id },
      include: { author: { select: { name: true, avatar: true } } },
    });
    await prisma.question.update({ where: { id: req.params.id }, data: { answerCount: { increment: 1 } } });
    res.status(201).json(answer);
  } catch (error) { next(error); }
};

export const voteAnswer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { value } = req.body;
    const existing = await prisma.vote.findFirst({ where: { userId: req.user!.id, answerId: req.params.id } });
    if (existing) {
      if (existing.value === value) {
        await prisma.vote.delete({ where: { id: existing.id } });
        await prisma.answer.update({ where: { id: req.params.id }, data: { voteCount: { increment: -value } } });
        return res.json({ message: 'Vote removed' });
      }
      await prisma.vote.update({ where: { id: existing.id }, data: { value } });
      await prisma.answer.update({ where: { id: req.params.id }, data: { voteCount: { increment: value - existing.value } } });
    } else {
      await prisma.vote.create({ data: { userId: req.user!.id, value, answerId: req.params.id } });
      await prisma.answer.update({ where: { id: req.params.id }, data: { voteCount: { increment: value } } });
    }
    res.json({ message: 'Vote recorded' });
  } catch (error) { next(error); }
};

export const acceptAnswer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const q = await prisma.question.findUnique({ where: { id: req.params.id } });
    if (!q || q.authorId !== req.user!.id) return res.status(403).json({ error: 'Not authorized' });
    await prisma.answer.updateMany({ where: { questionId: req.params.id }, data: { isAccepted: false } });
    await prisma.answer.update({ where: { id: req.body.answerId }, data: { isAccepted: true } });
    await prisma.question.update({ where: { id: req.params.id }, data: { status: 'RESOLVED', isResolved: true } });
    res.json({ message: 'Answer accepted' });
  } catch (error) { next(error); }
};
