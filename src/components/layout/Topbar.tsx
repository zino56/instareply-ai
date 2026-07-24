import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LogOut, User, ChevronDown, Menu, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';

const routeTitles: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your Instagram automation' },
  '/conversations': { title: 'Conversations', subtitle: 'Your AI-handled Instagram inbox' },
  '/products': { title: 'Products', subtitle: 'Catalog powering AI responses' },
  '/ai-knowledge': { title: 'AI Knowledge', subtitle: 'Documents that train your assistant' },
  '/analytics': { title: 'Analytics', subtitle: 'Performance of your automation' },
  '/settings': { title: 'Settings', subtitle: 'Account and integrations' },
  '/pricing': { title: 'Pricing', subtitle: 'Plans and billing' },
};

interface TopbarProps {
  onOpenMobileNav: () => void;
}

export function Topbar({ onOpenMobileNav }: TopbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { clientStatus, logout } = useAuthStore();

  const meta = routeTitles[pathname] ?? { title: 'Conveero' };

  const initials = (clientStatus?.name || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-[68px] bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0 h-11 w-11"
            onClick={onOpenMobileNav}
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </Button>
          <div className="min-w-0">
            <h1 className="text-[17px] md:text-[19px] font-semibold tracking-tight leading-tight truncate">
              {meta.title}
            </h1>
            {meta.subtitle && (
              <p className="hidden sm:block text-[13px] text-muted-foreground truncate">
                {meta.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Help"
          >
            <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-10 px-1.5 sm:px-2 focus-ring rounded-full sm:rounded-lg"
              >
                <Avatar className="h-8 w-8 ring-1 ring-border">
                  <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium max-w-[120px] truncate">
                  {clientStatus?.name || 'User'}
                </span>
                <ChevronDown className="hidden md:inline w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{clientStatus?.name || 'User'}</p>
                {clientStatus?.email && (
                  <p className="text-xs text-muted-foreground truncate">{clientStatus.email}</p>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
