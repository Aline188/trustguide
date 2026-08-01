'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { IoSearch as Search, IoMenu as Menu, IoClose as X, IoMoon as Moon, IoSunny as Sun, IoShieldCheckmark as Shield, IoChevronDown as ChevronDown, IoPerson as User, IoBookmark as Bookmark, IoLogOut as LogOut, IoSettings as Settings, IoNotifications as Bell } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/constants';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 text-white font-bold text-sm transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Trust<span className="text-primary">Guide</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/guides" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
              Guides
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
                Categories <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 p-2 rounded-xl border bg-popover shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.slice(0, 10).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <div>
                      <p className="font-medium">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                    </div>
                  </Link>
                ))}
                <Link href="/categories" className="block px-3 py-2.5 text-sm text-primary font-medium hover:bg-accent rounded-lg transition-colors mt-1">
                  View all categories →
                </Link>
              </div>
            </div>
            <Link href="/scam-checker" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
              Scam Checker
            </Link>
            <Link href="/community" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
              Community
            </Link>
            <Link href="/ai-assistant" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
              AI Assistant
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              href="/auth/login"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="border-b bg-background">
          <div className="container mx-auto px-4 py-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                placeholder="Search guides, questions, categories..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-accent/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                autoFocus
              />
            </div>
            {searchQuery && (
              <div className="mt-4 max-w-2xl mx-auto space-y-2">
                <p className="text-xs text-muted-foreground px-2">Press Enter to search or try:</p>
                <div className="flex flex-wrap gap-2">
                  {['How to make money online', 'Is this legit?', 'Best freelancing sites', 'Scholarships'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setSearchQuery(q);
                        window.location.href = `/search?q=${encodeURIComponent(q)}`;
                      }}
                      className="px-3 py-1.5 text-xs rounded-full border bg-accent/30 hover:bg-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <Link href="/guides" className="block px-3 py-2.5 rounded-lg text-sm hover:bg-accent" onClick={() => setIsOpen(false)}>Guides</Link>
            <Link href="/categories" className="block px-3 py-2.5 rounded-lg text-sm hover:bg-accent" onClick={() => setIsOpen(false)}>Categories</Link>
            <Link href="/scam-checker" className="block px-3 py-2.5 rounded-lg text-sm hover:bg-accent" onClick={() => setIsOpen(false)}>Scam Checker</Link>
            <Link href="/community" className="block px-3 py-2.5 rounded-lg text-sm hover:bg-accent" onClick={() => setIsOpen(false)}>Community</Link>
            <Link href="/ai-assistant" className="block px-3 py-2.5 rounded-lg text-sm hover:bg-accent" onClick={() => setIsOpen(false)}>AI Assistant</Link>
            <hr className="my-2" />
            <Link href="/auth/login" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-primary" onClick={() => setIsOpen(false)}>Sign In</Link>
            <Link href="/auth/register" className="block px-3 py-2.5 rounded-lg text-sm font-medium" onClick={() => setIsOpen(false)}>Create Account</Link>
          </div>
        </div>
      )}
    </header>
  );
}
