'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { IoShieldCheckmark as Shield, IoTime as Clock, IoEye as Eye, IoCheckmarkCircle as CheckCircle, IoWarning as AlertTriangle } from 'react-icons/io5';
import { timeAgo, cn } from '@/lib/utils';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  return (
    <Link href={`/guides/${article.slug}`} className="block group">
      <Card className={cn(
        'h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        featured && 'md:col-span-2 md:row-span-2'
      )}>
        {article.imageUrl && (
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {article.verified && (
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium">
                <CheckCircle className="w-3 h-3" /> Verified
              </div>
            )}
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {article.category.name}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {article.readingTime} min read
            </span>
          </div>

          <CardTitle className="text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>

          <CardDescription className="text-sm line-clamp-2 mb-3">
            {article.summary}
          </CardDescription>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {article.author.avatar ? (
                <img src={article.author.avatar} alt="" className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary">
                  {article.author.name[0]}
                </div>
              )}
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> {article.viewCount}
              </span>
              {article.trustScore && (
                <span className={cn(
                  'flex items-center gap-1',
                  article.trustScore >= 80 ? 'text-green-600' : article.trustScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                )}>
                  <Shield className="w-3 h-3" /> {article.trustScore}%
                </span>
              )}
            </div>
          </div>

          {article.publishedAt && (
            <p className="mt-3 text-xs text-muted-foreground">{timeAgo(article.publishedAt)}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
