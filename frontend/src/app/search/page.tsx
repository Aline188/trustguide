'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { IoSearch as Search, IoRefresh as Loader2, IoWarning as AlertTriangle, IoDocumentText as FileText, IoChatbubbles as MessageSquare } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { QuestionCard } from '@/components/cards/QuestionCard';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api/client';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'questions'>('all');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (q: string) => {
    setLoading(true);
    try {
      const data = await api.get<{ results: any[] }>('/search', { q, type: activeTab === 'all' ? '' : activeTab });
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Search</h1>
            <p className="text-muted-foreground mb-6">Find verified answers, guides, and community discussions</p>
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className="h-12 text-base"
                />
                <Button type="submit" size="lg" className="rounded-xl px-8">
                  <Search className="w-5 h-5 mr-2" /> Search
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {query && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1 p-1 rounded-xl bg-accent">
                {(['all', 'articles', 'questions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      activeTab === tab ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab === 'all' && 'All Results'}
                    {tab === 'articles' && 'Guides'}
                    {tab === 'questions' && 'Questions'}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {loading ? 'Searching...' : `${results.length} results for "${query}"`}
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Searching trusted sources...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item: any, i: number) => (
                <motion.div key={item.id || item.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  {item.content ? (
                    <QuestionCard question={item} />
                  ) : (
                    <ArticleCard article={item} />
                  )}
                </motion.div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">Try different keywords or browse our categories</p>
              <Button variant="outline" onClick={() => window.location.href = '/categories'}>
                Browse Categories
              </Button>
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Enter a search term above to find verified answers</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
