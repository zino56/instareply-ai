import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const API_BASE = 'https://instaai-saas.onrender.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setEmailError('Please enter your email.');
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError(null);
    setErrorMsg(null);
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: value,
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      });
      // Treat 2xx AND 404 (unknown email) as neutral success to avoid enumeration.
      if (res.ok || res.status === 404) {
        setStatus('success');
        return;
      }
      if (res.status === 429) {
        setStatus('error');
        setErrorMsg("Too many attempts. Please wait a minute and try again.");
        return;
      }
      // Network/5xx
      setStatus('error');
      setErrorMsg("We couldn't send the reset link right now. Please try again shortly.");
    } catch {
      setStatus('error');
      setErrorMsg("Network error. Check your connection and try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-surface p-6 md:p-8"
    >
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold group-hover:text-primary transition-colors">Conveero</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-md)] p-8 space-y-6">
          {status === 'success' ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="w-6 h-6" aria-hidden />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Check your inbox</h2>
                <p className="text-sm text-muted-foreground">
                  If an account exists for this email, we sent a reset link.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 text-sm text-primary font-medium hover:underline rounded-sm focus-ring"
              >
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Reset your password</h2>
                <p className="text-sm text-muted-foreground">
                  Enter the email tied to your account and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    className="h-11"
                    required
                  />
                  {emailError && (
                    <p id="email-error" className="text-xs text-destructive">
                      {emailError}
                    </p>
                  )}
                </div>

                {status === 'error' && errorMsg && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                  >
                    {errorMsg}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-12 font-semibold text-base"
                >
                  {status === 'loading' ? 'Sending…' : 'Send reset link'}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground rounded-sm focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
