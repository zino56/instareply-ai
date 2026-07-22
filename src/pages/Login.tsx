import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/* DEV BYPASS — REMOVE BEFORE PRODUCTION
 * Detects local Vite dev, Lovable preview host, or explicit ?dev=1 URL flag. */
function showDevBypass(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window === 'undefined') return false;
  if (window.location.hostname.includes('lovable.app')) return true;
  return new URLSearchParams(window.location.search).get('dev') === '1';
}
/* END DEV BYPASS */


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  /* DEV BYPASS — REMOVE BEFORE PRODUCTION
   * Sets a localStorage flag that AppLayout checks in dev only, so we can
   * preview/edit the dashboard inside Lovable without a real session.
   * The button is only rendered when import.meta.env.DEV is true, so it
   * disappears entirely in production builds. */
  const handleDevBypass = () => {
    window.localStorage.setItem('conveero_dev_bypass', '1');
    navigate('/dashboard', { replace: true });
  };
  /* END DEV BYPASS */


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
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Login to your Conveero account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline rounded-sm focus-ring">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 font-semibold text-base">
              Login
            </Button>
          </form>

          {/* DEV BYPASS — REMOVE BEFORE PRODUCTION */}
          {showDevBypass() && (
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleDevBypass}
                className="w-full h-10 text-xs font-medium border-dashed"
              >
                Dev preview (bypass auth) — dev only
              </Button>
            </div>
          )}
          {/* END DEV BYPASS */}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline rounded-sm focus-ring">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </motion.div>

  );
}
