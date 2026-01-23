import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuthStore } from '@/store/authStore';

export function AppLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
