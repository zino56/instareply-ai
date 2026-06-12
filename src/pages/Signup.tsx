import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api, connectInstagram } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.signup(form);
      toast({ title: 'Account created', description: 'Next: connect your Instagram account.' });
      // Step 2: send the user to Instagram OAuth
      connectInstagram();
    } catch (err: any) {
      toast({
        title: 'Could not create account',
        description: err?.message || 'Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white font-bold">C</div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Conveero</span>
        </Link>

        <div className="mt-12">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Step 1 of 2 — create your account, then connect Instagram.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">Full name or business name</Label>
            <Input
              id="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-11"
              placeholder="Acme Co."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Work email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-11"
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="h-11"
              placeholder="At least 8 characters"
            />
          </div>

          <Button type="submit" disabled={loading} className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create account <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <p className="text-center text-xs text-slate-500">
            By signing up you agree to our Terms and Privacy Policy.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-slate-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
