import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { isAuthenticated } from '@/lib/api';

/**
 * DEV BYPASS — active only when `import.meta.env.DEV` is true (local `vite`
 * / `vite dev`). In every non-DEV build — production AND Lovable preview —
 * the bypass is fully inert and any lingering flag is removed from
 * localStorage so it can never be re-used.
 */
function hasDevBypass(): boolean {
  if (!import.meta.env.DEV) return false;
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('conveero_dev_bypass') === '1';
}

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    // Defense in depth: in any non-DEV build, purge the bypass flag if present.
    if (!import.meta.env.DEV && typeof window !== 'undefined') {
      try { window.localStorage.removeItem('conveero_dev_bypass'); } catch { /* noop */ }
    }
  }, []);

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
