import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { generateToken, generateRefreshToken, verifyRefreshToken, hashPassword, comparePassword } from '../utils/auth';

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new AppError('Email already registered', 409);
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({ data: { email, passwordHash, name }, select: { id: true, email: true, name: true, role: true } });
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    res.status(201).json({ user, token, refreshToken, message: 'Account created' });
  } catch (error) { next(error); }
};

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new AppError('Invalid email or password', 401);
    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new AppError('Invalid email or password', 401);
    if (user.isBanned) throw new AppError('Account suspended', 403);

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar, trustScore: user.trustScore }, token, refreshToken });
  } catch (error) { next(error); }
};

export const googleLogin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, name, googleId, avatar } = req.body;
    if (!email || !googleId) throw new AppError('Google auth data required', 400);

    let user = await prisma.user.findUnique({ where: { googleId } });
    if (!user) {
      user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        user = await prisma.user.update({ where: { id: user.id }, data: { googleId, avatar: avatar || user.avatar } });
      } else {
        user = await prisma.user.create({ data: { email, name: name || 'User', googleId, avatar, emailVerified: true } });
      }
    }
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar }, token, refreshToken });
  } catch (error) { next(error); }
};

export const refreshToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const decoded = verifyRefreshToken(req.body.refreshToken);
    const token = generateToken(decoded.userId);
    const refreshToken = generateRefreshToken(decoded.userId);
    res.json({ token, refreshToken });
  } catch (error) { next(error); }
};

export const logout = async (_req: AuthRequest, res: Response) => {
  res.json({ message: 'Logged out' });
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, bio: true, trustScore: true, reputation: true, emailVerified: true, preferredLang: true, createdAt: true, _count: { select: { articles: true, bookmarks: true, questions: true, comments: true } } },
    });
    res.json(user);
  } catch (error) { next(error); }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, bio, avatar, preferredLang } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { ...(name && { name }), ...(bio !== undefined && { bio }), ...(avatar !== undefined && { avatar }), ...(preferredLang && { preferredLang }) },
      select: { id: true, email: true, name: true, bio: true, avatar: true, preferredLang: true },
    });
    res.json(user);
  } catch (error) { next(error); }
};
