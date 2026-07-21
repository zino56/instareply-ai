import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithInstagram } from '@/lib/api';

export default function ConnectInstagram() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-background p-8"
    >
      <div className="w-full max-w-md space-y-8">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold group-hover:text-primary transition-colors">Conveero</span>
        </Link>

        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Connect your Instagram account</h2>
          <p className="text-muted-foreground">
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

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
