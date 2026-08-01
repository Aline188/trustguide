import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const articleSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200),
  summary: z.string().min(20, 'Summary must be at least 20 characters').max(500),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  categoryId: z.string().cuid(),
  tags: z.array(z.string()).max(10).default([]),
  imageUrl: z.string().url().optional().or(z.literal('')),
  imageAlt: z.string().optional(),
  metaTitle: z.string().max(70).optional(),
  metaDesc: z.string().max(160).optional(),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
  })).optional(),
  warnings: z.string().optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED']).default('DRAFT'),
  scheduledAt: z.string().datetime().optional(),
  language: z.string().default('en'),
  isPremium: z.boolean().default(false),
});

export const questionSchema = z.object({
  title: z.string().min(10).max(200),
  content: z.string().min(20).max(5000),
  categoryId: z.string().cuid().optional(),
  tags: z.array(z.string()).max(10).default([]),
});

export const answerSchema = z.object({
  content: z.string().min(10).max(10000),
});

export const commentSchema = z.object({
  content: z.string().min(1).max(2000),
  parentId: z.string().cuid().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional().or(z.literal('')),
  preferredLang: z.string().optional(),
});

export const scamCheckSchema = z.object({
  entityType: z.enum(['website', 'email', 'phone', 'business', 'social']),
  entityValue: z.string().min(1).max(500),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  language: z.string().default('en'),
});
