'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoShieldCheckmark as Shield, IoCheckmarkCircle as CheckCircle, IoWarning as AlertTriangle, IoSearch as Search, IoDocumentText as FileText, IoPeople as Users, IoBook as BookOpen } from 'react-icons/io5';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function TrustScorePage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="w-4 h-4" /> Transparency
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How Trust Scores Work</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every guide on TrustGuide carries a 0–100 trust score. Here is exactly what the number means
              and how to evaluate any opportunity for yourself.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { range: '80 – 100', label: 'High Trust', color: 'text-green-600', desc: 'Reviewed, fact-checked, and backed by credible sources. Still verify important details yourself.' },
              { range: '60 – 79', label: 'Medium Trust', color: 'text-yellow-600', desc: 'Generally reliable but with caveats. Read the warnings carefully before relying on it.' },
              { range: '0 – 59', label: 'Low Trust', color: 'text-red-600', desc: 'Multiple red flags or unverified claims. Treat as high-risk and avoid if money is involved.' },
            ].map((band) => (
              <Card key={band.range}>
                <CardContent className="p-6 text-center">
                  <p className={cn('text-3xl font-bold mb-1', band.color)}>{band.range}</p>
                  <p className="text-sm font-semibold mb-2">{band.label}</p>
                  <p className="text-xs text-muted-foreground">{band.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">What goes into a guide&apos;s score</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: FileText, title: 'Fact-checking & sources', desc: 'Each guide cites its sources (official sites, regulators, reputable news). We downgrade content that relies on anonymous or unverifiable claims.' },
              { icon: Users, title: 'Community reports', desc: 'Reports from the community of scams and suspicious behaviour adjust scores. More independent reports = larger adjustments.' },
              { icon: BookOpen, title: 'Recency & updates', desc: 'Scams evolve fast. Older guides that have not been reviewed in a long time lose points until they are refreshed.' },
              { icon: AlertTriangle, title: 'Known red flags', desc: 'Opportunities that display classic warning signs (upfront fees, guaranteed returns, pressure tactics) are scored lower.' },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Check anything yourself in 5 steps</h2>
          <div className="space-y-4 mb-12">
            {[
              { n: '1', title: 'Search for independent reviews', desc: 'Type the name plus words like "review", "scam", or "complaint" into a search engine. Check results from reputable sites and official sources, not just ads.' },
              { n: '2', title: 'Look up the official website and contacts', desc: 'A real company has a verifiable address, phone number, and registration. Cross-check these on official registries (for example, company registries or regulator databases).' },
              { n: '3', title: 'Read the fine print', desc: 'Legitimate businesses publish clear terms, refund policies, and privacy policies. Vague, copy-pasted, or missing documents are a red flag.' },
              { n: '4', title: 'Apply the "too good to be true" test', desc: 'Guaranteed returns, free money, instant wealth, or pay that is far above market rates are the strongest indicators of a scam.' },
              { n: '5', title: 'Never pay to get paid', desc: 'If anyone asks for money upfront — for registration, "processing", "tax", or "delivery" — before you receive what was promised, stop. It is a scam.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <h2 className="font-semibold mb-2">Not sure about something right now?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Run it through our free Scam Checker, then search the community for real experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/scam-checker" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                <Search className="w-4 h-4" /> Check a website or email
              </Link>
              <Link href="/guides" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors">
                <BookOpen className="w-4 h-4" /> Browse verified guides
              </Link>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-8 text-center">
            Trust scores are guidance, not certainty. Always do your own verification before committing money or personal information.
          </p>
        </div>
      </section>
    </div>
  );
}
