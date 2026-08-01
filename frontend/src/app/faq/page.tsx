'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearch as Search, IoChevronDown as ChevronDown, IoChevronUp as ChevronUp } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'What is TrustGuide?',
    a: 'TrustGuide is a free platform that helps people find trustworthy, fact-based answers to common online questions. We verify information, detect scams, and provide reliable guides to help you make informed decisions online.',
  },
  {
    q: 'Is TrustGuide really free?',
    a: 'Yes, TrustGuide is completely free to use. All our guides, scam checker, AI assistant, and community features are available at no cost. We are funded through donations and optional premium memberships that offer additional features.',
  },
  {
    q: 'How do you verify information?',
    a: 'Our team of subject matter experts and fact-checkers review every guide before publication. We cite credible sources, update content regularly based on new information, and allow the community to flag potentially inaccurate content for review.',
  },
  {
    q: 'How does the Scam Checker work?',
    a: 'Our Scam Checker analyzes websites, emails, phone numbers, and businesses against our database of known scams and red flag patterns. It considers factors like domain age, reported incidents, common scam patterns, and community reports to determine a risk level.',
  },
  {
    q: 'Can I trust the Scam Checker results?',
    a: 'While our Scam Checker is highly accurate, we recommend using it as a first line of defense rather than the final word. Always conduct additional research for important decisions, especially those involving money or personal information.',
  },
  {
    q: 'How do I report a scam?',
    a: 'Use our Scam Checker tool to check the entity, then click "Report This as Scam" to submit a report. Your report helps protect others in the community. You can also report scams via our Contact page.',
  },
  {
    q: 'How do I contribute to the community?',
    a: 'Create an account and you can ask questions, share answers, vote on content, comment on guides, and report suspicious activity. Your contributions help build a safer online community for everyone.',
  },
  {
    q: 'What languages does TrustGuide support?',
    a: 'TrustGuide is currently available in English, French, and Kinyarwanda. We are actively working on adding more languages to make trusted information accessible to everyone.',
  },
  {
    q: 'How is my privacy protected?',
    a: 'We take privacy seriously. Your searches are anonymous, we never sell your personal data, and we use encryption to protect your information. See our Privacy Policy for details.',
  },
  {
    q: 'Can businesses or organizations use TrustGuide?',
    a: 'Yes! Many schools, universities, NGOs, and businesses use TrustGuide to help their communities stay safe online. Contact us for partnership opportunities or customized solutions.',
  },
  {
    q: 'How can I support TrustGuide?',
    a: 'You can support us by sharing TrustGuide with friends and family, reporting scams you encounter, contributing to the community, or making a donation to help us maintain and improve the platform.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to your account settings and select "Delete Account." You can also contact us directly and we will process your request within 48 hours.',
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = faqs.filter(
    f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Everything you need to know about TrustGuide. Can't find what you're looking for? Contact us.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search FAQs..."
                className="pl-10 h-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => setOpenId(openId === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left bg-background hover:bg-accent/30 transition-colors"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  {openId === i ? <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />}
                </button>
                {openId === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
