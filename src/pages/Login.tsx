import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithInstagram } from '@/lib/api';

export default function Login() {
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

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Login to Conveero</h2>
          <p className="text-muted-foreground">
            Connect your Instagram to start automating your DMs
          </p>
        </div>

        <Button
          className="w-full h-12 font-semibold text-base gap-2"
          onClick={() => loginWithInstagram()}
        >
          <Instagram className="w-5 h-5" />
          Connect with Instagram
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground">
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          {' · '}
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </motion.div>
  );
}
