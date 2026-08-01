'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CategoryGrid } from '@/components/cards/CategoryGrid';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">All Categories</h1>
            <p className="text-muted-foreground max-w-xl">
              Browse our comprehensive library of verified guides organized by topic.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <CategoryGrid />
        </div>
      </section>
    </div>
  );
}
