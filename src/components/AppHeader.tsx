import React from 'react';
import { Bell, User } from 'lucide-react';

const AppHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 glass-panel-light border-b border-border/30 rounded-none">
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="text-xs font-medium text-emerald-400">System Active</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-muted/40 transition-colors">
          <Bell className="w-4.5 h-4.5 text-muted-foreground" />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-border/30">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-[10px] text-muted-foreground">admin@autoops.ai</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
