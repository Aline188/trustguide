'use client';

import { motion } from 'framer-motion';
import { IoShieldCheckmark as Shield, IoTrophy as Award, IoHeart as Heart, IoPeople as Users, IoLocate as Target, IoGlobe as Globe } from 'react-icons/io5';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="w-4 h-4" /> Our Mission
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Making the Internet<br />Safer for Everyone</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              TrustGuide was born from a simple belief: everyone deserves access to trustworthy information. 
              In a world full of scams, misinformation, and fake opportunities, we help people find truth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                TrustGuide started when our founder watched a family member lose their savings to an online scam. 
                The scam was obvious to some, but convincing to many. There was no single place people could go 
                to quickly verify if an opportunity was legitimate.
              </p>
              <p className="text-muted-foreground mb-4">
                We built TrustGuide to be that place. A platform where verified information meets community wisdom. 
                Where fact-checkers, experts, and real users work together to separate truth from deception.
              </p>
              <p className="text-muted-foreground">
                Today, TrustGuide serves a growing community across Africa and beyond. We remain committed to our 
                mission: making the internet a safer, more trustworthy place for everyone.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: '100%', label: 'Free to Use' },
                  { number: 'Fact-checked', label: 'Verified Guides' },
                  { number: 'Community', label: 'Scam Reporting' },
                  { number: '3+', label: 'Languages (EN, FR, RW)' },
                ].map((stat) => (
                  <Card key={stat.label} className="text-center">
                    <CardContent className="p-6">
                      <p className="text-xl font-bold text-primary">{stat.number}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Truth Above All', desc: 'We verify every piece of information before publishing. Accuracy is non-negotiable.' },
              { icon: Heart, title: 'People First', desc: 'Every decision we make prioritizes the safety and well-being of our users.' },
              { icon: Users, title: 'Community Powered', desc: 'We believe the best protection comes from people helping people.' },
              { icon: Globe, title: 'Accessible to All', desc: 'Trusted information should be free and available in every language.' },
              { icon: Target, title: 'Always Improving', desc: 'Scams evolve. We evolve faster. Continuous improvement is in our DNA.' },
              { icon: Award, title: 'Transparency', desc: 'We disclose our methods, cite our sources, and admit when we don\'t know.' },
            ].map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                      <value.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
