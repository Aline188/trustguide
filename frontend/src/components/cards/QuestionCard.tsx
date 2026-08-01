'use client';

import Link from 'next/link';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { IoChatbubbleEllipses as MessageSquare, IoThumbsUp as ThumbsUp, IoEye as Eye, IoCheckmarkCircle as CheckCircle } from 'react-icons/io5';
import { timeAgo, cn } from '@/lib/utils';
import type { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Link href={`/community/${question.slug}`} className="block group">
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors flex-1">
              {question.title}
            </CardTitle>
            {question.isResolved && (
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            )}
          </div>

          <CardDescription className="text-sm line-clamp-2 mb-3">
            {question.content}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-accent text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {question.author.avatar ? (
                <img src={question.author.avatar} alt="" className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary">
                  {question.author.name[0]}
                </div>
              )}
              <span>{question.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {question.voteCount}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {question.answerCount}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {question.viewCount}</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">{timeAgo(question.createdAt)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
