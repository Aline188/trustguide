import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'TrustGuide — Your Trusted Source for Verified Answers',
    template: '%s | TrustGuide',
  },
  description: 'Find trustworthy, fact-based answers to common online questions. Avoid scams, misinformation, and fake opportunities.',
  keywords: ['trustguide', 'verified answers', 'scam checker', 'online safety', 'legitimate opportunities'],
  authors: [{ name: 'TrustGuide' }],
  creator: 'TrustGuide',
  publisher: 'TrustGuide',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trustguide.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TrustGuide',
    title: 'TrustGuide — Verified Answers You Can Trust',
    description: 'Find trustworthy, fact-based answers to common online questions.',
    url: '/',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustGuide — Verified Answers You Can Trust',
    description: 'Find trustworthy, fact-based answers to common online questions.',
    images: ['/images/og.jpg'],
    creator: '@trustguide',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="bottom-right" toastOptions={{
            duration: 4000,
            style: { borderRadius: '12px', background: '#333', color: '#fff' },
          }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
