import { Logo } from '@/components/brand/Logo';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/connect-instagram');
  };

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
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-base text-muted-foreground">
              Start managing customer conversations in one place.
            </p>
            <p className="text-xs text-muted-foreground/80 pt-1">
              Google sign-in is coming soon
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 text-base"
                required
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
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
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline rounded-sm focus-ring">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      <AuthBrandPanel
        eyebrow="Conveero"
        title="One inbox. Every reply, already handled."
        subtitle="Connect Instagram, upload your catalog, and let Conveero reply in your voice."
      />
    </div>
  );
}
