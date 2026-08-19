import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { isAuthenticated } from '@/lib/api';

/**
 * DEMO BYPASS — lets anyone preview the dashboard without a backend session.
 * Enabled by the "Demo mode" button on /login (or ?demo=1), stored in
 * localStorage. Remove before handling real customer data.
 */
function hasDemoBypass(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('conveero_dev_bypass') === '1';
}

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (new URLSearchParams(window.location.search).get('demo') === '1') {
      try { window.localStorage.setItem('conveero_dev_bypass', '1'); } catch { /* noop */ }
    }
  }, []);

  if (!isAuthenticated() && !hasDemoBypass()) {
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
