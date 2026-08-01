'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { categories } from '@/lib/constants';

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <Link key={category.slug} href={`/categories/${category.slug}`} className="group">
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <CardTitle className="text-base mb-1.5 group-hover:text-primary transition-colors">
                {category.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {category.desc}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
