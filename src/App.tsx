import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "./app/page";
import Pricing from "./pages/Pricing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConnectInstagram from "./pages/onboarding/ConnectInstagram";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Non-dashboard authenticated routes are code-split to keep the initial
// bundle small. Dashboard stays eager so it renders immediately after login.
const Conversations = lazy(() => import("./pages/Conversations"));
const Products = lazy(() => import("./pages/Products"));
const AIKnowledge = lazy(() => import("./pages/AIKnowledge"));
const Settings = lazy(() => import("./pages/Settings"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const Automations = lazy(() => import("./pages/Automations"));
const Leads = lazy(() => import("./pages/Leads"));
const Billing = lazy(() => import("./pages/Billing"));

// Static marketing/legal pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Comments = lazy(() => import("./pages/Comments"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<Suspense fallback={<RouteFallback />}><About /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<RouteFallback />}><Contact /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<RouteFallback />}><Privacy /></Suspense>} />
            <Route path="/terms" element={<Suspense fallback={<RouteFallback />}><Terms /></Suspense>} />
            <Route path="/comments" element={<Suspense fallback={<RouteFallback />}><Comments /></Suspense>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/onboarding/connect-instagram" element={<ConnectInstagram />} />

            {/* Auth Callback */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* App Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/conversations" element={<Suspense fallback={<RouteFallback />}><Conversations /></Suspense>} />
              <Route path="/products" element={<Suspense fallback={<RouteFallback />}><Products /></Suspense>} />
              <Route path="/automations" element={<Suspense fallback={<RouteFallback />}><Automations /></Suspense>} />
              <Route path="/dashboard/automations" element={<Suspense fallback={<RouteFallback />}><Automations /></Suspense>} />
              <Route path="/dashboard/comments" element={<Suspense fallback={<RouteFallback />}><Automations /></Suspense>} />
              <Route path="/dashboard/leads" element={<Suspense fallback={<RouteFallback />}><Leads /></Suspense>} />
              <Route path="/dashboard/billing" element={<Suspense fallback={<RouteFallback />}><Billing /></Suspense>} />
              <Route path="/ai-knowledge" element={<Suspense fallback={<RouteFallback />}><AIKnowledge /></Suspense>} />
              <Route path="/settings" element={<Suspense fallback={<RouteFallback />}><Settings /></Suspense>} />
              <Route path="/analytics" element={<Suspense fallback={<RouteFallback />}><Analytics /></Suspense>} />
              <Route path="/subscriptions" element={<Suspense fallback={<RouteFallback />}><Subscriptions /></Suspense>} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
