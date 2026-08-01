'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IoArrowBack as ArrowLeft, IoThumbsUp as ThumbsUp, IoEye as Eye, IoChatbubbles as MessageSquare, IoCheckmarkCircle as CheckCircle, IoWarning as AlertTriangle,
  IoPerson as User, IoRefresh as Loader2, IoSend as Send, IoPricetag as Tag
} from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, timeAgo, formatDate } from '@/lib/utils';
import { api } from '@/lib/api/client';
import { sampleQuestions } from '../sample-data';
import toast from 'react-hot-toast';

export default function QuestionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const local = sampleQuestions.find((q) => q.slug === slug);
    if (local) {
      setQuestion(local);
      setLoading(false);
      return;
    }

    api
      .get(`/questions/${slug}`)
      .then(setQuestion)
      .catch(() => setQuestion(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setPosting(true);
    try {
      await api.post<{ id: string }>(`/questions/${question.id}/answers`, { content: answer.trim() });
      toast.success('Your answer was posted.');
      setAnswer('');
      const fresh = await api.get<any>(`/questions/${slug}`);
      setQuestion(fresh);
    } catch (err: any) {
      toast.error(err.message || 'Please sign in to answer.');
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Question not found</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          This question may have been removed, or the link is incorrect.
        </p>
        <Link href="/community"><Button variant="outline">Back to Community</Button></Link>
      </div>
    );
  }

  const answers = question.answers || [];

  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/community" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Community
          </Link>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {question.category?.name && (
                  <Link href={`/categories/${question.category.slug}`} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                    {question.category.name}
                  </Link>
                )}
                {question.isResolved && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-medium">
                    <CheckCircle className="w-3 h-3" /> Resolved
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{question.title}</h1>
              <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-wrap">{question.content}</p>

              {question.tags && question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {question.tags.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                    {question.author?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{question.author?.name}</p>
                    <p className="text-xs">Asked {question.createdAt ? formatDate(question.createdAt) : 'recently'}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {question.voteCount ?? 0}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {question.answerCount ?? answers.length}</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {question.viewCount ?? 0}</span>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mb-4">{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h2>

          {answers.length === 0 && (
            <Card className="mb-6">
              <CardContent className="p-6 text-center text-muted-foreground text-sm">
                No answers yet. Share what you know to help this person.
              </CardContent>
            </Card>
          )}

          <div className="space-y-4 mb-8">
            {answers.map((ans: any, i: number) => (
              <motion.div key={ans.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="p-5">
                    {ans.isAccepted && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-medium mb-2">
                        <CheckCircle className="w-3 h-3" /> Accepted answer
                      </span>
                    )}
                    <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap">{ans.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary">
                          {ans.author?.name?.[0] || 'U'}
                        </div>
                        <span className="font-medium text-foreground">{ans.author?.name}</span>
                        <span>{ans.createdAt ? timeAgo(ans.createdAt) : ''}</span>
                      </div>
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {ans.voteCount ?? 0}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-1">Share an answer</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Only verified, respectful, and helpful information. Cite sources where possible.
              </p>
              <form onSubmit={submitAnswer} className="space-y-3">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                  placeholder="Write your answer..."
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button type="submit" className="rounded-xl" disabled={posting || !answer.trim()}>
                  {posting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  Post Answer
                </Button>
                <p className="text-xs text-muted-foreground">
                  You must be signed in. <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link> or{' '}
                  <Link href="/auth/register" className="text-primary hover:underline">create an account</Link>.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
