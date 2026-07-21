import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithInstagram } from '@/lib/api';

export default function ConnectInstagram() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex items-center justify-center bg-background px-6 py-14"
    >
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-12 justify-center">
          <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
            <span className="font-display text-background text-lg leading-none">C</span>
          </div>
          <span className="font-display text-xl text-foreground">Conveero</span>
        </Link>

        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3 text-center">
          Step 2 of 2 · Connect
        </div>

        <h1 className="font-display text-3xl md:text-4xl text-foreground text-center mb-3 leading-[1.1]">
          Connect your Instagram account.
        </h1>
        <p className="text-muted-foreground text-center mb-8 leading-relaxed">
          Conveero uses Instagram's official Graph API to read incoming DMs and reply on your behalf.
          You stay in control — pause, review, or disconnect at any time.
        </p>

        <div className="rounded-xl border border-border bg-card p-2 mb-4">
          <Button
            className="w-full h-11 rounded-[10px] bg-foreground text-background hover:bg-accent font-medium gap-2"
            onClick={() => loginWithInstagram()}
          >
            <Instagram className="w-4 h-4" />
            Connect Instagram
          </Button>
        </div>

        <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mb-8">
          <ShieldCheck className="w-3.5 h-3.5" />
          Official Meta Graph API · Read &amp; reply scope only
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
