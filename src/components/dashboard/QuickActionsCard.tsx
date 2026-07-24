import { Link } from 'react-router-dom';
import { MessageSquare, Package, Settings, BarChart3, ArrowRight, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const actions: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'View all conversations', href: '/conversations', icon: MessageSquare },
  { label: 'Manage products', href: '/products', icon: Package },
  { label: 'View analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function QuickActionsCard() {
  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-[14px] font-semibold text-foreground">Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((a) => (
          <Button key={a.href} variant="outline" className="w-full justify-start h-10 group text-[13px] font-medium bg-transparent hover:bg-muted/60" asChild>
            <Link to={a.href}>
              <a.icon className="w-4 h-4 mr-3 text-muted-foreground" strokeWidth={1.75} />
              {a.label}
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.75} />
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
