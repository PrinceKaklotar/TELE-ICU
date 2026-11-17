import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Trash2,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import KanbanBoard from '../components/followups/KanbanBoard';
import { getPriorityConfig } from '../utils/helpers';

export default function FollowUps() {
  const { followups, patients, setTaskModalContext, updateTaskStatus, deleteTask, setSelectedPatientId } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [patientFilter, setPatientFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('kanban'); // kanban | list

  // Summary counts
  const pendingCount = followups.filter(f => f.status === 'PENDING').length;
  const inProgressCount = followups.filter(f => f.status === 'IN_PROGRESS').length;
  const completedCount = followups.filter(f => f.status === 'COMPLETED').length;

  const filteredTasks = useMemo(() => {
    return followups.filter(task => {
      if (patientFilter !== 'ALL' && task.patientId !== patientFilter) {
        return false;
      }
      if (priorityFilter !== 'ALL' && task.priority !== priorityFilter) {
        return false;
      }
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        return (
          task.description.toLowerCase().includes(query) ||
          task.patientName.toLowerCase().includes(query) ||
          task.assignedTo.toLowerCase().includes(query) ||
          task.id.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [followups, patientFilter, priorityFilter, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="space-y-4 max-w-7xl mx-auto"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 lg:p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Follow-up Task Board
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track bedside tasks and nursing reassessments.
          </p>
        </div>

        <button
          onClick={() => setTaskModalContext({})}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Control Bar: Search, Filters, View Mode Toggle */}
      <div className="p-3 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Search & Filters */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <div className="relative flex-1 sm:w-56 min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks or staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Filter by Patient */}
          <select
            value={patientFilter}
            onChange={(e) => setPatientFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-100 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
          >
            <option value="ALL">All Patients</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.bed} - {p.name}</option>
            ))}
          </select>

          {/* Filter by Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-100 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          {(searchTerm || patientFilter !== 'ALL' || priorityFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setPatientFilter('ALL');
                setPriorityFilter('ALL');
              }}
              className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
              title="Reset task filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: View Mode Toggle & Summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>{pendingCount} Pending</span>
            <span>•</span>
            <span>{inProgressCount} In Progress</span>
            <span>•</span>
            <span>{completedCount} Done</span>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-[#121c2e] p-1 rounded-xl border border-slate-200 dark:border-[#243552]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1 rounded-lg transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#1f3354] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
              title="Kanban View"
              aria-label="Kanban View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#1f3354] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Kanban or List */}
      {viewMode === 'kanban' ? (
        <KanbanBoard tasks={filteredTasks} />
      ) : (
        <div className="bg-white dark:bg-[#162238] rounded-2xl border border-slate-200 dark:border-[#243552] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#121c2e] text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-200 dark:border-[#243552]">
                <tr>
                  <th className="py-2.5 px-4">Task ID</th>
                  <th className="py-2.5 px-3">Patient</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-3">Assigned To</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Due Window</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#243552]">
                {filteredTasks.map(task => {
                  const prio = getPriorityConfig(task.priority);
                  return (
                    <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-[#1a2d48] transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-xs">{task.id}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => setSelectedPatientId(task.patientId)}
                          className="font-bold text-blue-600 dark:text-blue-400 hover:underline text-left block text-xs"
                        >
                          {task.patientName}
                          <span className="block font-mono text-[10px] text-slate-400">{task.patientId}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-xs max-w-xs">{task.description}</td>
                      <td className="py-3 px-3 text-xs">{task.assignedTo}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${prio.bgClass}`}>
                          {prio.label}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-400">{task.dueTime}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete task ${task.id}?`)) {
                              deleteTask(task.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete task"
                          aria-label="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
