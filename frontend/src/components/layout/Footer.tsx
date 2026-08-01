import Link from 'next/link';
import { IoShieldCheckmark as Shield, IoHeart as Heart, IoMail as Mail } from 'react-icons/io5';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Guides', href: '/guides' },
        { label: 'Categories', href: '/categories' },
        { label: 'Scam Checker', href: '/scam-checker' },
        { label: 'Community', href: '/community' },
        { label: 'AI Assistant', href: '/ai-assistant' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Blog', href: '/guides' },
        { label: 'Glossary', href: '/glossary' },
        { label: 'Trust Score', href: '/trust-score' },
        { label: 'Report a Scam', href: '/scam-checker' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Help Center', href: '/faq' },
        { label: 'Feedback', href: '/contact' },
        { label: 'Report Issue', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">TrustGuide</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Free, verified answers and scam protection for everyone. We help people spot fraud and make informed decisions online.
            </p>
            <a
              href="mailto:hello@trustguide.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Mail className="w-4 h-4" /> hello@trustguide.com
            </a>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm mb-3">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TrustGuide. All rights reserved. Built with <Heart className="w-3.5 h-3.5 inline text-red-500" /> for a safer internet.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
