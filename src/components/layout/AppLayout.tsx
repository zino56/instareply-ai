import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (!isAuthenticated() && !hasDevBypass()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72 shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="p-0 w-72 border-r border-border">
          <Sidebar onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
