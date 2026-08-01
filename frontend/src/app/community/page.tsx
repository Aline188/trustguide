'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoChatbubbles as MessageSquare, IoAdd as Plus, IoSearch as Search, IoFilter as Filter, IoThumbsUp as ThumbsUp, IoEye as Eye, IoCheckmarkCircle as CheckCircle } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionCard } from '@/components/cards/QuestionCard';
import { cn } from '@/lib/utils';
import { sampleQuestions } from './sample-data';

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'recent' | 'popular' | 'unanswered'>('recent');

  const questions = sampleQuestions.filter(q =>
    !search || q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-primary mb-4">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">Community</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Ask the Community</h1>
                <p className="text-muted-foreground max-w-xl">
                  Get answers from real people. Share your experiences and help others stay safe.
                </p>
              </div>
              <Link href="/community/ask">
                <Button size="lg" className="rounded-xl shrink-0">
                  <Plus className="w-5 h-5 mr-2" /> Ask Question
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-accent w-fit">
              {(['recent', 'popular', 'unanswered'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    filter === f ? 'bg-background shadow-sm' : 'text-muted-foreground'
                  )}
                >
                  {f === 'recent' && 'Most Recent'}
                  {f === 'popular' && 'Most Popular'}
                  {f === 'unanswered' && 'Unanswered'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, i) => (
              <motion.div key={question.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <QuestionCard question={question as any} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
