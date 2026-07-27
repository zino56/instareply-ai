import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';

/* DEV BYPASS — visible only in local `vite dev` (import.meta.env.DEV).
 * Never rendered in production builds or Lovable preview deployments. */
function showDevBypass(): boolean {
  return import.meta.env.DEV;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  /* DEV BYPASS — REMOVE BEFORE PRODUCTION */
  const handleDevBypass = () => {
    window.localStorage.setItem('conveero_dev_bypass', '1');
    navigate('/dashboard', { replace: true });
  };
  /* END DEV BYPASS */

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-center p-6 md:p-10"
      >
        <div className="w-full max-w-[440px]">
          <Link to="/" className="inline-flex items-center mb-10 group focus-ring rounded-lg">
            <Logo className="h-8" />
          </Link>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-base text-muted-foreground">
              Sign in to manage your customer conversations.
            </p>
            <p className="text-xs text-muted-foreground/80 pt-1">
              Google sign-in is coming soon
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline rounded-sm focus-ring"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-base pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-11 h-11 text-muted-foreground hover:text-foreground rounded-md focus-ring"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 font-semibold text-base press-scale">
              Sign in
            </Button>
          </form>

          {/* DEV BYPASS — REMOVE BEFORE PRODUCTION */}
          {showDevBypass() && (
            <div className="pt-4">
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

          <p className="text-center text-sm text-muted-foreground mt-8">
            New to Conveero?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline rounded-sm focus-ring">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>

      <AuthBrandPanel
        eyebrow="Conveero"
        title="Turn every DM into a conversation that closes."
        subtitle="Automated Instagram replies trained on your catalog — always on, always on-brand."
      />
    </div>
  );
}
