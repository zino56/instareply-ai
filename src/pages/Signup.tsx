import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/connect-instagram');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
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

          <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">Step 1 of 2 · Account</div>
          <h1 className="font-display text-4xl text-foreground mb-2">Create your workspace.</h1>
          <p className="text-muted-foreground mb-8">Free for 14 days. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">Full name</Label>
              <Input id="name" type="text" placeholder="Jane Doe" className="h-11"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Work email</Label>
              <Input id="email" type="email" placeholder="you@company.com" className="h-11"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-11"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full h-11 rounded-[10px] bg-foreground text-background hover:bg-accent font-medium">
              Continue
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-foreground font-medium underline underline-offset-4 hover:text-accent">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      <div className="hidden lg:flex flex-col justify-between p-12 bg-secondary/40 border-l border-border">
        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Get started</div>
        <div className="max-w-md space-y-4">
          <p className="font-display text-3xl leading-tight text-foreground">
            What you get in the next five minutes.
          </p>
          <ul className="space-y-3 text-sm text-foreground/85">
            {[
              "Connect Instagram DMs and WhatsApp",
              "Set your qualifying questions and tone",
              "Route leads to the right rep by rule",
              "Sync every conversation to your CRM",
            ].map((i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Conveero</div>
      </div>
    </div>
  );
}
