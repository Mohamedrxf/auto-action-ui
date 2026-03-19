import React from 'react';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';
import { Brain, ClipboardList, UserCheck, Eye, Bell } from 'lucide-react';

const activities = [
  { time: '10:45 AM', agent: 'Decision Agent', action: 'Extracted 3 decisions from sprint planning call', icon: Brain, color: 'text-primary', lineColor: 'bg-primary/40' },
  { time: '10:46 AM', agent: 'Task Agent', action: 'Created 5 tasks: dashboard redesign, API migration, analytics setup, mobile views, QA sprint', icon: ClipboardList, color: 'text-violet-400', lineColor: 'bg-violet-500/40' },
  { time: '10:47 AM', agent: 'Assignment Agent', action: 'Assigned tasks — Alex: design (2), Mike: engineering (2), Jake: analytics (1)', icon: UserCheck, color: 'text-emerald-400', lineColor: 'bg-emerald-500/40' },
  { time: '10:48 AM', agent: 'Monitoring Agent', action: 'Set deadline alerts for Mar 19 (mockups), Mar 28 (API), Apr 2 (analytics)', icon: Eye, color: 'text-amber-400', lineColor: 'bg-amber-500/40' },
  { time: '10:49 AM', agent: 'Escalation Agent', action: 'No immediate escalations. Watching 2 high-priority tasks for risk.', icon: Bell, color: 'text-rose-400', lineColor: 'bg-rose-500/40' },
  { time: '11:15 AM', agent: 'Monitoring Agent', action: 'Task "Finalize dashboard mockups" is approaching deadline — 4 hours remaining', icon: Eye, color: 'text-amber-400', lineColor: 'bg-amber-500/40' },
  { time: '11:30 AM', agent: 'Escalation Agent', action: 'Escalation triggered: Mockup deadline at risk. Notified Sarah (PM) via Slack.', icon: Bell, color: 'text-rose-400', lineColor: 'bg-rose-500/40' },
  { time: '11:45 AM', agent: 'Decision Agent', action: 'Processing follow-up standup notes from #engineering channel', icon: Brain, color: 'text-primary', lineColor: 'bg-primary/40' },
];

const AgentActivityPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AppHeader title="Agent Activity" subtitle="Real-time timeline of AI agent actions" />
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border/30" />

            <div className="space-y-1">
              {activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-5 p-4 rounded-xl hover:bg-muted/15 transition-colors group"
                >
                  {/* Dot */}
                  <div className={`relative z-10 mt-1 p-2.5 rounded-xl bg-muted/40 border border-border/30 group-hover:border-primary/30 transition-colors shrink-0`}>
                    <act.icon className={`w-4 h-4 ${act.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold text-foreground">{act.agent}</span>
                      <span className="text-[10px] text-muted-foreground/60 font-mono">{act.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{act.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentActivityPage;
