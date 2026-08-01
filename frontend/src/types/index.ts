export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';
  avatar?: string;
  bio?: string;
  trustScore: number;
  reputation: number;
  emailVerified: boolean;
  preferredLang: string;
  createdAt: string;
  _count?: {
    articles: number;
    bookmarks: number;
    questions: number;
    comments: number;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  readingTime: number;
  verified: boolean;
  trustScore: number;
  featured: boolean;
  viewCount: number;
  likeCount: number;
  imageUrl?: string;
  imageAlt?: string;
  tags: string[];
  sources?: { title: string; url: string }[];
  warnings?: string;
  faqs?: { question: string; answer: string }[];
  status: 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  publishedAt?: string;
  createdAt: string;
  author: { id: string; name: string; avatar?: string; bio?: string; trustScore?: number };
  category: { id: string; name: string; slug: string };
  comments?: Comment[];
  _count?: { comments: number };
  isPremium: boolean;
  language: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  _count?: { articles: number };
}

export interface Question {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  viewCount: number;
  voteCount: number;
  answerCount: number;
  tags: string[];
  isResolved: boolean;
  createdAt: string;
  author: { id: string; name: string; avatar?: string; trustScore: number };
  category?: { name: string; slug: string };
  answers?: Answer[];
  _count?: { answers: number };
}

export interface Answer {
  id: string;
  content: string;
  isAccepted: boolean;
  isVerified: boolean;
  voteCount: number;
  createdAt: string;
  author: { id: string; name: string; avatar?: string; trustScore: number };
  votes?: Vote[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string; avatar?: string; role?: string };
  depth: number;
  replies?: Comment[];
}

export interface Vote {
  id: string;
  value: number;
  userId: string;
}

export interface Bookmark {
  id: string;
  articleId: string;
  note?: string;
  createdAt: string;
  article: Article;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface ScamReport {
  id: string;
  entityType: string;
  entityName: string;
  entityValue: string;
  riskLevel: string;
  description?: string;
  redFlags: string[];
  reports: number;
  sources: { title: string; url: string }[];
  isVerified: boolean;
  found: boolean;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
