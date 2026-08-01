import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const check = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { entityType, entityValue } = req.body;

    const existing = await prisma.scamReport.findFirst({
      where: { entityValue: { contains: entityValue } },
    });

    if (existing) {
      return res.json({
        entityType: existing.entityType,
        entityName: existing.entityName,
        riskLevel: existing.riskLevel,
        description: existing.description,
        redFlags: existing.redFlags ? JSON.parse(existing.redFlags) : [],
        reports: existing.reports,
        sources: existing.sources ? JSON.parse(existing.sources) : [],
        isVerified: existing.isVerified,
        found: true,
      });
    }

    const risk = analyzeRisk(entityType, entityValue);

    res.json({
      entityType, entityValue,
      riskLevel: risk.level,
      description: risk.description,
      redFlags: risk.redFlags,
      found: false, isVerified: false,
    });
  } catch (error) { next(error); }
};

const HIGH_RISK_TLDS = new Set([
  '.xyz', '.top', '.club', '.online', '.site', '.icu', '.gq', '.ml', '.tk', '.cf',
  '.ga', '.zip', '.mov', '.click', '.link', '.vip', '.work', '.fun', '.live', '.bid',
  '.loan', '.accountant', '.rest', '.review', '.win', '.sale',
]);

const SCAM_KEYWORDS = [
  'free-money', 'get-rich', 'get rich', 'work-from-home', 'work at home', 'guaranteed returns',
  'guaranteed income', 'double your money', 'instant profit', 'make $1000 a day', 'make $5000',
  'no risk', 'risk free', 'passive income', 'earn money fast', 'be your own boss',
  'unlock your phone', 'credit repair', 'cryptocurrency investment', 'bitcoin doubling',
  'cash prize', 'you have won', 'urgent action required', 'verify your account',
  'limited time offer', 'act now', 'sign up bonus', 'unlimited income',
];

const LEGIT_BRANDS = [
  'upwork', 'fiverr', 'google', 'facebook', 'microsoft', 'apple', 'paypal', 'amazon',
  'linkedin', 'freelancer', 'netflix', 'whatsapp', 'instagram', 'tiktok', 'youtube',
  'binance', 'coinbase', 'wise', 'stripe', 'shopify', 'ebay', 'alibaba', 'amazon',
];

function extractDomain(value: string): string {
  const cleaned = value
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');
  return cleaned;
}

function analyzeWebsite(value: string) {
  const redFlags: string[] = [];
  let lower = value.toLowerCase().trim();

  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+/.test(lower)) {
    redFlags.push('This does not look like a valid website address.');
    return { level: 'suspicious' as const, redFlags };
  }

  const hasProtocol = /^https?:\/\//.test(lower);
  if (lower.startsWith('http://')) {
    redFlags.push('The site loads over insecure HTTP instead of HTTPS. Sensitive data could be intercepted.');
  }

  const domain = extractDomain(lower);
  const tldMatch = domain.match(/\.([a-z0-9-]+)$/);
  if (tldMatch && HIGH_RISK_TLDS.has(`.${tldMatch[1]}`)) {
    redFlags.push(`The domain uses ${'.' + tldMatch[1]}, a top-level domain frequently abused by scammers.`);
  }

  const base = domain.split('.')[0] || domain;
  const brandMatch = LEGIT_BRANDS.find((b) => base.includes(b));
  if (brandMatch && base !== brandMatch && !base.startsWith(brandMatch + '-')) {
    redFlags.push(`The name closely imitates "${brandMatch}" but is not the official site. Possible typosquatting.`);
  }

  for (const kw of SCAM_KEYWORDS) {
    if (lower.includes(kw)) {
      redFlags.push(`Contains a common scam phrase: "${kw}".`);
      break;
    }
  }

  if (domain.replace(/[^0-9]/g, '').length >= 4) {
    redFlags.push('The address contains many numbers, common for disposable scam domains.');
  }

  if (!hasProtocol) {
    redFlags.push('No protocol given — always verify the site uses HTTPS (padlock icon).');
  }

  return { level: (redFlags.length >= 2 ? 'dangerous' : redFlags.length === 1 ? 'suspicious' : 'likely_safe') as string, redFlags };
}

function analyzeEmail(value: string) {
  const redFlags: string[] = [];
  const lower = value.toLowerCase().trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower)) {
    redFlags.push('This does not look like a valid email address.');
    return { level: 'suspicious' as const, redFlags };
  }

  const domain = lower.split('@')[1] || '';
  const [localPart] = lower.split('@');
  const numbers = localPart.replace(/[^0-9]/g, '');
  if (numbers.length >= 4) {
    redFlags.push('The local part contains a long string of numbers — a pattern common in bulk scam mailers.');
  }

  for (const kw of SCAM_KEYWORDS) {
    if (lower.includes(kw)) {
      redFlags.push(`Contains a common scam phrase: "${kw}".`);
      break;
    }
  }

  const brandMatch = LEGIT_BRANDS.find((b) => domain.includes(b));
  if (brandMatch && domain !== `${brandMatch}.com` && domain !== `${brandMatch}.co`) {
    redFlags.push(`The sender domain imitates "${brandMatch}" but is not the official company domain.`);
  }

  if (/^(hotmail|gmail|yahoo|outlook|aol)/.test(domain) && (lower.includes('prize') || lower.includes('lottery') || lower.includes('won'))) {
    redFlags.push('Prize/lottery wording from a free mail account is a classic scam signal.');
  }

  return { level: (redFlags.length >= 2 ? 'dangerous' : redFlags.length === 1 ? 'suspicious' : 'likely_safe') as string, redFlags };
}

function analyzePhone(value: string) {
  const redFlags: string[] = [];
  const digits = value.replace(/\D/g, '');

  if (digits.length < 7 || digits.length > 15) {
    redFlags.push('This does not look like a valid international phone number.');
    return { level: 'suspicious' as const, redFlags };
  }

  if (digits.length === 10 && /^0/.test(digits)) {
    redFlags.push('Number is missing its country code — unknown origin. Prefer the +countrycode format.');
  }

  const suspiciousPrefixes = ['900', '901', '976', '809', '876', '649'];
  if (suspiciousPrefixes.some((p) => digits.slice(-10).startsWith(p))) {
    redFlags.push('Premium-rate number prefix detected — calls/texts may charge high fees.');
  }

  return { level: redFlags.length > 0 ? 'suspicious' : 'likely_safe' as string, redFlags };
}

function analyzeBusiness(value: string) {
  const redFlags: string[] = [];
  const lower = value.toLowerCase().trim();

  if (lower.includes('pyramid') || lower.includes('mlm') || lower.includes('multi-level')) {
    redFlags.push('Possible pyramid-scheme indicators ("MLM"/"multi-level").');
  }

  for (const kw of SCAM_KEYWORDS) {
    if (lower.includes(kw)) {
      redFlags.push(`Contains a common scam phrase: "${kw}".`);
      break;
    }
  }

  const genericNames = /^(best|top|quick|easy|fast|instant|rich|money|earn|profit|wealth|capital)[a-z]*$/;
  if (genericNames.test(lower.replace(/\s+/g, ''))) {
    redFlags.push('The business name uses generic "money" words with no real identifiable company.');
  }

  return { level: (redFlags.length >= 2 ? 'dangerous' : redFlags.length === 1 ? 'suspicious' : 'likely_safe') as string, redFlags };
}

function analyzeSocial(value: string) {
  const redFlags: string[] = [];
  const lower = value.toLowerCase().trim();

  for (const kw of SCAM_KEYWORDS) {
    if (lower.includes(kw)) {
      redFlags.push(`Contains a common scam phrase: "${kw}".`);
      break;
    }
  }

  const digits = lower.replace(/[^0-9]/g, '');
  if (digits.length >= 5) {
    redFlags.push('Handle contains many numbers — a pattern common among throwaway scam accounts.');
  }

  if (/^(prize|winner|giveaway|crypto|forex|trading|invest|earn|money)[a-z0-9_]*$/.test(lower.replace(/[@#]/g, ''))) {
    redFlags.push('Handle looks like a promotional scam account ("giveaway", "crypto", "trading").');
  }

  return { level: redFlags.length > 0 ? 'suspicious' : 'likely_safe' as string, redFlags };
}

function analyzeRisk(type: string, value: string) {
  let result: { level: string; redFlags: string[] };

  switch (type) {
    case 'website':
      result = analyzeWebsite(value);
      break;
    case 'email':
      result = analyzeEmail(value);
      break;
    case 'phone':
      result = analyzePhone(value);
      break;
    case 'business':
      result = analyzeBusiness(value);
      break;
    case 'social':
      result = analyzeSocial(value);
      break;
    default:
      result = { level: 'unknown', redFlags: [] };
  }

  const { level, redFlags } = result;
  let description: string;
  if (level === 'dangerous') {
    description = 'Multiple red flags detected. Treat this as high risk and do not share money or personal information. Report it to the authorities.';
  } else if (level === 'suspicious') {
    description = 'Some red flags detected. Exercise caution and verify independently before trusting this entity.';
  } else {
    description = 'No immediate red flags detected. Still verify independently, especially before paying or sharing sensitive data.';
  }

  return { level, description, redFlags };
}

export const getReport = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const report = await prisma.scamReport.findUnique({ where: { id: req.params.id } });
    res.json(report);
  } catch (error) { next(error); }
};

export const getRecent = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const reports = await prisma.scamReport.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
    res.json(reports);
  } catch (error) { next(error); }
};

export const submitReport = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { entityType, entityValue, entityName, description } = req.body;
    const report = await prisma.scamReport.create({
      data: { entityType, entityValue, entityName, description, riskLevel: 'pending_review' },
    });
    res.status(201).json(report);
  } catch (error) { next(error); }
};
