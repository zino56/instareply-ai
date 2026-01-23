import { Outlet, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-yellow-400" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary-foreground blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-primary-foreground">InstaAI</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6">
            Welcome back
          </h1>
          
          <p className="text-xl text-primary-foreground/80 max-w-md">
            Let's get you signed in to manage your Instagram automation.
          </p>

          {/* Decorative Illustration Placeholder */}
          <div className="mt-12 flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/30" />
            </div>
            <div className="w-20 h-20 rounded-2xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/25" />
            </div>
            <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
