'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmark as Shield, IoWarning as AlertTriangle, IoCheckmarkCircle as CheckCircle, IoSearch as SearchIcon, IoOpen as ExternalLink, IoFlag as Flag, IoRefresh as Loader2, IoCall as Phone } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api/client';
import toast from 'react-hot-toast';

type RiskLevel = 'likely_safe' | 'suspicious' | 'dangerous' | 'unknown' | null;

const entityTypes = [
  { value: 'website', label: 'Website URL', icon: '🌐', placeholder: 'example.com' },
  { value: 'email', label: 'Email Address', icon: '📧', placeholder: 'sender@email.com' },
  { value: 'phone', label: 'Phone Number', icon: '📱', placeholder: '+250 78X XXX XXX' },
  { value: 'business', label: 'Business Name', icon: '🏢', placeholder: 'Company name' },
  { value: 'social', label: 'Social Media Page', icon: '📱', placeholder: 'Instagram/Twitter handle' },
];

export default function ScamCheckerPage() {
  const [entityType, setEntityType] = useState('website');
  const [entityValue, setEntityValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const didInit = useRef(false);

  const runCheck = async (type: string, value: string) => {
    if (!value.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await api.post<any>('/scam/check', { entityType: type, entityValue: value.trim() });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Check failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const params = new URLSearchParams(window.location.search);
    const value = params.get('value');
    if (value) {
      const rawType = params.get('entityType');
      const type = entityTypes.some((t) => t.value === rawType) && rawType ? rawType : 'website';
      setEntityType(type);
      setEntityValue(value);
      runCheck(type, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReport = async () => {
    if (!result) return;
    setReporting(true);
    try {
      const data = await api.post<{ message: string }>('/scam/report', {
        entityType: result.entityType,
        entityValue: result.entityValue || result.entityName,
        entityName: result.entityName || result.entityValue,
        description: result.description,
      });
      toast.success(data.message || 'Report submitted. Thank you for protecting the community.');
    } catch (err: any) {
      toast.error(err.message || 'Could not submit the report. Please try again.');
    } finally {
      setReporting(false);
    }
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    runCheck(entityType, entityValue);
  };

  const riskColors: Record<string, string> = {
    likely_safe: 'border-green-500/50 bg-green-50 dark:bg-green-950/20',
    suspicious: 'border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20',
    dangerous: 'border-red-500/50 bg-red-50 dark:bg-red-950/20',
    high_risk: 'border-red-500/50 bg-red-50 dark:bg-red-950/20',
  };

  const riskIcons: Record<string, any> = {
    likely_safe: CheckCircle,
    suspicious: AlertTriangle,
    dangerous: AlertTriangle,
    high_risk: AlertTriangle,
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-950 dark:to-red-950/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" /> Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Scam Checker</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Instantly check if a website, email, phone number, or business is trustworthy.
              Protect yourself before you engage.
            </p>

            {/* Check Form */}
            <form onSubmit={handleCheck} className="max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {entityTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => { setEntityType(type.value); setResult(null); }}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium border transition-all',
                      entityType === type.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-background hover:bg-accent border-border'
                    )}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={entityValue}
                  onChange={(e) => setEntityValue(e.target.value)}
                  placeholder={entityTypes.find(t => t.value === entityType)?.placeholder}
                  className="flex-1 h-14 px-6 rounded-xl border-2 bg-background focus:outline-none focus:border-primary text-base"
                />
                <Button type="submit" size="lg" disabled={loading || !entityValue.trim()} className="rounded-xl px-8">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <SearchIcon className="w-5 h-5" />}
                  Check
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {loading && (
            <Card className="text-center py-12">
              <CardContent>
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Analyzing {entityValue}...</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-red-300 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className={cn('border-2 overflow-hidden', riskColors[result.riskLevel] || '')}>
                <CardContent className="p-8">
                  {/* Risk Level */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      'p-3 rounded-2xl',
                      result.riskLevel === 'likely_safe' ? 'bg-green-100 dark:bg-green-950/30 text-green-600' :
                      result.riskLevel === 'suspicious' ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600' :
                      'bg-red-100 dark:bg-red-950/30 text-red-600'
                    )}>
                      {result.riskLevel === 'likely_safe' ? <CheckCircle className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold capitalize">
                        {result.riskLevel === 'likely_safe' ? 'Likely Safe' :
                         result.riskLevel === 'suspicious' ? 'Suspicious' :
                         result.riskLevel === 'dangerous' ? 'Dangerous' : 'Unknown'}
                      </h3>
                      <p className="text-sm text-muted-foreground">{result.entityValue}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm mb-6">{result.description}</p>

                  {/* Red Flags */}
                  {result.redFlags && result.redFlags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" /> Red Flags Detected
                      </h4>
                      <ul className="space-y-2">
                        {result.redFlags.map((flag: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
                            <span className="mt-0.5">•</span>
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Safety Tips */}
                  <div className="p-4 rounded-xl bg-background/80">
                    <h4 className="font-semibold text-sm mb-2">🛡️ Safety Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Never send money to unverified individuals or platforms</li>
                      <li>• Research independently before making commitments</li>
                      <li>• Trust your instincts — if it feels off, walk away</li>
                      <li>• Report scams to help protect others</li>
                    </ul>
                  </div>

                  {/* Report Button */}
                  <div className="mt-6 text-center">
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleReport} disabled={reporting}>
                      {reporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Flag className="w-4 h-4 mr-2" />}
                      {reporting ? 'Submitting...' : 'Report This as Scam'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Your report helps protect other people from the same scam.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!result && !loading && !error && (
            <div className="text-center py-12 text-muted-foreground">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Enter a website, email, phone number, or business name above to check its trustworthiness.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Common Scam Warning Signs</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Guaranteed returns or "get rich quick" promises',
              'Requests for upfront payment or "processing fees"',
              'Poor grammar, spelling mistakes, unprofessional communication',
              'Pressure to act immediately ("limited time offer")',
              'Unsolicited messages claiming you won a prize',
              'Requests for personal information (passwords, bank details)',
              'Too-good-to-be-true job offers with high pay for little work',
              'Fake celebrity endorsements or testimonials',
            ].map((sign, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <span>{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report to authorities */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="p-6 md:p-8 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Phone className="w-6 h-6 text-red-600" /> Lost money? Report it to the authorities
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              If you already paid a scammer, act quickly: stop all contact, call your bank or mobile-money provider to try to block the payment, then file an official report. Reporting is free and helps stop criminals from targeting others.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">Where to report — choose your country:</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    { country: 'United States', name: 'FTC — ReportFraud.ftc.gov', url: 'https://reportfraud.ftc.gov', note: 'Federal Trade Commission' },
                    { country: 'United States (cybercrime)', name: 'IC3 — ic3.gov', url: 'https://www.ic3.gov', note: 'FBI Internet Crime Complaint Center' },
                    { country: 'United Kingdom', name: 'Action Fraud — actionfraud.police.uk', url: 'https://www.actionfraud.police.uk', note: 'UK national fraud reporting' },
                    { country: 'Canada', name: 'CAFC — antifraudcentre-centreantifraude.ca', url: 'https://www.antifraudcentre-centreantifraude.ca', note: 'Canadian Anti-Fraud Centre' },
                    { country: 'Australia', name: 'Scamwatch — scamwatch.gov.au', url: 'https://www.scamwatch.gov.au', note: 'ACCC' },
                    { country: 'European Union', name: 'ECCC — europa.eu', url: 'https://www.europol.europa.eu/criminals-tools-and-cybercrime-detectives', note: 'Also report to your national police' },
                    { country: 'Rwanda', name: 'RIB — ri.gov.rw', url: 'https://www.ri.gov.rw', note: 'Rwanda Investigation Bureau, Kigali' },
                    { country: 'East Africa', name: 'Your local police & central bank', url: 'https://www.bnr.rw', note: 'Bank of Rwanda for financial fraud' },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 p-3 rounded-xl border bg-background hover:border-red-300 hover:bg-white dark:hover:bg-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        <span className="font-medium block">{item.country}: {item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.note}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background border text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">Keep evidence</p>
                <p>
                  Save screenshots of chats, emails, payment receipts, and the scammer&apos;s contact details before you report. This evidence is essential for police and your bank to take action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
