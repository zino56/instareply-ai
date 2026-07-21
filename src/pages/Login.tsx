import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left: form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-center px-6 py-14"
      >
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
              <span className="font-display text-background text-lg leading-none">C</span>
            </div>
            <span className="font-display text-xl text-foreground">Conveero</span>
          </Link>

          <h1 className="font-display text-4xl text-foreground mb-2">Welcome back.</h1>
          <p className="text-muted-foreground mb-8">Sign in to your Conveero workspace.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-11 rounded-[10px] bg-foreground text-background hover:bg-accent font-medium">
              Sign in
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-8">
            New to Conveero?{' '}
            <Link to="/signup" className="text-foreground font-medium underline underline-offset-4 hover:text-accent">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Right: quiet visual panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-secondary/40 border-l border-border">
        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Conveero · Inbox</div>
        <div className="max-w-md">
          <p className="font-display text-3xl leading-tight text-foreground">
            &ldquo;Every Instagram and WhatsApp lead, qualified and routed before the second cup of coffee.&rdquo;
          </p>
          <p className="mt-6 text-sm text-muted-foreground">Illustrative — not a customer quote.</p>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Conveero</div>
      </div>
    </div>
  );
}
