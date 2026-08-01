'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { IoMail as Mail, IoArrowBack as ArrowLeft, IoWarning as AlertTriangle } from 'react-icons/io5';
import { IoShieldCheckmark as Shield } from 'react-icons/io5';
import { IoShieldCheckmark as ShieldCheck } from 'react-icons/io5';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl">TrustGuide</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
            <p className="text-muted-foreground">
              Enter the email you used to create your account.
            </p>
          </div>

          {!submitted ? (
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl">
                    Send reset link
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Remembered it?{' '}
                  <Link href="/auth/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="font-semibold text-lg mb-2">Check your inbox</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  If an account exists for <span className="font-medium text-foreground">{email}</span>,
                  we will send you instructions to reset your password shortly. They can take a few minutes to arrive — check spam too.
                </p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-300 text-xs text-left">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Beware of phishing: reset emails only come from TrustGuide and never ask for your password.
                  </span>
                </div>
                <Button variant="outline" className="mt-4 w-full rounded-xl" onClick={() => setSubmitted(false)}>
                  Use a different email
                </Button>
              </CardContent>
            </Card>
          )}

          <p className="text-center text-xs text-muted-foreground mt-6">
            Not receiving the email? <Link href="/contact" className="text-primary hover:underline">Contact support</Link> and we will help you securely regain access.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
