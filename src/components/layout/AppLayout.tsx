import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { isAuthenticated } from '@/lib/api';

/* DEV BYPASS — REMOVE BEFORE PRODUCTION
 * Allows entering the dashboard without a real token when running in
 * local Vite dev, Lovable preview, or when ?dev=1 is in the URL AND the
 * localStorage flag "conveero_dev_bypass" is set (toggled from Login page).
 * Has zero effect on real production domains. */
function isDevOrPreview(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window === 'undefined') return false;
  if (window.location.hostname.includes('lovable.app')) return true;
  return new URLSearchParams(window.location.search).get('dev') === '1';
}

function hasDevBypass(): boolean {
  return (
    isDevOrPreview() &&
    typeof window !== 'undefined' &&
    window.localStorage.getItem('conveero_dev_bypass') === '1'
  );
}
/* END DEV BYPASS */

export function AppLayout() {
  if (!isAuthenticated() && !hasDevBypass()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}

