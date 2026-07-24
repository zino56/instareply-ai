import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, CheckCircle2, AlertTriangle } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const API_BASE = 'https://instaai-saas.onrender.com';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Recovery token discovery.
 * Supports both:
 *  - Query string:  /reset-password?token=...
 *  - Hash fragment: /reset-password#access_token=...&type=recovery
 *    (Supabase-style, kept for compatibility with existing email links.)
 */
function useRecoveryToken(): string | null {
  const [params] = useSearchParams();
  return useMemo(() => {
    const q = params.get('token') || params.get('access_token');
    if (q) return q;
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const type = hash.get('type');
      const t = hash.get('access_token') || hash.get('token');
      if (t && (!type || type === 'recovery')) return t;
    }
    return null;
  }, [params]);
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const token = useRecoveryToken();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tokenInvalid, setTokenInvalid] = useState(false);

  useEffect(() => {
    if (!token) setTokenInvalid(true);
  }, [token]);

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => navigate('/login', { replace: true }), 1800);
      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  const validate = (): boolean => {
    let ok = true;
    if (password.length < 8) {
      setPwError('Password must be at least 8 characters.');
      ok = false;
    } else {
      setPwError(null);
    }
    if (confirm !== password) {
      setConfirmError('Passwords do not match.');
      ok = false;
    } else {
      setConfirmError(null);
    }
    return ok;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      setTokenInvalid(true);
      return;
    }
    if (!validate()) return;

    setStatus('loading');
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setStatus('success');
        return;
      }
      if (res.status === 400 || res.status === 401 || res.status === 410) {
        setStatus('error');
        setTokenInvalid(true);
        return;
      }
      const data = await res.json().catch(() => null);
      setStatus('error');
      setErrorMsg(data?.message || "We couldn't update your password. Please try again.");
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Check your connection and try again.');
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
          {tokenInvalid ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="w-6 h-6" aria-hidden />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Reset link invalid or expired</h2>
                <p className="text-sm text-muted-foreground">
                  This password reset link is no longer valid. Request a new one to continue.
                </p>
              </div>
              <Link
                to="/forgot-password"
                className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition focus-ring"
              >
                Request a new link
              </Link>
            </div>
          ) : status === 'success' ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="w-6 h-6" aria-hidden />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Password updated</h2>
                <p className="text-sm text-muted-foreground">
                  Redirecting you to sign in…
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Set a new password</h2>
                <p className="text-sm text-muted-foreground">
                  Choose a strong password of at least 8 characters.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (pwError) setPwError(null);
                      }}
                      aria-invalid={!!pwError}
                      aria-describedby={pwError ? 'pw-error' : undefined}
                      className="h-11 pr-11"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md focus-ring"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {pwError && (
                    <p id="pw-error" className="text-xs text-destructive">
                      {pwError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm new password</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={(e) => {
                        setConfirm(e.target.value);
                        if (confirmError) setConfirmError(null);
                      }}
                      aria-invalid={!!confirmError}
                      aria-describedby={confirmError ? 'confirm-error' : undefined}
                      className="h-11 pr-11"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md focus-ring"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmError && (
                    <p id="confirm-error" className="text-xs text-destructive">
                      {confirmError}
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
                  {status === 'loading' ? 'Updating…' : 'Update password'}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Remembered it?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline rounded-sm focus-ring">
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
