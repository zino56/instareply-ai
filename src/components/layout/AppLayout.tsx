import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { isAuthenticated } from '@/lib/api';

export function AppLayout() {
  if (!isAuthenticated()) {
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
