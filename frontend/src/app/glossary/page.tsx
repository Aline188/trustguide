'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearch as Search, IoBook as BookOpen } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const terms = [
  {
    term: 'Phishing',
    definition: 'A type of online scam where criminals send fake emails, text messages, or websites that look like they come from a trusted company (a bank, Google, a government office) to trick you into revealing passwords, credit card numbers, or other personal information. Never click links in unexpected messages — go to the official website directly instead.',
    related: 'Email Scam',
  },
  {
    term: 'Malware',
    definition: 'Malicious software (viruses, trojans, spyware) designed to damage your device or steal your data. It is often installed by clicking fake download buttons or opening infected attachments. Use an antivirus program, keep your software updated, and only download from official stores.',
  },
  {
    term: 'Ransomware',
    definition: 'A type of malware that locks your files and demands payment (usually in cryptocurrency) to unlock them. Never pay the ransom — it funds crime and does not guarantee your files will be restored. Keep offline backups of important files.',
  },
  {
    term: 'Advance-Fee Fraud',
    definition: 'A scam where you are asked to pay a small "fee" (processing, registration, legal, or delivery) before receiving a much larger promised sum, prize, or loan. The prize never exists. Any legitimate opportunity should not require you to pay money upfront to receive money.',
    related: '419 Scam',
  },
  {
    term: '419 Scam / Nigerian Letter Scam',
    definition: 'An advance-fee scam that usually starts with an email claiming a large sum of money is waiting for you, often from a "prince", "lawyer", or "bank official", and asks for personal details and fees to release it. These are always scams.',
    related: 'Advance-Fee Fraud',
  },
  {
    term: 'Pyramid Scheme',
    definition: 'An illegal business model where income is based mainly on recruiting new members who each pay to join, rather than selling real products. People at the bottom lose money. It eventually collapses because there are never enough new members.',
    related: 'MLM',
  },
  {
    term: 'MLM (Multi-Level Marketing)',
    definition: 'A business model where distributors earn money both from selling products and from recruiting new distributors. Some MLMs are legal, but many operate like pyramid schemes. High sign-up costs, pressure to recruit, and inflated income claims are warning signs. Be extremely cautious.',
    related: 'Pyramid Scheme',
  },
  {
    term: 'Ponzi Scheme',
    definition: 'An investment fraud where early investors are paid with money from newer investors, not from real profits. It looks profitable at first, then collapses when new money stops coming in. Promises of "guaranteed", unusually high, and steady returns are classic warning signs.',
  },
  {
    term: 'Cryptocurrency Scam',
    definition: 'Fraud involving Bitcoin or other digital currencies: fake exchanges, "investment bots" promising guaranteed returns, celebrity impersonations, and romance scams that ask for payments in crypto. Crypto transfers are irreversible — once sent, you cannot get the money back.',
  },
  {
    term: 'Romance Scam',
    definition: 'Criminals create fake profiles on dating sites or social media, build a relationship online, and then ask for money for emergencies, travel, or "investments". They rarely agree to meet in person or on video. Never send money to someone you have not met in real life.',
  },
  {
    term: 'Job Scam',
    definition: 'A fake job offer designed to steal money or personal information. Red flags: interviews only by text/chat, requests for payment for "training", "equipment", or "processing", offers that are far above market pay, and requests for your bank details before you are hired. Legitimate employers never ask you to pay to work.',
  },
  {
    term: 'Rental/Property Scam',
    definition: 'Scammers advertise houses or apartments at attractive prices, often with photos copied from real listings, and ask for an advance deposit before you see the property. Never send money for a property you have not visited or verified.',
  },
  {
    term: 'Tech Support Scam',
    definition: 'A caller or pop-up claims your computer has a virus and offers to "fix" it for a fee, often asking for remote access to your device. Legitimate companies (Microsoft, Apple) never call you or show pop-ups asking you to call them. Hang up and ignore these.',
  },
  {
    term: 'Smishing',
    definition: 'Phishing carried out by SMS text message. Messages may claim to be from your bank, a delivery service, or a government agency and contain a link that steals your information. Treat unexpected texts with links the same as phishing emails.',
    related: 'Phishing',
  },
  {
    term: 'Vishing',
    definition: 'Phishing carried out by voice phone call. The caller may spoof a real company number and ask you to "verify" your account details. A legitimate bank or government office will never ask for your full password, PIN, or OTP over the phone.',
    related: 'Phishing',
  },
  {
    term: 'Sim Swapping / SIM Hijacking',
    definition: 'A fraud where criminals convince your mobile provider to transfer your phone number to a SIM card they control, letting them receive your SMS codes and take over your accounts. Ask your provider about SIM PIN protection and avoid SMS-only security for important accounts.',
  },
  {
    term: 'Identity Theft',
    definition: 'Using someone else\'s personal information (name, ID number, bank details) without permission to commit fraud. Protect your documents, shred sensitive mail, use strong unique passwords, and monitor your accounts regularly.',
  },
  {
    term: 'Two-Factor Authentication (2FA)',
    definition: 'An extra security step that asks for a second proof of identity (a code from an app like Google Authenticator, a hardware key, or biometric) in addition to your password. Turn it on for email, banking, and social media — it blocks most account takeovers.',
  },
  {
    term: 'Password Manager',
    definition: 'A secure app (such as Bitwarden, 1Password, or Keepass) that stores strong, unique passwords for every account so you only need to remember one master password. It protects you from credential-stuffing attacks that use passwords leaked from other sites.',
  },
  {
    term: 'Social Engineering',
    definition: 'Psychological manipulation that tricks people into giving up information or taking unsafe actions. It can happen by email, phone, or in person. Always verify the identity of anyone asking for sensitive information through an independent channel.',
  },
  {
    term: 'Spoofing',
    definition: 'Faking the sender address of an email, the caller ID of a phone call, or a website address to look like a trusted source. Email headers can be forged and websites can be cloned — check the real address and use official apps/websites directly.',
  },
  {
    term: 'Data Breach',
    definition: 'An incident where your personal information held by a company is stolen or exposed. If a service you use announces a breach, change your password there immediately and anywhere you reused it, and be alert for phishing afterwards.',
  },
  {
    term: 'Deepfake',
    definition: 'Media (video, audio, photos) manipulated with artificial intelligence to make people appear to say or do things they never did. Used in celebrity investment scams and fraud. Be suspicious of "video proof" from strangers, especially in financial matters.',
  },
  {
    term: 'Money Mule',
    definition: 'A person who receives stolen money into their account and transfers it elsewhere for a criminal, often lured by "work-from-home" or "payment processor" jobs. Being a money mule is illegal, even if you did not know the money was stolen. Avoid any job that asks you to receive and forward money.',
  },
  {
    term: 'DDoS Attack',
    definition: 'A "distributed denial of service" attack floods a website with traffic to make it unavailable. It is a technical attack rather than a personal scam, but it shows why strong hosting and security matter for online businesses.',
  },
  {
    term: 'Escrow Payment',
    definition: 'A safe payment method where a neutral third party holds the money until both sides fulfil their part of a deal (for example, on freelance platforms like Upwork). Scammers push you to pay outside escrow — never do it.',
  },
  {
    term: 'Get-Rich-Quick Scheme',
    definition: 'Any offer promising large, fast, and easy money with little effort. Common examples: "guaranteed returns", "double your money in 24 hours", automated trading bots, and crypto doubling sites. There is no legitimate way to get rich quickly — if it sounds too good to be true, it is.',
  },
  {
    term: 'OTP (One-Time Password)',
    definition: 'A short code sent to your phone or generated by an app to verify a transaction or login. Anyone who asks you to share an OTP — even someone claiming to be from your bank, the tax office, or tech support — is almost certainly a scammer.',
  },
  {
    term: 'Chargeback',
    definition: 'A refund requested from your bank or card provider when you did not receive goods you paid for or your card was used fraudulently. Contact your bank quickly if you are scammed, and report the transaction to your card provider.',
  },
  {
    term: 'Sandbox / Demo Account',
    definition: 'A practice account (for example in trading) that uses fake money to learn without real risk. Legitimate trading platforms offer demo accounts — but if anyone promises guaranteed live profits, walk away.',
  },
  {
    term: 'Influencer Endorsement Scam',
    definition: 'Fake or misleading promotions where scammers use real celebrities\' photos/videos, or fake social media "influencers", to promote sham products or investments. Verify opportunities with official sources, not social media ads.',
  },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState('');

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Learning Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Glossary of Online Safety Terms</h1>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Plain-language explanations of the scams, threats, and safety terms you will encounter online. Knowing the vocabulary is the first step to protecting yourself.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms (e.g. phishing, MLM, OTP)..."
                className="pl-10 h-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="mb-2">No terms match "{search}".</p>
              <p>Try a different word, like "phishing" or "scam".</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.4) }}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <h2 className="font-semibold text-base mb-1.5 flex items-center gap-2">
                        {item.term}
                        {item.related && (
                          <span className="text-[11px] font-normal text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
                            See also: {item.related}
                          </span>
                        )}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <h2 className="font-semibold mb-2">Spot something scam-related you want explained?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Search our guides, check any website or email with the Scam Checker, or ask the community.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <a href="/scam-checker" className="text-primary font-medium hover:underline">Check something</a>
              <span className="text-muted-foreground">•</span>
              <a href="/community" className="text-primary font-medium hover:underline">Ask the community</a>
              <span className="text-muted-foreground">•</span>
              <a href="/guides" className="text-primary font-medium hover:underline">Browse guides</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
