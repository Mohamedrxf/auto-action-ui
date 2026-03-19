import React from 'react';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ListTodo, Workflow, AlertTriangle, Brain, ClipboardList, UserCheck, Eye, Bell } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

/* ── mock data ── */
const kpis = [
  { label: 'Tasks Created', value: '47', change: '+12 today', icon: ListTodo, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Tasks Completed', value: '31', change: '66% rate', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Active Workflows', value: '3', change: '2 running', icon: Workflow, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { label: 'Escalations', value: '5', change: '2 critical', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
];

const taskTrendData = [
  { day: 'Mon', created: 8, completed: 5 },
  { day: 'Tue', created: 12, completed: 9 },
  { day: 'Wed', created: 6, completed: 7 },
  { day: 'Thu', created: 14, completed: 10 },
  { day: 'Fri', created: 10, completed: 12 },
  { day: 'Sat', created: 4, completed: 6 },
  { day: 'Sun', created: 3, completed: 2 },
];

const agentPerformanceData = [
  { agent: 'Decision', actions: 42, avgTime: 1.2 },
  { agent: 'Task', actions: 38, avgTime: 2.1 },
  { agent: 'Assignment', actions: 35, avgTime: 0.8 },
  { agent: 'Monitoring', actions: 28, avgTime: 3.4 },
  { agent: 'Escalation', actions: 12, avgTime: 1.5 },
];

const workflowStatusData = [
  { name: 'Completed', value: 31, color: 'hsl(160, 70%, 45%)' },
  { name: 'In Progress', value: 11, color: 'hsl(185, 100%, 50%)' },
  { name: 'Pending', value: 5, color: 'hsl(40, 95%, 55%)' },
];

const escalationTrendData = [
  { week: 'W1', escalations: 2, resolved: 2 },
  { week: 'W2', escalations: 4, resolved: 3 },
  { week: 'W3', escalations: 1, resolved: 2 },
  { week: 'W4', escalations: 5, resolved: 3 },
  { week: 'W5', escalations: 3, resolved: 4 },
  { week: 'W6', escalations: 2, resolved: 2 },
];

const recentActivity = [
  { time: '2 min ago', agent: 'Decision Agent', action: 'Extracted 4 decisions from Q4 planning call', icon: Brain, color: 'text-primary' },
  { time: '5 min ago', agent: 'Task Agent', action: 'Created 6 new tasks with deadlines', icon: ClipboardList, color: 'text-violet-400' },
  { time: '8 min ago', agent: 'Assignment Agent', action: 'Assigned tasks to 3 team members', icon: UserCheck, color: 'text-emerald-400' },
  { time: '12 min ago', agent: 'Monitoring Agent', action: 'Flagged 2 tasks as at-risk', icon: Eye, color: 'text-amber-400' },
  { time: '15 min ago', agent: 'Escalation Agent', action: 'Sent alert for overdue deliverable', icon: Bell, color: 'text-rose-400' },
  { time: '22 min ago', agent: 'Decision Agent', action: 'Processed sprint retrospective notes', icon: Brain, color: 'text-primary' },
];

/* ── animations ── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ── shared tooltip style ── */
const tooltipStyle = {
  contentStyle: {
    background: 'hsl(220 25% 10% / 0.9)',
    border: '1px solid hsl(220 20% 20% / 0.5)',
    borderRadius: '12px',
    backdropFilter: 'blur(12px)',
    color: 'hsl(210 40% 96%)',
    fontSize: '12px',
  },
  itemStyle: { color: 'hsl(210 40% 96%)' },
  labelStyle: { color: 'hsl(215 20% 55%)' },
};

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

        {/* Charts Row 1 — Task Trends + Agent Performance */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">Task Trends</h3>
            <p className="text-xs text-muted-foreground mb-5">Created vs completed this week</p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={taskTrendData}>
                <defs>
                  <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18% / 0.5)" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="created" stroke="hsl(185, 100%, 50%)" fill="url(#gradCreated)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="completed" stroke="hsl(160, 70%, 45%)" fill="url(#gradCompleted)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">Agent Performance</h3>
            <p className="text-xs text-muted-foreground mb-5">Actions completed per agent</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={agentPerformanceData} barSize={28}>
                <defs>
                  <linearGradient id="gradBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(270, 60%, 60%)" />
                    <stop offset="100%" stopColor="hsl(185, 100%, 50%)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18% / 0.5)" />
                <XAxis dataKey="agent" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="actions" fill="url(#gradBar)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 — Workflow Status Pie + Escalation Trend Line */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">Workflow Status</h3>
            <p className="text-xs text-muted-foreground mb-5">Current task distribution</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={workflowStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {workflowStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">Escalation Trend</h3>
            <p className="text-xs text-muted-foreground mb-5">Escalations vs resolved over 6 weeks</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={escalationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18% / 0.5)" />
                <XAxis dataKey="week" tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="escalations" stroke="hsl(0, 80%, 55%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(0, 80%, 55%)' }} />
                <Line type="monotone" dataKey="resolved" stroke="hsl(160, 70%, 45%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(160, 70%, 45%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-5">Recent Agent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/20 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/30 group-hover:border-primary/30 transition-colors">
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
