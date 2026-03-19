import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Play, ListTodo, Activity, FileText, Zap } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/workflow', label: 'Run Workflow', icon: Play },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/agents', label: 'Agent Activity', icon: Activity },
  { to: '/audit', label: 'Audit Logs', icon: FileText },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 z-30 glass-panel border-r border-border/40 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-cyan">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">AutoOps</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">AI Engine</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-primary/15 text-primary border border-primary/20 glow-cyan'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
            >
              <item.icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 mx-3 mb-4 rounded-xl bg-muted/30 border border-border/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span>System Active</span>
        </div>
        <p className="text-[10px] text-muted-foreground/60 mt-1">5 agents online</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
