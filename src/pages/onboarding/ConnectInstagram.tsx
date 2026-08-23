import { Logo } from '@/components/brand/Logo';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithInstagram } from '@/lib/api';

export default function ConnectInstagram() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-surface p-6 md:p-8"
    >
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center mb-8 group">
          <Logo size="auth" />
        </Link>

        <div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-md)] p-8 space-y-6">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Connect your Instagram account</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conveero needs access to your Instagram business account to automatically reply
              to DMs and comments on your behalf.
            </p>
          </div>

          <Button
            className="w-full h-12 font-semibold text-base gap-2"
            onClick={() => loginWithInstagram()}
          >
            <Instagram className="w-5 h-5" />
            Connect Instagram
          </Button>
        </div>
      </div>
    </motion.div>

  );
}
