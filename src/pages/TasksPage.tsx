import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
}

const initialTasks: Task[] = [
  { id: 1, name: 'Finalize dashboard mockups', owner: 'Alex', priority: 'High', deadline: 'Mar 19', status: 'In Progress' },
  { id: 2, name: 'Backend API changes for v2', owner: 'Mike', priority: 'High', deadline: 'Mar 28', status: 'Pending' },
  { id: 3, name: 'Set up analytics pipeline', owner: 'Jake', priority: 'Medium', deadline: 'Apr 2', status: 'Pending' },
  { id: 4, name: 'Mobile responsive views', owner: 'Alex', priority: 'Medium', deadline: 'Mar 22', status: 'In Progress' },
  { id: 5, name: 'Progress review meeting', owner: 'Sarah', priority: 'Low', deadline: 'Mar 25', status: 'Completed' },
  { id: 6, name: 'QA testing sprint', owner: 'Mike', priority: 'High', deadline: 'Apr 5', status: 'Pending' },
  { id: 7, name: 'Documentation update', owner: 'Sarah', priority: 'Low', deadline: 'Apr 8', status: 'Pending' },
];

const priorityColors: Record<string, string> = {
  High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const statusColors: Record<string, string> = {
  Pending: 'status-pending',
  'In Progress': 'status-active',
  Completed: 'status-completed',
  Delayed: 'status-delayed',
};

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [escalation, setEscalation] = useState<string | null>(null);

  const markDelayed = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Delayed' as const } : t));
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEscalation(`⚠️ Escalation triggered: "${task.name}" marked as delayed. Notifying ${task.owner}'s manager.`);
      setTimeout(() => setEscalation(null), 5000);
    }
  };

  return (
    <div className="min-h-screen">
      <AppHeader title="Tasks" subtitle="AI-generated tasks from meeting transcripts" />
      <div className="p-8 space-y-6">
        {/* Escalation Alert */}
        {escalation && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 glow-accent"
          >
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <p className="text-sm font-medium text-rose-300">{escalation}</p>
          </motion.div>
        )}

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Task</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Owner</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Priority</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Deadline</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{task.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        {task.owner[0]}
                      </div>
                      <span className="text-sm text-muted-foreground">{task.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {task.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusColors[task.status]}`}>
                      {task.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                      {task.status === 'Delayed' && <AlertTriangle className="w-3 h-3" />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.status !== 'Completed' && task.status !== 'Delayed' && (
                      <button
                        onClick={() => markDelayed(task.id)}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider transition-all"
                      >
                        Mark Delayed <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default TasksPage;
