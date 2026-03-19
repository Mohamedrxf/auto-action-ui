import React, { useState, useCallback } from 'react';
import AppHeader from '@/components/AppHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ClipboardList, UserCheck, Eye, Bell, Upload, Play, CheckCircle, Loader2 } from 'lucide-react';

type AgentStatus = 'idle' | 'running' | 'completed';

interface Agent {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  log: string;
}

const agentsDef: Agent[] = [
  { id: 'decision', name: 'Decision Agent', icon: Brain, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30', log: 'Extracted 4 key decisions and 2 action items' },
  { id: 'task', name: 'Task Agent', icon: ClipboardList, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', log: 'Created 6 tasks with priorities and deadlines' },
  { id: 'assign', name: 'Assignment Agent', icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', log: 'Assigned tasks to Sarah, Mike, and Alex' },
  { id: 'monitor', name: 'Monitoring Agent', icon: Eye, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', log: 'Set up monitoring for 3 critical deadlines' },
  { id: 'escalate', name: 'Escalation Agent', icon: Bell, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', log: 'Configured escalation rules for overdue items' },
];

const sampleTranscript = `Meeting: Q4 Product Planning
Date: March 15, 2024
Attendees: Sarah (PM), Mike (Eng Lead), Alex (Design)

Sarah: We need to finalize the dashboard redesign by March 28th. Mike, can your team handle the backend API changes?

Mike: Yes, we can start Monday. I'll need Alex's mockups by Wednesday though.

Alex: I'll have the full mockups ready by Tuesday EOD. Should I include the mobile responsive views too?

Sarah: Yes, please. Also, we need to set up the analytics pipeline. Mike, can you assign someone from your team?

Mike: I'll assign Jake to that. He should have it done by April 2nd.

Sarah: Great. Let's also schedule a follow-up review for March 25th to check progress.`;

const WorkflowPage: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [statuses, setStatuses] = useState<Record<string, AgentStatus>>(() =>
    Object.fromEntries(agentsDef.map(a => [a.id, 'idle' as AgentStatus]))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const runWorkflow = useCallback(() => {
    if (!transcript.trim()) return;
    setIsRunning(true);
    setIsDone(false);
    setStatuses(Object.fromEntries(agentsDef.map(a => [a.id, 'idle'])));

    agentsDef.forEach((agent, i) => {
      setTimeout(() => setStatuses(prev => ({ ...prev, [agent.id]: 'running' })), i * 1800);
      setTimeout(() => setStatuses(prev => ({ ...prev, [agent.id]: 'completed' })), i * 1800 + 1500);
    });

    setTimeout(() => { setIsRunning(false); setIsDone(true); }, agentsDef.length * 1800 + 500);
  }, [transcript]);

  return (
    <div className="min-h-screen">
      <AppHeader title="Run Workflow" subtitle="Upload a transcript and let AI agents handle the rest" />
      <div className="p-8 space-y-8">
        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Meeting Transcript</h3>
            <button
              onClick={() => setTranscript(sampleTranscript)}
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="w-full h-48 bg-muted/30 border border-border/40 rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={runWorkflow}
              disabled={isRunning || !transcript.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-cyan"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Running...' : 'Run Autonomous Workflow'}
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-muted/40 text-muted-foreground rounded-xl text-sm hover:bg-muted/60 transition-colors border border-border/30">
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          </div>
        </motion.div>

        {/* Agent Pipeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Agent Execution Pipeline</h3>
          <div className="flex items-start gap-4">
            {agentsDef.map((agent, i) => {
              const status = statuses[agent.id];
              return (
                <React.Fragment key={agent.id}>
                  <motion.div
                    className={`flex-1 rounded-2xl p-5 border transition-all duration-500 ${
                      status === 'running'
                        ? `${agent.bg} ${agent.border} shadow-lg`
                        : status === 'completed'
                        ? 'bg-muted/20 border-border/30'
                        : 'bg-muted/10 border-border/20'
                    }`}
                    animate={status === 'running' ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${agent.bg} border ${agent.border}`}>
                        <agent.icon className={`w-4 h-4 ${agent.color}`} />
                      </div>
                      <span className="text-xs font-bold text-foreground">{agent.name}</span>
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3 ${
                      status === 'running' ? 'status-pending' : status === 'completed' ? 'status-completed' : 'bg-muted/30 text-muted-foreground border border-border/30'
                    }`}>
                      {status === 'running' && <Loader2 className="w-3 h-3 animate-spin" />}
                      {status === 'completed' && <CheckCircle className="w-3 h-3" />}
                      {status === 'idle' ? 'Waiting' : status === 'running' ? 'Running' : 'Completed'}
                    </div>

                    {/* Log */}
                    <AnimatePresence>
                      {status === 'completed' && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-[11px] text-muted-foreground leading-relaxed"
                        >
                          {agent.log}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Connector */}
                  {i < agentsDef.length - 1 && (
                    <div className="flex items-center pt-8">
                      <div className={`w-8 h-0.5 transition-colors duration-500 ${
                        statuses[agentsDef[i + 1].id] !== 'idle' ? 'bg-primary/60' : 'bg-border/40'
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Completion */}
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-sm font-medium text-emerald-400">Workflow completed successfully! All agents have finished processing.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkflowPage;
