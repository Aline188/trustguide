'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoChatbubbles as MessageSquare, IoSend as Send, IoRefresh as Loader2, IoArrowBack as ArrowLeft, IoWarning as AlertTriangle } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api/client';
import { categories } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function AskQuestionPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide both a title and a description.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.post<{ slug: string }>('/community/questions', {
        title: title.trim(),
        content: content.trim(),
        categoryId: categoryId || undefined,
        tags: tags
          .split(',')
          .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
          .filter(Boolean)
          .slice(0, 5),
      });
      toast.success('Your question has been posted!');
      window.location.href = `/community/${data.slug}`;
    } catch (err: any) {
      toast.error(err.message || 'Could not post your question. Please sign in and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/community" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Community
            </Link>
            <div className="flex items-center gap-2 text-primary mb-4">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">Ask the Community</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Ask a Question</h1>
            <p className="text-muted-foreground max-w-xl">
              Describe your situation honestly. Real people — and our moderators — will help you figure out if an opportunity is safe.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Question title <span className="text-muted-foreground">(be specific)</span>
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Is this freelance agency asking me for a deposit a scam?"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Details</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    required
                    placeholder="Explain what happened, what was promised, and any amounts or personal information involved. Do not share passwords or bank numbers."
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Category <span className="text-muted-foreground">(optional)</span></label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Choose a category...</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    The backend matches this by slug when a category is selected.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Tags <span className="text-muted-foreground">(comma separated, optional)</span></label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="scam, freelancing, payments"
                  />
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-300 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Never include passwords, PINs, full card numbers, or identity documents in your question. If you have already paid money and lost it, report it to the police and your bank immediately.
                  </span>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                  {loading ? 'Posting...' : 'Post Question'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You need to be signed in to post. <Link href="/auth/register" className="text-primary hover:underline">Create a free account</Link> or{' '}
                  <Link href="/auth/login" className="text-primary hover:underline">sign in</Link>.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
