import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  BookOpen,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/conversations', label: 'Conversations', icon: MessageSquare },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/ai-knowledge', label: 'AI Knowledge', icon: BookOpen },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const workspaceLinks = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { pathname } = useLocation();

  const renderLink = (link: (typeof mainLinks)[number]) => {
    const isActive = pathname === link.href;
    const Icon = link.icon;
    return (
      <Link
        key={link.href}
        to={link.href}
        onClick={onNavigate}
        className={cn(
          'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-ring',
          isActive
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
        )}
      >
        {isActive && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-primary" />
        )}
        <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.75} />
        <span className="truncate">{link.label}</span>
      </Link>
    );
  };

  return (
    <aside className="flex h-full w-full flex-col bg-card border-r border-border">
      {/* Brand */}
      <div className="h-[68px] px-5 flex items-center border-b border-border">
        <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-2.5 group focus-ring rounded-lg">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-sm)]">
            <Sparkles className="w-[18px] h-[18px]" strokeWidth={2} />
          </div>
          <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
            Conveero
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        <div className="space-y-1">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Main
          </p>
          {mainLinks.map(renderLink)}
        </div>
        <div className="space-y-1">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Workspace
          </p>
          {workspaceLinks.map(renderLink)}
        </div>
      </nav>

      {/* Footer note */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground/80">
          Conveero © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
