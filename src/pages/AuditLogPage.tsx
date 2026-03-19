import React from 'react';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';
import { Brain, ClipboardList, UserCheck, Eye, Bell } from 'lucide-react';

const agentIcons: Record<string, React.FC<{ className?: string }>> = {
  'Decision Agent': Brain,
  'Task Agent': ClipboardList,
  'Assignment Agent': UserCheck,
  'Monitoring Agent': Eye,
  'Escalation Agent': Bell,
};

const agentColors: Record<string, string> = {
  'Decision Agent': 'text-primary',
  'Task Agent': 'text-violet-400',
  'Assignment Agent': 'text-emerald-400',
  'Monitoring Agent': 'text-amber-400',
  'Escalation Agent': 'text-rose-400',
};

const logs = [
  { timestamp: '2024-03-19 10:45:12', agent: 'Decision Agent', action: 'Extracted decisions from transcript', reason: 'Detected 3 decision patterns: deadline commitment, task delegation, and follow-up scheduling.' },
  { timestamp: '2024-03-19 10:46:01', agent: 'Task Agent', action: 'Created task: Finalize dashboard mockups', reason: 'Phrase "finalize the dashboard redesign by March 28th" detected as actionable task with explicit deadline.' },
  { timestamp: '2024-03-19 10:46:03', agent: 'Task Agent', action: 'Created task: Backend API changes', reason: 'Statement "can your team handle the backend API changes" identified as delegated task requiring follow-up.' },
  { timestamp: '2024-03-19 10:46:05', agent: 'Task Agent', action: 'Set priority: High for API changes', reason: 'Task is a dependency for dashboard redesign. Blocking relationship detected in conversation context.' },
  { timestamp: '2024-03-19 10:47:15', agent: 'Assignment Agent', action: 'Assigned Alex → Dashboard mockups', reason: 'Alex mentioned by name as responsible: "I\'ll have the full mockups ready by Tuesday".' },
  { timestamp: '2024-03-19 10:47:18', agent: 'Assignment Agent', action: 'Assigned Jake → Analytics pipeline', reason: 'Mike explicitly delegated: "I\'ll assign Jake to that." Direct ownership transfer detected.' },
  { timestamp: '2024-03-19 10:48:30', agent: 'Monitoring Agent', action: 'Set deadline alert for Mar 19', reason: 'Task "Finalize dashboard mockups" has <24h remaining. Auto-escalation threshold reached.' },
  { timestamp: '2024-03-19 10:49:00', agent: 'Escalation Agent', action: 'No escalation needed', reason: 'All tasks within acceptable timeline. No overdue items or risk factors detected.' },
  { timestamp: '2024-03-19 11:15:00', agent: 'Monitoring Agent', action: 'Risk flag: Mockup deadline approaching', reason: 'Task completion probability dropped below 70% based on time remaining vs. estimated effort.' },
  { timestamp: '2024-03-19 11:30:00', agent: 'Escalation Agent', action: 'Escalated to Sarah via Slack', reason: 'Mockup task deadline at risk. PM notification required per escalation policy (SLA: 4h before deadline).' },
];

const AuditLogPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AppHeader title="Audit Logs" subtitle="Complete transparency into every AI decision" />
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Timestamp</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Agent</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Action</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">AI Reasoning</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const Icon = agentIcons[log.agent] || Brain;
                const color = agentColors[log.agent] || 'text-primary';
                return (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border/15 hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-muted-foreground/70 whitespace-nowrap align-top">{log.timestamp}</td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                        <span className="text-xs font-semibold text-foreground whitespace-nowrap">{log.agent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground align-top">{log.action}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground leading-relaxed align-top max-w-md">{log.reason}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AuditLogPage;
