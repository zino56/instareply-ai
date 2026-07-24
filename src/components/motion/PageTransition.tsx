import { motion } from 'framer-motion';
import { pageContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Page-enter wrapper: fade + subtle upward settle, stagger children by 30ms.
 * Used only on authenticated top-level pages (Dashboard, Products, Analytics,
 * AI Knowledge, Settings). Framer Motion respects the app-level MotionConfig
 * reducedMotion="user" and will neutralize transforms when the OS setting is on.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
