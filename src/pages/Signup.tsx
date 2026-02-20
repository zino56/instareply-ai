import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithInstagram } from '@/lib/api';

export default function Signup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-background p-8"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">Conveero</span>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
          <p className="text-muted-foreground">
            Start automating your Instagram DMs today
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
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
