'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IoTime as Clock, IoEye as Eye, IoShieldCheckmark as Shield, IoCheckmarkCircle as CheckCircle, IoWarning as AlertTriangle, IoBookmark as Bookmark, IoShareSocial as Share2,
  IoThumbsUp as ThumbsUp, IoChatbubbles as MessageSquare, IoPerson as User, IoArrowBack as ArrowLeft, IoChevronForward as ChevronRight, IoRefresh as Loader2
} from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, timeAgo, formatDate } from '@/lib/utils';
import { api } from '@/lib/api/client';
import { renderMarkdown } from '@/lib/markdown';

export default function GuideDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      loadArticle();
    }
  }, [params.slug]);

  const loadArticle = async () => {
    try {
      const data = await api.get<any>(`/articles/${params.slug}`);
      setArticle(data);
    } catch { }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Guide not found</h2>
        <Link href="/guides"><Button variant="outline">Browse Guides</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/guides" className="hover:text-foreground">Guides</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/categories/${article.category?.slug}`} className="hover:text-foreground">{article.category?.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium truncate">{article.title}</span>
          </div>
        </div>
      </div>

      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link href={`/categories/${article.category?.slug}`} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  {article.category?.name}
                </Link>
                {article.verified && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-medium">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
                {article.isPremium && (
                  <span className="px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                    Premium
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {article.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">{article.summary}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                    {article.author?.name?.[0] || 'T'}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{article.author?.name}</p>
                    <p className="text-xs">Published {article.publishedAt ? formatDate(article.publishedAt) : 'Recently'}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readingTime} min read</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {article.viewCount?.toLocaleString()} views</span>
                {article.trustScore && (
                  <span className={cn(
                    'flex items-center gap-1 font-medium',
                    article.trustScore >= 80 ? 'text-green-600' : article.trustScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  )}>
                    <Shield className="w-4 h-4" /> Trust Score: {article.trustScore}%
                  </span>
                )}
              </div>

              {/* Featured Image */}
              {article.imageUrl && (
                <div className="rounded-2xl overflow-hidden mb-8">
                  <img src={article.imageUrl} alt={article.imageAlt || article.title} className="w-full h-auto" />
                </div>
              )}

              {/* Content */}
              <div className="prose-custom mb-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }} />

              {/* Warnings */}
              {article.warnings && (
                <Card className="border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 mb-8">
                  <CardContent className="p-5 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-yellow-800 dark:text-yellow-300 mb-1">⚠️ Warning</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">{article.warnings}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sources */}
              {article.sources && article.sources.length > 0 && (
                <Card className="mb-8">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-3">📚 Sources & References</h3>
                    <ul className="space-y-2">
                      {article.sources.map((source: any, i: number) => (
                        <li key={i}>
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* FAQ */}
              {article.faqs && article.faqs.length > 0 && (
                <Card className="mb-8">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4">❓ Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {article.faqs.map((faq: any, i: number) => (
                        <div key={i}>
                          <p className="font-medium text-sm mb-1">{faq.question}</p>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag: string) => (
                    <Link key={tag} href={`/search?q=${tag}`} className="px-3 py-1.5 rounded-full bg-accent text-xs text-muted-foreground hover:bg-accent/80 transition-colors">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 py-6 border-t">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <ThumbsUp className="w-4 h-4 mr-1.5" /> Helpful
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Bookmark className="w-4 h-4 mr-1.5" /> Save
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Share2 className="w-4 h-4 mr-1.5" /> Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}
