'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IoSearch as Search, IoShieldCheckmark as Shield, IoStatsChart as TrendingUp, IoPeople as Users, IoArrowForward as ArrowRight,
  IoCheckmarkCircle as CheckCircle, IoStar as Star, IoChevronForward as ChevronRight, IoChatbubbles as MessageSquare, IoBook as BookOpen,
  IoFlash as Zap, IoLockClosed as Lock, IoGlobe as Globe, IoHeart as Heart, IoTrophy as Award, IoWarning as AlertTriangle, IoSparkles as Sparkles
} from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { CategoryGrid } from '@/components/cards/CategoryGrid';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { categories, trendingQuestions } from '@/lib/constants';
import { api } from '@/lib/api/client';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trustValue, setTrustValue] = useState('');
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleTrustCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trustValue.trim()) return;
    const s = trustValue.trim().toLowerCase();
    let entityType = 'website';
    if (s.includes('@')) entityType = 'email';
    else if (/^\+?[\d\s().-]+$/.test(s) && s.replace(/\D/g, '').length >= 6) entityType = 'phone';
    window.location.href = `/scam-checker?entityType=${entityType}&value=${encodeURIComponent(trustValue.trim())}`;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    try {
      const data = await api.post<{ message: string }>('/newsletter/subscribe', { email: email.trim() });
      toast.success(data.message || 'Subscribed! Check your inbox for a confirmation.');
      setEmail('');
    } catch (err: any) {
      toast.error(err.message || 'Could not subscribe. Please check your email and try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center pt-20 pb-16 md:pt-28 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6"
            >
              <Shield className="w-4 h-4" />
              Your Trusted Source for Verified Answers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl mb-6"
            >
              Find Truth. Avoid Scams.{' '}
              <span className="gradient-text">Make Informed Decisions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 text-balance"
            >
              TrustGuide helps you verify opportunities, spot scams, and find reliable answers. 
              Stop guessing — start trusting.
            </motion.p>

            {/* Search */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearch}
              className="w-full max-w-2xl mb-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative flex items-center bg-background border-2 border-border rounded-2xl shadow-lg overflow-hidden focus-within:border-primary transition-colors">
                  <Search className="absolute left-5 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything — 'How to make money online?', 'Is this legit?'..."
                    className="flex-1 pl-14 pr-4 py-4 bg-transparent outline-none text-base"
                  />
                  <Button type="submit" size="lg" className="rounded-xl m-1.5">
                    Search
                  </Button>
                </div>
              </div>
            </motion.form>

            {/* Quick Trust Check */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleTrustCheck}
              className="w-full max-w-2xl"
            >
              <div className="p-4 md:p-5 rounded-2xl border-2 border-red-100 dark:border-red-900/40 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 shrink-0">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold text-sm whitespace-nowrap">Is it a scam? Check now</span>
                  </div>
                  <div className="flex flex-1 w-full items-center gap-2">
                    <input
                      type="text"
                      value={trustValue}
                      onChange={(e) => setTrustValue(e.target.value)}
                      placeholder="Paste a website, email, or phone number..."
                      className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border-2 border-border bg-background outline-none focus:border-red-400 text-sm"
                    />
                    <Button type="submit" size="md" className="rounded-xl bg-red-600 hover:bg-red-700 shrink-0">
                      <Shield className="w-4 h-4 mr-1" /> Check
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2.5 text-center sm:text-left">
                  Free instant risk analysis. Your check helps protect the whole community.
                </p>
              </div>
            </motion.form>

            {/* Trending */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Trending questions</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {trendingQuestions.slice(0, 6).map((q) => (
                  <Link
                    key={q}
                    href={`/search?q=${encodeURIComponent(q)}`}
                    className="px-3 py-1.5 text-sm rounded-full border bg-background hover:bg-accent hover:border-primary/30 transition-all"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ==================== TRUST BAR ==================== */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: 'Verified Information', desc: 'Guides reviewed and fact-checked' },
              { icon: Users, label: 'Community-Powered', desc: 'Real people helping people' },
              { icon: Zap, label: 'Real-Time Checks', desc: 'Instant scam detection' },
              { icon: Globe, label: 'Free & Open', desc: 'For everyone, everywhere' },
            ].map((item, i) => (
              <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">Find trusted guides for every topic</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <CategoryGrid />
          <div className="mt-6 text-center sm:hidden">
            <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-primary font-medium">
              View all categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED GUIDES ==================== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Verified Guides</h2>
              <p className="text-muted-foreground">Expert-reviewed, fact-checked, and regularly updated</p>
            </div>
            <Link href="/guides" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline">
              View all guides <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleArticles.map((article, i) => (
              <motion.div key={article.slug} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <ArticleCard article={article as any} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SCAM CHECKER PROMO ==================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm mb-4">
                    <AlertTriangle className="w-4 h-4" /> Free Tool
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Is That Website a Scam?<br />
                    <span className="text-primary-200">Check in 5 Seconds.</span>
                  </h2>
                  <p className="text-primary-100/80 text-lg mb-6 max-w-lg">
                    Enter any website, email, phone number, or business name. Our scam checker instantly analyzes risk levels and red flags.
                  </p>
                  <Link href="/scam-checker">
                    <Button size="lg" variant="secondary" className="rounded-xl">
                      Try Scam Checker <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 max-w-md"
              >
                <div className="glass rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">FreeMoney.xyz</p>
                        <p className="text-xs text-red-600/70 dark:text-red-400/70">Risk Level: HIGH — Multiple scam reports</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-700 dark:text-green-400">Upwork.com</p>
                        <p className="text-xs text-green-600/70 dark:text-green-400/70">Risk Level: SAFE — Verified platform</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">+25078XXXXXX</p>
                        <p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Risk Level: SUSPICIOUS — Reported 12 times</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== AI ASSISTANT ==================== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <Sparkles className="w-4 h-4" /> AI-Powered
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Your AI Assistant
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Ask anything. Get instant, trustworthy answers powered by our verified knowledge base. No fluff, no guesses — just facts.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Get personalized guide recommendations',
                  'Understand complex topics easily',
                  'Check facts in real-time',
                  'Available 24/7, always free',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/ai-assistant">
                <Button size="lg" className="rounded-xl">
                  Try AI Assistant <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full max-w-md"
            >
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="p-2 rounded-xl bg-primary text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">TrustGuide AI</p>
                    <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-accent text-xs max-w-[80%]">
                      Is Forex trading a scam or legitimate?
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="p-3 rounded-2xl rounded-tr-sm bg-primary text-white text-sm max-w-[85%]">
                      Forex trading itself is legitimate, but many platforms are scams. Look for regulation from FCA, CySEC, or ASIC. Never trust "guaranteed returns." Check our guide on safe Forex trading.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-accent text-xs max-w-[80%]">
                      What about suspicious websites?
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="p-3 rounded-2xl rounded-tr-sm bg-primary text-white text-sm max-w-[85%]">
                      Use our Scam Checker! Paste any URL and I'll analyze risk factors, check against our database, and give you a safety rating in seconds.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== COMMON SCAMS ==================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Common Scams We Help With</h2>
            <p className="text-muted-foreground">Know the warning signs. Protect yourself and your money.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fake Jobs & Recruitment',
                desc: 'Job offers that ask for payment for "training", "visa processing", or "registration" are scams. Legitimate employers never charge you to work.',
                tag: 'jobs',
              },
              {
                title: 'Investment & Get-Rich-Quick',
                desc: '"Guaranteed returns", "double your money", and unregulated crypto or Forex bots almost always end in lost savings. Real investing has risk — never invest money you cannot afford to lose.',
                tag: 'finance',
              },
              {
                title: 'Phishing & Fake Emails',
                desc: 'Messages pretending to be your bank, Google, or the tax office asking you to "verify" your account. Never click links in unexpected messages.',
                tag: 'online-safety',
              },
              {
                title: 'Scholarship & Grant Fraud',
                desc: 'A "guaranteed" scholarship that asks for an application fee or your bank details is a scam. Real scholarships are free to apply for.',
                tag: 'scholarships',
              },
              {
                title: 'MLM & Pyramid Schemes',
                desc: 'If the main way to earn is by recruiting new members who pay to join, it is a pyramid scheme. Eventually it collapses and most people lose money.',
                tag: 'business',
              },
              {
                title: 'Romance Scams',
                desc: 'Criminals build fake relationships online and then ask for money for "emergencies" or "travel". Never send money to someone you have not met in person.',
                tag: 'online-safety',
              },
            ].map((scam, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                      <h3 className="font-semibold">{scam.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{scam.desc}</p>
                    <Link href={`/categories/${scam.tag}`} className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
                      Read related guides <ChevronRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Why TrustGuide?</h2>
            <p className="text-muted-foreground">Built for trust. Designed for clarity. Powered by community.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Verified Information', desc: 'Every guide is fact-checked by experts and updated regularly to ensure accuracy.' },
              { icon: Zap, title: 'Instant Scam Detection', desc: 'Our scam checker analyzes websites, emails, and businesses in real-time.' },
              { icon: Users, title: 'Community-Powered', desc: 'Real users share experiences, vote on answers, and help each other stay safe.' },
              { icon: Lock, title: 'Privacy First', desc: 'Your searches are anonymous. We never sell your data or track your activity.' },
              { icon: Globe, title: 'Multi-Language', desc: 'Available in English, French, Kinyarwanda, and more. Everyone deserves access to truth.' },
              { icon: Heart, title: 'Always Free', desc: 'TrustGuide is and always will be free. No paywalls for verified information.' },
            ].map((feature, i) => (
              <motion.div key={feature.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden text-center py-16 px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-800" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Make Informed Decisions?
              </h2>
              <p className="text-primary-100/80 text-lg mb-8">
                Join the people who use TrustGuide every day to verify opportunities, avoid scams, and find reliable answers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/guides">
                  <Button size="lg" variant="secondary" className="rounded-xl">
                    Browse Guides <BookOpen className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/scam-checker">
                  <Button size="lg" variant="outline" className="rounded-xl text-white border-white/30 hover:bg-white/10 hover:text-white">
                    Check a Scam <Shield className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ PREVIEW ==================== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Is TrustGuide really free?', a: 'Yes, completely free. No hidden fees, no premium tiers for basic features. TrustGuide is funded through donations and optional premium memberships.' },
              { q: 'How do you verify information?', a: 'Our team of fact-checkers and subject matter experts review every guide. We cite sources, update content regularly, and allow community feedback.' },
              { q: 'Can I trust the scam checker?', a: 'Our scam checker aggregates data from user reports, verified databases, and pattern analysis. While highly accurate, we always recommend additional verification for important decisions.' },
              { q: 'How do I report a scam?', a: 'Use our Scam Checker tool and click "Report Scam." Your report helps protect others in the community.' },
            ].map((faq, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary shrink-0" />
                      {faq.q}
                    </h3>
                    <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-sm text-primary font-medium hover:underline">
              View all FAQs <ChevronRight className="w-4 h-4 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-2">Stay Informed</h2>
              <p className="text-muted-foreground mb-6">Get weekly scam alerts, verified guides, and safety tips delivered to your inbox.</p>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 h-12 px-4 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Button type="submit" size="lg" className="rounded-xl shrink-0" disabled={subscribing}>
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                No spam. Unsubscribe anytime. Read our{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

const sampleArticles = [
  {
    id: '1', title: 'How to Make Money Online: 25 Legitimate Ways', slug: 'make-money-online-legitimate-ways',
    summary: 'Tired of get-rich-quick scams? Discover 25 proven, legitimate ways to earn money online. No gimmicks. Real results.',
    readingTime: 12, verified: true, trustScore: 92, viewCount: 15420, publishedAt: new Date().toISOString(),
    imageUrl: '', tags: ['money online', 'income', 'freelancing'],
    author: { name: 'TrustGuide Team', avatar: '' },
    category: { name: 'Money Online', slug: 'money-online' },
    createdAt: new Date().toISOString(), status: 'PUBLISHED', content: '', featured: false, likeCount: 0, shareCount: 0, isPremium: false, language: 'en',
  },
  {
    id: '2', title: '5 Red Flags That Scream "Online Scam" — Never Ignore These', slug: 'red-flags-online-scam-warning-signs',
    summary: 'Learn the 5 universal red flags of online scams. If you see any of these, run the other way.',
    readingTime: 8, verified: true, trustScore: 95, viewCount: 23100, publishedAt: new Date().toISOString(),
    imageUrl: '', tags: ['scams', 'safety', 'warning signs'],
    author: { name: 'Sarah M.', avatar: '' },
    category: { name: 'Online Safety', slug: 'online-safety' },
    createdAt: new Date().toISOString(), status: 'PUBLISHED', content: '', featured: false, likeCount: 0, shareCount: 0, isPremium: false, language: 'en',
  },
  {
    id: '3', title: 'Best Freelancing Platforms: Ranked by Trust, Pay, and Quality', slug: 'best-freelancing-platforms-ranked',
    summary: 'We tested 20 freelancing platforms. Here are the ones worth your time — and the ones to avoid.',
    readingTime: 10, verified: true, trustScore: 88, viewCount: 12300, publishedAt: new Date().toISOString(),
    imageUrl: '', tags: ['freelancing', 'jobs', 'platforms'],
    author: { name: 'James R.', avatar: '' },
    category: { name: 'Jobs', slug: 'jobs' },
    createdAt: new Date().toISOString(), status: 'PUBLISHED', content: '', featured: false, likeCount: 0, shareCount: 0, isPremium: false, language: 'en',
  },
  {
    id: '4', title: 'The Complete Guide to Online Scholarships (No Scams)', slug: 'complete-guide-online-scholarships',
    summary: 'A comprehensive guide to finding and applying for legitimate scholarships. Avoid scholarship scams with our checklist.',
    readingTime: 15, verified: true, trustScore: 90, viewCount: 8910, publishedAt: new Date().toISOString(),
    imageUrl: '', tags: ['scholarships', 'education', 'funding'],
    author: { name: 'Dr. Grace M.', avatar: '' },
    category: { name: 'Scholarships', slug: 'scholarships' },
    createdAt: new Date().toISOString(), status: 'PUBLISHED', content: '', featured: false, likeCount: 0, shareCount: 0, isPremium: false, language: 'en',
  },
  {
    id: '5', title: 'How to Start an Online Business in Rwanda: Step-by-Step Guide', slug: 'start-online-business-rwanda',
    summary: 'Everything you need to know about starting an online business in Rwanda — from registration to payment integration.',
    readingTime: 20, verified: true, trustScore: 85, viewCount: 6720, publishedAt: new Date().toISOString(),
    imageUrl: '', tags: ['business', 'rwanda', 'entrepreneurship'],
    author: { name: 'TrustGuide Team', avatar: '' },
    category: { name: 'Business', slug: 'business' },
    createdAt: new Date().toISOString(), status: 'PUBLISHED', content: '', featured: false, likeCount: 0, shareCount: 0, isPremium: false, language: 'en',
  },
  {
    id: '6', title: 'Digital Skills That Pay: Learn These 10 In-Demand Skills', slug: 'digital-skills-that-pay-2024',
    summary: 'The most in-demand digital skills with free learning resources. No degree required.',
    readingTime: 11, verified: true, trustScore: 87, viewCount: 10450, publishedAt: new Date().toISOString(),
    imageUrl: '', tags: ['digital skills', 'learning', 'career'],
    author: { name: 'Linda K.', avatar: '' },
    category: { name: 'Digital Skills', slug: 'digital-skills' },
    createdAt: new Date().toISOString(), status: 'PUBLISHED', content: '', featured: false, likeCount: 0, shareCount: 0, isPremium: false, language: 'en',
  },
];
