'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoSparkles as Sparkles, IoHardwareChip as Bot } from 'react-icons/io5';
import { IoSend as Send, IoPerson as User, IoRefresh as Loader2, IoBook as BookOpen, IoWarning as AlertTriangle, IoThumbsUp as ThumbsUp } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; slug: string; summary: string }[];
  suggestions?: string[];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your TrustGuide AI assistant. I can help you verify opportunities, explain concepts, recommend guides, and spot potential scams. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await api.post<{ reply: string; sources?: { title: string; slug: string; summary: string }[]; suggestions?: string[] }>('/ai/chat', { message: input.trim() });
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        sources: data.sources,
        suggestions: data.suggestions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again or check your connection.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    'How can I make money online?',
    'Is this website a scam?',
    'Best freelancing websites',
    'How to learn programming for free',
  ];

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> AI-Powered
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Assistant</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ask anything about online opportunities, scams, careers, learning, or business. Get instant, trustworthy answers.
            </p>
          </motion.div>

          {/* Chat */}
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 shadow-xl overflow-hidden">
              <div className="bg-primary text-white px-6 py-4 flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-white/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">TrustGuide AI</p>
                  <p className="text-xs text-primary-100">Powered by verified knowledge base</p>
                </div>
              </div>

              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-muted/10">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}
                  >
                    <div className={cn(
                      'p-2 rounded-xl shrink-0',
                      msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent'
                    )}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={cn(
                      'max-w-[80%] rounded-2xl p-4',
                      msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-background border rounded-tl-sm'
                    )}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-primary/20">
                          <p className="text-xs font-medium mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Relevant Guides:
                          </p>
                          {msg.sources.map((src, j) => (
                            <a key={j} href={`/guides/${src.slug}`} className="block text-xs underline underline-offset-2 mb-1 hover:opacity-80">
                              {src.title}
                            </a>
                          ))}
                        </div>
                      )}

                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.suggestions.map((s, j) => (
                            <button
                              key={j}
                              onClick={() => setInput(s)}
                              className="text-xs px-2.5 py-1 rounded-full border bg-accent/50 hover:bg-accent transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <div className="p-2 rounded-xl bg-accent">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-background border rounded-2xl rounded-tl-sm p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 h-12"
                  />
                  <Button type="submit" disabled={loading || !input.trim()} className="h-12 px-6 rounded-xl">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </form>
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                      }}
                      className="text-xs px-3 py-1.5 rounded-full border bg-accent/30 hover:bg-accent transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
