import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { isAuthenticated } from '@/lib/api';

/* DEV BYPASS — REMOVE BEFORE PRODUCTION
 * Allows entering the dashboard without a real token when running in
 * Lovable preview / local dev (import.meta.env.DEV === true) AND the
 * localStorage flag "conveero_dev_bypass" is set (toggled from Login page).
 * Has zero effect in production builds. */
function hasDevBypass(): boolean {
  return (
    import.meta.env.DEV &&
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

