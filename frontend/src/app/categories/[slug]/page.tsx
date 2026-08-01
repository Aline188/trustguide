'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoArrowBack as ArrowLeft, IoBook as BookOpen, IoTime as Clock, IoEye as Eye, IoShieldCheckmark as Shield, IoChevronForward as ChevronRight, IoAlertCircle as AlertCircle, IoStatsChart as TrendingUp } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/lib/constants';
import { api } from '@/lib/api/client';

interface Article {
  id: string; title: string; slug: string; summary: string;
  readingTime?: number; verified: boolean; viewCount: number;
  publishedAt: string; imageUrl?: string;
  author?: { name: string; avatar?: string };
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find(c => c.slug === slug);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api
      .get(`/categories/${slug}`)
      .then((data: any) => setArticles(data.articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/categories"><Button>Browse Categories</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className={`py-12 bg-gradient-to-br ${category.color} text-white`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/categories" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Categories
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                <p className="text-white/80 mt-1">{category.desc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <Card key={i}><CardContent className="p-6"><div className="h-6 bg-muted rounded animate-pulse mb-3" /><div className="h-4 bg-muted rounded animate-pulse w-3/4" /></CardContent></Card>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No guides yet</h2>
              <p className="text-muted-foreground mb-6">We're working on verified guides for this category.</p>
              <Link href="/guides"><Button variant="outline">View All Guides</Button></Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <BookOpen className="w-4 h-4" />
                <span>{articles.length} guide{articles.length !== 1 ? 's' : ''} in {category.name}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((article, i) => (
                  <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={`/guides/${article.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                        <CardContent className="p-6">
                          {article.verified && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium mb-3">
                              <Shield className="w-3 h-3" /> Verified
                            </div>
                          )}
                          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {article.readingTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} min read</span>}
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.viewCount.toLocaleString()}</span>
                            {article.author && <span>{article.author.name}</span>}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
