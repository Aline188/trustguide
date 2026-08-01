import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@trustguide.com' } });
  if (existingAdmin) {
    console.log('Database already seeded. Skipping.');
    return;
  }

  const passwordHash = await bcryptjs.hash('Admin@123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@trustguide.com',
      name: 'TrustGuide Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
      emailVerified: true,
      trustScore: 100,
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  const author1 = await prisma.user.create({
    data: { email: 'sarah@trustguide.com', name: 'Sarah Mutesi', passwordHash, role: 'AUTHOR', emailVerified: true, trustScore: 95, bio: 'Cybersecurity researcher and digital safety advocate.' },
  });
  const author2 = await prisma.user.create({
    data: { email: 'jean@trustguide.com', name: 'Jean-Pierre Habimana', passwordHash, role: 'AUTHOR', emailVerified: true, trustScore: 90, bio: 'Finance and business analyst with 10+ years experience.' },
  });
  const author3 = await prisma.user.create({
    data: { email: 'grace@trustguide.com', name: 'Dr. Grace Mugisha', passwordHash, role: 'AUTHOR', emailVerified: true, trustScore: 92, bio: 'Education specialist and scholarship advisor.' },
  });

  const categories = [
    { name: 'Money Online', slug: 'money-online', description: 'Legitimate ways to earn income online — no scams, no gimmicks. Freelancing, remote work, online business.', icon: '💰', color: 'from-green-500 to-emerald-600', order: 1 },
    { name: 'Jobs', slug: 'jobs', description: 'Verified job opportunities and career advice. Avoid recruitment scams and find genuine employment.', icon: '💼', color: 'from-blue-500 to-indigo-600', order: 2 },
    { name: 'Business', slug: 'business', description: 'Trusted business resources and entrepreneurship guides for startups and small businesses.', icon: '🏢', color: 'from-purple-500 to-violet-600', order: 3 },
    { name: 'Technology', slug: 'technology', description: 'Tech guides, digital literacy, and understanding the tools shaping our world.', icon: '💻', color: 'from-cyan-500 to-blue-600', order: 4 },
    { name: 'AI', slug: 'ai', description: 'AI tools, ethics, and practical applications. Understand artificial intelligence and use it safely.', icon: '🤖', color: 'from-rose-500 to-pink-600', order: 5 },
    { name: 'Education', slug: 'education', description: 'Learning resources, scholarships, and educational opportunities for all ages.', icon: '📚', color: 'from-amber-500 to-orange-600', order: 6 },
    { name: 'Scholarships', slug: 'scholarships', description: 'Verified scholarship opportunities. Find funding for your education without getting scammed.', icon: '🎓', color: 'from-emerald-500 to-teal-600', order: 7 },
    { name: 'Health Information', slug: 'health', description: 'Reliable health information and resources. Separate medical facts from dangerous misinformation.', icon: '🏥', color: 'from-red-500 to-rose-600', order: 8 },
    { name: 'Finance', slug: 'finance', description: 'Financial literacy, money management, investing basics, and avoiding financial scams.', icon: '📊', color: 'from-yellow-500 to-amber-600', order: 9 },
    { name: 'Cybersecurity', slug: 'cybersecurity', description: 'Stay safe online. Guides on passwords, phishing, privacy, and digital protection.', icon: '🔒', color: 'from-slate-600 to-slate-800', order: 10 },
    { name: 'Online Safety', slug: 'online-safety', description: 'Protect yourself from online threats, scams, and identity theft.', icon: '🛡️', color: 'from-indigo-500 to-purple-600', order: 11 },
    { name: 'Government Services', slug: 'government-services', description: 'Access verified government resources, from IDs to business registration.', icon: '🏛️', color: 'from-blue-600 to-blue-800', order: 12 },
    { name: 'Home & Family', slug: 'home-family', description: 'Family safety, parenting in the digital age, and home-related guides.', icon: '👨‍👩‍👧‍👦', color: 'from-pink-500 to-rose-500', order: 13 },
    { name: 'Digital Skills', slug: 'digital-skills', description: 'Learn valuable digital skills for the modern workforce. Free and paid resources.', icon: '🛠️', color: 'from-teal-500 to-cyan-600', order: 14 },
    { name: 'Consumer Protection', slug: 'consumer-protection', description: 'Know your rights as a consumer. Report fraud and protect your purchases.', icon: '⚖️', color: 'from-orange-500 to-red-600', order: 15 },
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }
  console.log(`✅ ${categories.length} categories created`);

  const moneyCat = await prisma.category.findUnique({ where: { slug: 'money-online' } })!;
  const safetyCat = await prisma.category.findUnique({ where: { slug: 'online-safety' } })!;
  const jobsCat = await prisma.category.findUnique({ where: { slug: 'jobs' } })!;
  const scholarshipsCat = await prisma.category.findUnique({ where: { slug: 'scholarships' } })!;
  const bizCat = await prisma.category.findUnique({ where: { slug: 'business' } })!;
  const skillsCat = await prisma.category.findUnique({ where: { slug: 'digital-skills' } })!;
  const cyberCat = await prisma.category.findUnique({ where: { slug: 'cybersecurity' } })!;

  const articles = [
    {
      title: 'How to Make Money Online: 25 Legitimate Ways',
      slug: 'make-money-online-legitimate-ways',
      summary: 'Tired of get-rich-quick scams? Discover 25 proven, legitimate ways to earn money online. No gimmicks. Real results.',
      content: `## Introduction\n\nThe promise of easy money online has created a breeding ground for scammers. But legitimate opportunities do exist. This guide covers 25 verified ways to earn income online.\n\n## Freelancing Platforms\n\n### 1. Upwork\nThe largest freelancing platform. Create a profile, bid on projects, and get paid securely.\n\n### 2. Fiverr\nOffer your services starting at $5. Great for beginners building a portfolio.\n\n### 3. Toptal\nFor experienced professionals. Higher pay but stricter vetting.\n\n## Remote Jobs\n\n### 4. Remote.co\nCurated remote job listings from reputable companies.\n\n### 5. We Work Remotely\nOne of the largest remote job boards.\n\n## Online Business\n\n### 6. Print on Demand\nDesign products and sell without inventory using Printful or Redbubble.\n\n### 7. Dropshipping\nSell products without holding stock. Research suppliers carefully.\n\n## Conclusion\n\nAlways verify opportunities before investing time or money. If it sounds too good to be true, it probably is.`,
      readingTime: 12, verified: true, trustScore: 92, imageUrl: '', tags: JSON.stringify(['income', 'freelancing', 'remote work', 'side hustle']), authorId: author2.id, categoryId: moneyCat!.id, viewCount: 15420,
    },
    {
      title: '5 Red Flags That Scream Online Scam',
      slug: 'red-flags-online-scam-warning-signs',
      summary: 'Learn the 5 universal red flags of online scams. If you see any of these, run the other way.',
      content: `## Red Flag #1: "Guaranteed Returns"\n\nNo legitimate investment guarantees returns. If someone promises you'll make money, it's a scam.\n\n## Red Flag #2: Upfront Payment\n\nLegitimate jobs never ask you to pay for training, registration, or materials.\n\n## Red Flag #3: Too Good to Be True\n\nFree iPads, $5000/week working 2 hours a day — these are always scams.\n\n## Red Flag #4: Pressure to Act Now\n\nScammers create urgency to prevent you from thinking critically.\n\n## Red Flag #5: Poor Communication\n\nGrammatical errors, generic emails, and no physical address are warning signs.`,
      readingTime: 8, verified: true, trustScore: 95, imageUrl: '', tags: JSON.stringify(['scams', 'safety', 'red flags', 'warning signs']), authorId: author1.id, categoryId: safetyCat!.id, viewCount: 23100,
    },
    {
      title: 'Best Freelancing Platforms: Ranked by Trust and Pay',
      slug: 'best-freelancing-platforms-ranked',
      summary: 'We tested 20 freelancing platforms. Here are the ones worth your time — and the ones to avoid.',
      content: `## Top Tier Platforms\n\n### Upwork\nBest for beginners. Escrow payment protection. 20% fee drops to 5% after $10,000.\n\n### Toptal\nTop 3% of talent. Rates from $60-$200/hr. Rigorous screening.\n\n## Mid Tier\n\n### Freelancer.com\nGood for quick projects. Watch for low-ball bids.\n\n### PeoplePerHour\nUK-focused. Good for creative work.\n\n## Platforms to Avoid\n\n### Fiverr clones\nMany copycat sites exist. Only use the official Fiverr.com.\n\n## Safety Tips\n\n1. Never work without a contract\n2. Use platform messaging, not personal email\n3. Get payment through the platform\n4. Check client reviews before accepting`,
      readingTime: 10, verified: true, trustScore: 88, imageUrl: '', tags: JSON.stringify(['freelancing', 'jobs', 'platforms', 'upwork']), authorId: author2.id, categoryId: jobsCat!.id, viewCount: 12300,
    },
    {
      title: 'Complete Guide to Online Scholarships',
      slug: 'complete-guide-online-scholarships',
      summary: 'Find and apply for legitimate scholarships. Avoid scholarship scams with our verification checklist.',
      content: `## Where to Find Scholarships\n\n### 1. Government Portals\n- Rwanda: REB (Rwanda Education Board)\n- USA: FAFSA, Grants.gov\n- UK: UKRI, Chevening\n\n### 2. University Websites\n\nAlmost all universities have a scholarships page. Apply directly through the institution.\n\n### 3. Legitimate Platforms\n\n- ScholarshipPortal.com\n- Chegg Scholarships\n- Fastweb.com\n\n## Scholarship Scam Red Flags\n\n- "Guaranteed" scholarship for a fee\n- Requests for bank account information\n- No specific eligibility criteria\n- Pressure to "act now"\n\n## Application Tips\n\n1. Start early — many deadlines are 6-12 months in advance\n2. Tailor each application\n3. Get recommendation letters ready\n4. Proofread everything`,
      readingTime: 15, verified: true, trustScore: 90, imageUrl: '', tags: JSON.stringify(['scholarships', 'education', 'funding', 'grants']), authorId: author3.id, categoryId: scholarshipsCat!.id, viewCount: 8910,
    },
    {
      title: 'How to Start an Online Business in Rwanda',
      slug: 'start-online-business-rwanda',
      summary: 'Everything you need to know about starting an online business in Rwanda — from registration to payment integration.',
      content: `## Step 1: Business Registration\n\n1. Register with RDB (Rwanda Development Board)\n2. Get your Tax Identification Number (TIN)\n3. Register for VAT if turnover exceeds 20M RWF\n\n## Step 2: Choose Your Business Model\n\n- E-commerce (sell physical or digital products)\n- Service-based (consulting, design, development)\n- Content creation (blogging, YouTube, courses)\n\n## Step 3: Set Up Payments\n\n- Mobile Money (MTN MoMo, Airtel Money)\n- Bank transfer\n- PayPal (limited but useful for international)\n- Square/Flutterwave for card payments\n\n## Step 4: Marketing\n\n- Use WhatsApp Business for customer communication\n- Leverage Instagram and TikTok for visual products\n- Facebook Marketplace for local sales\n\n## Legal Considerations\n\n- Register your trademark\n- Have clear terms and conditions\n- Understand consumer protection laws`,
      readingTime: 20, verified: true, trustScore: 85, imageUrl: '', tags: JSON.stringify(['business', 'rwanda', 'entrepreneurship', 'ecommerce']), authorId: author2.id, categoryId: bizCat!.id, viewCount: 6720,
    },
    {
      title: 'Digital Skills That Pay: Learn These 10 Skills',
      slug: 'digital-skills-that-pay-2024',
      summary: 'The most in-demand digital skills employers are hiring for right now. Free learning resources included.',
      content: `## 1. Data Analysis\n\nTools: Excel, SQL, Python, Tableau\nFree resources: Google Data Analytics Certificate\n\n## 2. Digital Marketing\n\nSEO, SEM, social media marketing, email marketing\nFree resources: Google Digital Garage, HubSpot Academy\n\n## 3. Web Development\n\nHTML, CSS, JavaScript, React, Node.js\nFree resources: freeCodeCamp, The Odin Project\n\n## 4. Graphic Design\n\nTools: Figma, Adobe Photoshop, Canva\nFree resources: Canva Design School, Figma tutorials\n\n## 5. Copywriting\n\nLearn to write compelling content for websites, emails, and ads.\n\n## 6. Video Editing\n\nTools: DaVinci Resolve (free), Premiere Pro\n\n## 7. Virtual Assistance\n\nAdministrative support for businesses worldwide.\n\n## 8. Social Media Management\n\nSchedule content, grow audiences, analyze metrics.\n\n## 9. UX Design\n\nUser experience research and interface design.\n\n## 10. Project Management\n\nTools: Asana, Trello, Jira, Notion`,
      readingTime: 11, verified: true, trustScore: 87, imageUrl: '', tags: JSON.stringify(['digital skills', 'learning', 'career', 'jobs']), authorId: author3.id, categoryId: skillsCat!.id, viewCount: 10450,
    },
    {
      title: 'Password Security: The Complete Guide',
      slug: 'password-security-complete-guide',
      summary: 'Stop using "password123". Learn how to create and manage truly secure passwords.',
      content: `## Why Passwords Matter\n\n80% of data breaches involve weak or stolen passwords. Your password is the first line of defense.\n\n## How to Create Strong Passwords\n\n1. At least 12 characters\n2. Mix of uppercase, lowercase, numbers, and symbols\n3. No dictionary words\n4. Unique for every account\n\n## Password Managers\n\nRecommended tools:\n- Bitwarden (free, open-source)\n- 1Password\n- LastPass\n- Apple Keychain\n\n## Two-Factor Authentication\n\nAlways enable 2FA when available. Use authenticator apps (Google Authenticator, Authy) over SMS when possible.\n\n## What to Avoid\n\n- Reusing passwords\n- Writing passwords on sticky notes\n- Sharing passwords via email or text\n- Using personal information (birthdays, names)`,
      readingTime: 7, verified: true, trustScore: 93, imageUrl: '', tags: JSON.stringify(['passwords', 'security', 'privacy', 'authentication']), authorId: author1.id, categoryId: cyberCat!.id, viewCount: 18700,
    },
  ];

  for (const article of articles) {
    await prisma.article.create({
      data: {
        ...article,
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        status: 'PUBLISHED',
      },
    });
  }
  console.log(`✅ ${articles.length} articles created`);

  const publishedArticles = await prisma.article.findMany({ where: { status: 'PUBLISHED' } });
  const usernames = ['John Doe', 'Alice Uwimana', 'Bob Kagame', 'Carol Mukamana', 'David Niyonzima'];
  for (let i = 0; i < 5; i++) {
    const q = await prisma.question.create({
      data: {
        title: sampleQuestions[i].title,
        slug: sampleQuestions[i].title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now() + '-' + i,
        content: sampleQuestions[i].content,
        authorId: admin.id,
        categoryId: publishedArticles[i % publishedArticles.length].categoryId,
        tags: JSON.stringify(sampleQuestions[i].tags),
        status: sampleQuestions[i].resolved ? 'RESOLVED' : 'OPEN',
        isResolved: sampleQuestions[i].resolved,
        voteCount: Math.floor(Math.random() * 20),
        viewCount: Math.floor(Math.random() * 200),
        answerCount: sampleQuestions[i].resolved ? 2 : 0,
      },
    });

    if (sampleQuestions[i].resolved) {
      const answer = await prisma.answer.create({
        data: { content: sampleQuestions[i].answer, authorId: author1.id, questionId: q.id, isAccepted: true, voteCount: 5 },
      });
    }
  }
  console.log(`✅ 5 sample questions created`);

  const faqs = [
    { question: 'Is TrustGuide really free?', answer: 'Yes, TrustGuide is completely free. No hidden fees, no premium tiers for basic features. We are funded through donations and optional premium memberships.', category: 'General' },
    { question: 'How do you verify information?', answer: 'Our team of fact-checkers and subject matter experts review every guide. We cite sources, update content regularly, and allow community feedback.', category: 'General' },
    { question: 'Can I trust the scam checker?', answer: 'Our scam checker aggregates data from user reports, verified databases, and pattern analysis. While highly accurate, we always recommend additional verification for important decisions.', category: 'Scam Checker' },
    { question: 'How do I report a scam?', answer: 'Use our Scam Checker tool and click "Report Scam." Your report helps protect others in the community.', category: 'Scam Checker' },
    { question: 'Can I contribute as a writer?', answer: 'Yes! We welcome contributions from verified experts. Contact us through our application form with your credentials and topic proposals.', category: 'Contributors' },
    { question: 'Is my data private?', answer: 'Absolutely. We never sell your data. Your searches are anonymous and we use encryption to protect your information.', category: 'Privacy' },
    { question: 'What languages are available?', answer: 'Currently we offer content in English, French, and Kinyarwanda. We are expanding to more languages based on community demand.', category: 'General' },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: { ...faq, order: 1 } });
  }
  console.log(`✅ ${faqs.length} FAQs created`);

  console.log('🎉 Seeding complete!');
}

const sampleQuestions = [
  {
    title: 'Is Forex trading a scam or legitimate?',
    content: 'I keep seeing ads about Forex trading promising huge returns. Is Forex trading actually legitimate or is it all a scam?',
    tags: ['forex', 'trading', 'scams'],
    resolved: true,
    answer: 'Forex trading itself is a legitimate financial market, but many platforms and signal sellers are scams. Only trade with brokers regulated by FCA, CySEC, or ASIC. Never trust "guaranteed returns" or "risk-free" claims. Consider starting with a demo account to learn.',
  },
  {
    title: 'Can I really make money with print on demand?',
    content: 'I see ads for Printful and Redbubble everywhere. Is print on demand a real way to make money or just another pyramid scheme?',
    tags: ['print on demand', 'ecommerce', 'side hustle'],
    resolved: true,
    answer: 'Print on demand is legitimate. You design products and a third party prints and ships them. Profits are typically small ($3-10 per sale) and require good designs and marketing. It is not a get-rich-quick scheme — treat it as a real business.',
  },
  {
    title: 'Are online tutoring jobs real?',
    content: 'I saw an ad for online tutoring that pays $50/hour. Is this real or a scam?',
    tags: ['tutoring', 'jobs', 'online'],
    resolved: false,
    answer: '',
  },
  {
    title: 'How do I know if an email is a phishing attempt?',
    content: 'I keep getting emails from "banks" asking me to click links. How can I tell which ones are fake?',
    tags: ['phishing', 'email', 'security'],
    resolved: true,
    answer: 'Check the sender email address carefully, hover over links before clicking, look for grammatical errors, and never share personal information via email. Legitimate banks never ask for passwords or PINs by email.',
  },
  {
    title: 'What payment platforms work best in Rwanda?',
    content: 'I want to start accepting online payments for my small business in Rwanda. What are my options?',
    tags: ['payments', 'rwanda', 'business'],
    resolved: false,
    answer: '',
  },
];

main()
  .catch(e => { console.error('❌ Seed error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
