import React from 'react';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ListTodo, Workflow, AlertTriangle, Brain, ClipboardList, UserCheck, Eye, Bell } from 'lucide-react';

const kpis = [
  { label: 'Tasks Created', value: '47', change: '+12 today', icon: ListTodo, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Tasks Completed', value: '31', change: '66% rate', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Active Workflows', value: '3', change: '2 running', icon: Workflow, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { label: 'Escalations', value: '5', change: '2 critical', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
];

const recentActivity = [
  { time: '2 min ago', agent: 'Decision Agent', action: 'Extracted 4 decisions from Q4 planning call', icon: Brain, color: 'text-primary' },
  { time: '5 min ago', agent: 'Task Agent', action: 'Created 6 new tasks with deadlines', icon: ClipboardList, color: 'text-violet-400' },
  { time: '8 min ago', agent: 'Assignment Agent', action: 'Assigned tasks to 3 team members', icon: UserCheck, color: 'text-emerald-400' },
  { time: '12 min ago', agent: 'Monitoring Agent', action: 'Flagged 2 tasks as at-risk', icon: Eye, color: 'text-amber-400' },
  { time: '15 min ago', agent: 'Escalation Agent', action: 'Sent alert for overdue deliverable', icon: Bell, color: 'text-rose-400' },
  { time: '22 min ago', agent: 'Decision Agent', action: 'Processed sprint retrospective notes', icon: Brain, color: 'text-primary' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AppHeader title="Dashboard" subtitle="Overview of your AI-powered operations" />
      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-4 gap-5">
          {kpis.map((kpi, i) => (
            <motion.div key={i} variants={item} className="glass-panel rounded-2xl p-6 hover:glow-cyan transition-all duration-300 group cursor-default">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.label}</p>
                  <p className={`text-4xl font-bold mt-2 ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bg} border ${kpi.border} group-hover:scale-110 transition-transform`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-5">Recent Agent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/20 transition-colors group"
              >
                <div className={`p-2.5 rounded-xl bg-muted/40 border border-border/30 group-hover:border-primary/30 transition-colors`}>
                  <act.icon className={`w-4 h-4 ${act.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{act.agent}</p>
                  <p className="text-xs text-muted-foreground truncate">{act.action}</p>
                </div>
                <span className="text-xs text-muted-foreground/60 whitespace-nowrap">{act.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
