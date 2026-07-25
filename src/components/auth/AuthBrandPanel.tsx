import { motion } from 'framer-motion';

interface AuthBrandPanelProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/**
 * Decorative right-hand panel for auth pages. Hidden below `lg`.
 * Purely visual — never required for form use. All imagery is aria-hidden.
 */
export default function AuthBrandPanel({ eyebrow, title, subtitle }: AuthBrandPanelProps) {
  return (
    <aside
      aria-hidden="true"
      className="hidden lg:flex relative overflow-hidden items-center justify-center p-12 bg-[hsl(var(--mc-yellow))]"
    >
      {/* Subtle static dot grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18] text-black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="auth-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-dots)" />
      </svg>

      {/* Soft radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-md text-black"
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase mb-6">
            {eyebrow}
          </div>
        )}
        <h2 className="font-poppins text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-5 text-base xl:text-lg text-black/75 leading-relaxed">{subtitle}</p>
        )}

        {/* Static abstract composition — squares/lines, no 3D/photo */}
        <div className="mt-12 flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-black" />
          <div className="w-14 h-14 rounded-2xl border-2 border-black" />
          <div className="w-14 h-14 rounded-2xl bg-black/20" />
          <div className="flex-1 h-[2px] bg-black/25 rounded-full" />
        </div>
      </motion.div>
    </aside>
  );
}
